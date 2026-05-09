import { Point2D } from "../math/matrix.svelte";
import { Circle, type Shape } from "../math/shape.svelte";
import { getIcon, type Icon, type IconIdentifier, type IconName } from "../ui/icons.svelte";
import type { Cloneable } from "../util/Clone.svelte";
import type { Serialize } from "../util/serialize.svelte";
import { AttributeDefinition } from "./attribute/definition.svelte";
import { AttributeValue, type SerializedAttributeValue } from "./attribute/value.svelte";
import { Color } from "./attribute/color.svelte";
import { StringAttribute } from "./attribute/primitive.svelte";
import { TreeBranch, TreeLeaf } from "./tree.svelte";
import { assignedLater, Objects } from "../util/index.svelte";
import { AttributeType } from "./attribute/type.svelte.ts";
import { ItemType, type SerializedItemType } from "./type.svelte.ts";

export { ItemType };

export class GraphOutline<T extends Shape<any>> {
	public shape = $state(assignedLater<T>());
	public color = $state(Color.black);
	public isVisible = $state(true);

	private constructor(shape: T, color: Color) {
		this.shape = shape;
		this.color = color;
	}

	public static originCircle(radius: number): GraphOutline<Circle> {
		return new GraphOutline(new Circle(radius, Point2D.origin()), Color.black);
	}

	public static fromShapeAndColor<T extends Shape<T>>(shape: T, color: Color): GraphOutline<T> {
		return new GraphOutline(shape, color);
	}
}

export type SerializedItem = {
	attributes: Record<string, SerializedAttributeValue | null>;
	id: number;
	type: SerializedItemType;
};

export class Item extends TreeLeaf<Group, Item> implements Serialize<SerializedItem>, Cloneable<Item> {
	public attributes = $state(assignedLater<Record<string, AttributeValue | null>>());
	public type: ItemType;

	public constructor(type: ItemType, value: Record<string, AttributeValue | null> | string) {
		super();
		this.attributes = typeof value === "string" ? { Name: new StringAttribute(value) } : value;
		this.type = type;
	}

	public clone(): Item {
		return new Item(
			this.type.clone(),
			Objects.mapValues(this.attributes, attribute => attribute?.clone() ?? null),
		);
	}

	public serialize(): SerializedItem {
		return {
			id: this.id,
			attributes: Objects.mapValues(this.attributes, attribute => (attribute ? AttributeValue.serialize(attribute) : null)),
			type: this.type.serialize(),
		};
	}

	public static deserializeUnsafe(item: SerializedItem): Item {
		let created = new Item(
			ItemType.deserialize(item.type),
			Objects.mapValues(item.attributes, attribute => (attribute ? AttributeValue.deserialize(attribute) : null)),
		);
		(created as any).id = item.id;
		return created;
	}

	public getAttributeValue(name: string): AttributeValue | null {
		return this.attributes[name] ?? null;
	}

	public overwriteAttributeValue(name: string, value: AttributeValue | null) {
		if (!this.getAttributeValue(name)) {
			throw `Invalid attribute overwrite: Attempted to overwrite the attribute "${name}" on an item, but no such attribute exists. If this was intentional, use addNewAttributeValue().`;
		}
		this.attributes[name] = value;
	}

	public setName(name: string): void {
		this.addNewOrOverwriteAttributeValue("Name", new StringAttribute(name));
	}

	public addNewOrOverwriteAttributeValue(name: string, value: AttributeValue | null) {
		this.attributes[name] = value;
	}

	public addNewAttributeValue(name: string, value: AttributeValue | null) {
		if (this.getAttributeValue(name)) {
			throw `Invalid attribute additoin: Attempted to overwrite the attribute "${name}" on an item, but no such attribute exists. If this was intentional, use addNewAttributeValue().`;
		}
		this.attributes[name] = value;
	}

	public get icon(): Icon {
		if (this.isRoot) {
			return getIcon("Share2");
		}
		return this.parent!.icon;
	}

	public set icon(icon: IconIdentifier) {
		this.parent!.icon = getIcon(icon);
	}

	public get name(): string {
		return (this.attributes.Name as StringAttribute).value;
	}

	public toString(): string {
		return `Item[ ${this.name} ]`;
	}

	public dfsGroups(): Group[] {
		return [];
	}

	public dfsItems(): Item[] {
		return [this];
	}
}

export class Group extends TreeBranch<Group, Item> implements Serialize<SerializedDatabase>, Cloneable<Group> {
	public name = $state(assignedLater<string>());
	public description = $state(assignedLater<string>());
	private defaultType_ = $state(assignedLater<ItemType | "inherit">());

	private icon_ = $state(assignedLater<Icon | "inherit">());

	public constructor(
		arg:
			| {
					name: string;
					description?: string;
					icon?: IconIdentifier | "inherit";
					defaultType?: ItemType | "inherit";
			  }
			| string,
		...children: (Group | Item)[]
	) {
		super(...children);
		this.name = typeof arg === "string" ? arg : arg.name;
		this.description = typeof arg === "object" ? (arg.description ?? "") : "";
		let icon = typeof arg === "object" ? (arg.icon ?? "inherit") : "inherit";
		this.icon_ = icon === "inherit" ? "inherit" : getIcon(icon);
		this.defaultType_ = typeof arg === "object" ? (arg.defaultType ?? "inherit") : "inherit";
	}

