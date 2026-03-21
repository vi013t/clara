import BookIcon from "../../components/icons/BookIcon.svelte";
import { Point2D } from "../math/matrix.svelte";
import { Circle, type Shape } from "../math/shape.svelte";
import { Color } from "../ui/color.svelte";
import { getIcon, type Icon, type IconIdentifier } from "../ui/icons.svelte";
import { assignedLater, mapValues } from "../util/utils.svelte";
import {
	AttributeDefinition,
	attributeValue,
	PrimitiveAttribute,
	type AttributeLike,
	type AttributeValue,
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

export class Item extends TreeLeaf<Group, Item> {
	public attributes = $state(assignedLater<Record<string, AttributeValue | null>>());

	public constructor(value: Record<string, AttributeLike> | string) {
		super();
		this.attributes =
			typeof value === "string"
				? { name: new PrimitiveAttribute<string>(value) }
				: mapValues(value, attribute => attributeValue(attribute));
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
		return (this.attributes.name as PrimitiveAttribute<string>).value;
	}
}

export class Group extends TreeBranch<Group, Item> {
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
					attributes?: AttributeDefinition[] | "inherit";
			  }
			| string,
		...children: (Group | Item)[]
	) {
		super(...children);
		this.name = typeof arg === "string" ? arg : arg.name;
		this.description = typeof arg === "object" ? (arg.description ?? "") : "";
		let icon = typeof arg === "object" ? (arg.icon ?? "inherit") : "inherit";
		this.icon_ = icon === "inherit" ? "inherit" : getIcon(icon);
		this.attributes_ = typeof arg === "object" ? (arg.attributes ?? "inherit") : "inherit";
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

	public addNewAttributeDefinition(attribute: AttributeDefinition): void {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) {
				this.attributes_ = [attribute];
				return;
			}
			this.parent!.addNewAttributeDefinition(attribute);
		} else {
			if (this.getAttributeDefinition(attribute.name)) {
				throw `Duplicate attribute: Attempted to add the attribute "${attribute.name}", but the attribute already exists. If this was intentional, use overwriteAttribute().`;
			}
			this.attributes_.push(attribute);
		}
	}

	public overwriteAttributeDefinition(attribute: AttributeDefinition): void {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) {
				this.attributes_ = [attribute];
				return;
			}

			this.parent?.overwriteAttributeDefinition(attribute);
			return;
		}

		let newAttributes = this.attributes_.filter(other => other.name !== attribute.name);
		if (newAttributes.length === this.attributes_.length) {
			throw `Invalid attribute overwrite: Attempted to overwrite the attribute "${attribute.name}", but no such attribute exists. If this was intentional, use addNewAttribute().`;
		}
		this.attributes_.push(attribute);
	}

	public get attributes(): AttributeDefinition[] {
		if (this.attributes_ === "inherit") {
			if (this.isRoot) {
				this.attributes_ = [];
				return this.attributes_;
			}

			return this.parent!.attributes;
		}

		return this.attributes_;
	}

	public removeItem(item: Item): void {
		this.filterChildrenInPlace(child => child !== item);
	}
}

export type Node = Group | Item;

/**
 * An alias for `Group`. Semantically, `Database` is used to represent an entire project unit root,
 * such as a project or template.
 */
export type Database = Group;
