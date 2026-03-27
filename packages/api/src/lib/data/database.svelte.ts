import { Point2D } from "../math/matrix.svelte";
import { Circle, type Shape } from "../math/shape.svelte";
import { getIcon, type Icon, type IconIdentifier, type IconName } from "../ui/icons.svelte";
import type { Cloneable } from "../util/Clone.svelte";
import type { Serialize } from "../util/serialize.svelte";
import {
	AttributeDefinition,
	type AttributeDefinitionBuilder,
	type SerializedAttributeDefinition,
} from "./attribute/definition.svelte";
import { AttributeValue, type SerializedAttributeValue } from "./attribute/value.svelte";
import { Color } from "./attribute/color.svelte";
import { StringAttribute } from "./attribute/primitive.svelte";
import { TreeBranch, TreeLeaf } from "./tree.svelte";
import GraphIcon from "$lib/components/icons/GraphIcon.svelte";
import { assignedLater, Objects } from "$lib/util/index.svelte";

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
};

export class Item extends TreeLeaf<Group, Item> implements Serialize<SerializedItem>, Cloneable<Item> {
	public attributes = $state(assignedLater<Record<string, AttributeValue | null>>());

	public constructor(value: Record<string, AttributeValue | null> | string) {
		super();
		this.attributes = typeof value === "string" ? { Name: new StringAttribute(value) } : value;
	}

	public clone(): Item {
		return new Item(Objects.mapValues(this.attributes, attribute => attribute?.clone() ?? null));
	}

	public serialize(): SerializedItem {
		return {
			id: this.id,
			attributes: Objects.mapValues(this.attributes, attribute => (attribute ? AttributeValue.serialize(attribute) : null)),
		};
	}

	public static deserializeUnsafe(item: SerializedItem): Item {
		let created = new Item(
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
			return getIcon(GraphIcon);
		}
		return this.parent!.icon;
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
	private attributes_ = $state(assignedLater<AttributeDefinition[] | "inherit">());

	private icon_ = $state(assignedLater<Icon | "inherit">());

	public constructor(
		arg:
			| {
					name: string;
					description?: string;
					icon?: IconIdentifier | "inherit";
					attributes?: (AttributeDefinitionBuilder | AttributeDefinition)[] | "inherit";
			  }
			| string,
		...children: (Group | Item)[]
	) {
		super(...children);
		this.name = typeof arg === "string" ? arg : arg.name;
		this.description = typeof arg === "object" ? (arg.description ?? "") : "";
		let icon = typeof arg === "object" ? (arg.icon ?? "inherit") : "inherit";
		this.icon_ = icon === "inherit" ? "inherit" : getIcon(icon);

		if (typeof arg === "object") {
			if (!arg.attributes || arg.attributes === "inherit") this.attributes_ = "inherit";
			else this.attributes_ = arg.attributes.map(attribute => (typeof attribute === "function" ? attribute(this) : attribute));
		} else {
			this.attributes_ = "inherit";
		}
	}

	public clone(): Group {
		return new Group(
			{
				name: this.name,
				description: this.description,
				icon: this.icon_,
				attributes: this.attributes_ === "inherit" ? "inherit" : this.attributes_.map(definition => definition.clone()),
			},
			...this.children,
		);
	}

	private serializeStandalone(): SerializedGroup {
		return {
			id: this.id,
			children: this.children.map(child => child.id),

			name: this.name,
			description: this.description,
			iconName: this.icon_ === "inherit" ? "inherit" : getIcon(this.icon).name,
			attributes:
				this.attributes_ === "inherit"
					? { type: "inherit" }
					: { type: "own", own: this.attributes_.map(attribute => attribute.serialize()) },
		};
	}

	/**
	 * Returns the icon associated with this group. If this group is set to inherit its icon from
	 * its parent, the parent icon is returned.
	 */
	public get icon(): Icon {
		if (this.isRoot) return getIcon(GraphIcon);
		if (this.icon_ === "inherit") {
			return this.parent!.icon;
		} else {
			return this.icon_;
		}
	}

	public deleteAttributeDefinition(attribute: AttributeDefinition): void {
		if (!this.getAttributeDefinition(attribute.name)) {
			throw `Error deleting attribute: Attempted to delete the attribute "${attribute}", but no such attribute exists on this object.`;
		}

		if (this.attributes_ === "inherit") {
			if (this.isRoot) return;
			this.parent!.deleteAttributeDefinition(attribute);
			return;
		}

		this.attributes_ = this.attributes_.filter(other => other !== attribute);
	}

	public getAttributeDefinition(name: string): AttributeDefinition | null {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) return null;
			return this.parent!.getAttributeDefinition(name);
		}

		return this.attributes_.find(attribute => attribute.name === name) ?? null;
	}

	/**
	 * Defines a new attribute definition for this group. If an attribute definition with the same
	 * name as the one provided already exists on this group, an error is thrown. If you intend to
	 * do so, use `overwriteAttributeDefinition()`.
	 *
	 * @param builder The attribute builder. Generally you'll get one of these from a static method
	 * on `AttributeDefinition`.
	 */
	public addNewAttributeDefinition(builder: AttributeDefinitionBuilder): void {
		// This group inherits attributes
		if (this.attributes_ === "inherit") {
			// This is the root - even if it "inherits" we add it to the root
			if (this.isRoot) {
				let attribute = builder(this);
				this.attributes_ = [attribute];
				return;
			}

			// If not, we inherit attributes from the parent, so this actually gets passed up to the parent
			this.parent!.addNewAttributeDefinition(builder);
		}

		// This group uses it's own attributes - doesn't inherit
		else {
			let attribute = builder(this);
			if (this.getAttributeDefinition(attribute.name)) {
				throw `Duplicate attribute: Attempted to add the attribute "${attribute.name}", but the attribute already exists. If this was intentional, use overwriteAttribute().`;
			}
			this.attributes_.push(attribute);
		}
	}

	public overwriteAttributeDefinition(builder: AttributeDefinitionBuilder): void {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) {
				let attribute = builder(this);
				this.attributes_ = [attribute];
				return;
			}

			this.parent?.overwriteAttributeDefinition(builder);
			return;
		}

		let attribute = builder(this);
		let newAttributes = this.attributes_.filter(other => other.name !== attribute.name);
		if (newAttributes.length === this.attributes_.length) {
			throw `Invalid attribute overwrite: Attempted to overwrite the attribute "${attribute.name}", but no such attribute exists. If this was intentional, use addNewAttribute().`;
		}
		this.attributes_.push(attribute);
	}

	public get attributeDefinitions(): readonly AttributeDefinition[] {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) {
				this.attributes_ = [AttributeDefinition.basic("Name", "shortText")(this)];
				return this.attributes_;
			}

			return this.parent!.attributeDefinitions;
		}

		return this.attributes_;
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
			attributes: "inherit",
		});

		if (group.attributes.type !== "inherit") {
			created.attributes_ = group.attributes.own.map(attribute => AttributeDefinition.deserialize(attribute, created));
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
	attributes: { type: "own"; own: SerializedAttributeDefinition[] } | { type: "inherit" };
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