	public clone(): Group {
		return new Group(
			{
				name: this.name,
				description: this.description,
				icon: this.icon_,
				defaultType: this.defaultType_ === "inherit" ? "inherit" : this.defaultType_.clone(),
			},
			...this.children.map(child => child.clone()),
		);
	}

	public cloneWithIDs(): [Group, number, number] {
		let oldId = this.id;
		let clone = new Group(
			{
				name: this.name,
				description: this.description,
				icon: this.icon_,
				defaultType: this.defaultType_ === "inherit" ? "inherit" : this.defaultType_.clone(),
			},
			...this.children.map(child => child.clone()),
		);
		let newId = clone.id;
		return [clone, oldId, newId];
	}

	private serializeStandalone(): SerializedGroup {
		return {
			id: this.id,
			children: this.children.map(child => child.id),

			name: this.name,
			description: this.description,
			iconName: this.icon_ === "inherit" ? "inherit" : getIcon(this.icon).name,
			defaultType: this.defaultType_ === "inherit" ? { type: "inherit" } : { type: "own", own: this.defaultType_.serialize() },
		};
	}

	/**
	 * Returns the icon associated with this group. If this group is set to inherit its icon from
	 * its parent, the parent icon is returned.
	 */
	public get icon(): Icon {
		if (this.icon_ === "inherit") {
			if (this.isRoot) return getIcon("Package");
			return this.parent!.icon;
		} else {
			return this.icon_;
		}
	}

	public set icon(icon: IconIdentifier) {
		this.icon_ = getIcon(icon);
	}

	public removeItem(item: Item): void {
		this.filterChildrenInPlace(child => child !== item);
	}

	public serialize(): SerializedDatabase {
		return {
			groups: this.root()
				.dfsGroups()
				.map(group => group.serializeStandalone()),
			items: this.root()
				.dfsItems()
				.map(item => item.serialize()),
			root: this.root().id,
		};
	}

	public get defaultType(): ItemType {
		if (this.defaultType_ === "inherit") {
			if (this.isRoot) {
				this.defaultType_ = new ItemType({
					name: "Item",
					icon: this.root().icon,
					attributes: [new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") })],
				});
				return this.defaultType_;
			}

			return this.parent!.defaultType;
		}

		return this.defaultType_;
	}

	/**
	 * Deserializes this group without building it into a tree with others. The returned node
	 * **has no children or parent assigned**. This is used internally in `deserialize()` before
	 * the tree is built.
	 *
	 * @param group The serialized group passed from the Rust backend
	 *
	 * @returns A deserialized group object, isolated without being part of a tree.
	 */
	private static deserializeUnsafe(group: SerializedGroup): Group {
		let created = new Group({
			name: group.name,
			description: group.description,
			icon: group.iconName === "inherit" ? "inherit" : getIcon(group.iconName),
			defaultType: "inherit",
		});

		if (group.defaultType.type !== "inherit") {
			created.defaultType_ = ItemType.deserialize(group.defaultType.own);
		}

		(created as any).id = group.id;
		return created;
	}

	public static deserialize(database: SerializedDatabase): Database {
		const groups = database.groups.map(group => Group.deserializeUnsafe(group));
		const items = database.items.map(item => Item.deserializeUnsafe(item));

		for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
			let group = groups[groupIndex];
			let serializedGroup = database.groups[groupIndex];

			for (let childIndex = 0; childIndex < serializedGroup.children.length; childIndex++) {
				let childID = serializedGroup.children[childIndex];

				let itemChild = items.find(item => item.id === childID);
				if (itemChild) {
					group.addChild(itemChild);
					continue;
				}

				let groupChild = groups.find(group => group.id === childID);
				if (groupChild) {
					group.addChild(groupChild);
					continue;
				}

				throw new Error(
					`Error deserializing database: The group "${group.name}" was serialized as having a child of ID = ${childID}, but no item with that ID exists on the serialized database object.`,
				);
			}
		}

		const root = groups.find(group => group.id === database.root)!;
		return root;
	}

	public toString(): string {
		let items = this.children
			.map(child => child.toString().split("\n"))
			.flat()
			.map(line => `\t${line}`)
			.join("\n");
		return `${this.name} {\n${items}\n}`;
	}

	public dfsGroups(): Group[] {
		let visited: Group[] = [this];
		this.children.forEach(child => {
			let childLeaves = child instanceof Group ? child.dfsGroups() : [];
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public dfsItems(): Item[] {
		let visited: Item[] = [];
		this.children.forEach(child => {
			let childLeaves = child instanceof Item ? [child] : child.dfsItems();
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public get directItemChildren(): Item[] {
		return this.children.filter(child => child instanceof Item);
	}

	public setName(name: string): void {
		this.name = name;
	}
}

export type SerializedGroup = {
	id: number;
	children: number[];

	name: string;
	description: string;
	iconName: IconName | "inherit";
	defaultType: { type: "own"; own: SerializedItemType } | { type: "inherit" };
};

export type SerializedDatabase = {
	groups: SerializedGroup[];
	items: SerializedItem[];
	root: number;
};

export type Node = Group | Item;

/**
 * An alias for `Group`. Semantically, `Database` is used to represent an entire project unit root,
 * such as a project or template.
 */
export type Database = Group;
