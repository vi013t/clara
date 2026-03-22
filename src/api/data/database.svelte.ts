import BookIcon from "../../components/icons/BookIcon.svelte";
import { Point2D } from "../math/matrix.svelte";
import { Circle, type Shape } from "../math/shape.svelte";
import { Color } from "../ui/color.svelte";
import { getIcon, type Icon, type IconIdentifier, type IconName } from "../ui/icons.svelte";
import type { Serialize } from "../util/serialize.svelte";
import { assignedLater, Objects } from "../util/utils.svelte";
import {
	AttributeDefinition,
	deserializeAttributeValue,
	PrimitiveAttributeValue,
	type AttributeDefinitionBuilder,
	type AttributeValue,
	type SerializedAttributeDefinition,
	type SerializedAttributeValue,
} from "./attribute/attribute.svelte";
import { TreeBranch, TreeLeaf } from "./tree.svelte";

export class GraphOutline<T extends Shape> {
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

	public static fromShapeAndColor<T extends Shape>(shape: T, color: Color): GraphOutline<T> {
		return new GraphOutline(shape, color);
	}
}

export type SerializedItem = {
	attributes: Record<string, SerializedAttributeValue | null>;
	id: number;
};

export class Item extends TreeLeaf<Group, Item> implements Serialize<SerializedItem> {
	public attributes = $state(assignedLater<Record<string, AttributeValue | null>>());

	public constructor(value: Record<string, AttributeValue | null> | string) {
		super();
		this.attributes = typeof value === "string" ? { name: new PrimitiveAttributeValue<string>("shortText", value) } : value;
	}

	public serialize(): SerializedItem {
		return { id: this.id, attributes: Objects.mapValues(this.attributes, attribute => attribute?.serialize() ?? null) };
	}

	public static deserializeUnsafe(item: SerializedItem): Item {
		let created = new Item(
			Objects.mapValues(item.attributes, attribute => (attribute ? deserializeAttributeValue(attribute) : null)),
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

	public addNewAttributeValue(name: string, value: AttributeValue | null) {
		if (this.getAttributeValue(name)) {
			throw `Invalid attribute additoin: Attempted to overwrite the attribute "${name}" on an item, but no such attribute exists. If this was intentional, use addNewAttributeValue().`;
		}
		this.attributes[name] = value;
	}

	public get icon(): Icon {
		if (this.isRoot) {
			return getIcon(BookIcon);
		}
		return this.parent!.icon;
	}

	public get name(): string {
		return (this.attributes.name as PrimitiveAttributeValue<string>).value;
	}
}

export class Group extends TreeBranch<Group, Item> implements Serialize<SerializedGroup> {
	public name = $state(assignedLater<string>());
	public description = $state(assignedLater<string>());
	public attributes_ = $state(assignedLater<AttributeDefinition[] | "inherit">());

	private icon_ = $state(assignedLater<Icon | "inherit">());

	public constructor(
		arg:
			| {
					name: string;
					description?: string;
					icon?: IconIdentifier | "inherit";
					attributes?: AttributeDefinitionBuilder[] | "inherit";
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
			else this.attributes_ = arg.attributes.map(attribute => attribute(this));
		}
	}

	serialize(): SerializedGroup {
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

	public get icon(): Icon {
		if (this.isRoot) return getIcon(BookIcon);
		if (this.icon_ === "inherit") {
			return this.parent!.icon;
		} else {
			return this.icon;
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

	public addNewAttributeDefinition(builder: AttributeDefinitionBuilder): void {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) {
				let attribute = builder(this);
				this.attributes_ = [attribute];
				return;
			}
			this.parent!.addNewAttributeDefinition(builder);
		} else {
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
				this.attributes_ = [];
				return this.attributes_;
			}

			return this.parent!.attributeDefinitions;
		}

		return this.attributes_;
	}

	public removeItem(item: Item): void {
		this.filterChildrenInPlace(child => child !== item);
	}

	public serializeAsDatabase(): SerializedDatabase {
		return {
			groups: this.root()
				.dfsBranches()
				.map(group => group.serialize()),
			items: this.root()
				.dfsLeaves()
				.map(item => item.serialize()),
			root: this.root().id,
		};
	}

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

	public static deserializeDatabase(database: SerializedDatabase): Database {
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
