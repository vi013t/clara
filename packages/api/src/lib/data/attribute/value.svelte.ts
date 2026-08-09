import { Project } from "@clara/api/project";
import type { Cloneable, Serialize, Serialized } from "@clara/api/utils";
import type { Item } from "../database.svelte.ts";
import type { AttributeDefinition } from "./index.svelte.ts";
import { AttributeType, attributeTypes, type AttributeTypeName } from "./type.svelte.ts";

export class EmptyAttributeValue implements Serialize<{}>, Cloneable<EmptyAttributeValue> {
	public clone(): EmptyAttributeValue {
		return new EmptyAttributeValue();
	}

	serialize(): {} {
		return {};
	}

	public static deserialize(_value: {}) {
		return new EmptyAttributeValue();
	}
}

export type SerializedAttributeRef = {
	item: number;
	name: string;
};

export interface AttributeBox {
	set value(attributeValue: AttributeValue | null);
	get value(): AttributeValue | null;
	valueAs<T extends AttributeValue>(): T | null;
}

export class BasicAttributeBox implements AttributeBox {
	private value_: AttributeValue | null = $state(null);

	public constructor(value: AttributeValue | null) {
		this.value_ = value;
	}

	set value(value: AttributeValue | null) {
		this.value_ = value;
	}

	get value(): AttributeValue | null {
		return this.value_;
	}

	valueAs<T extends AttributeValue>(): T | null {
		return this.value as T | null;
	}
}

export class AttributeRef implements Cloneable<AttributeRef>, Serialize<SerializedAttributeRef>, AttributeBox {
	private item_: number;

	public name: string;

	public constructor(item: Item | number, name: string) {
		this.item_ = $state(typeof item === "number" ? item : item.id);
		this.name = $state(name);
	}

	public clone(): AttributeRef {
		return new AttributeRef(this.item_, this.name);
	}

	public get item() {
		return Project.get()!
			.database.dfsItems()
			.find(item => item.id === this.item_)!;
	}

	public set item(item: Item) {
		this.item_ = item.id;
	}

	public serialize(): SerializedAttributeRef {
		return { item: this.item.id, name: this.name };
	}

	public static deserialize(attribute: SerializedAttributeRef): AttributeRef {
		return new AttributeRef(attribute.item, attribute.name);
	}

	public get value(): AttributeValue | null {
		return this.item.attributes[this.name] ?? null;
	}

	public get definition(): AttributeDefinition {
		return this.item.type.attributes.find(def => def.name === this.name)!;
	}

	public set value(value: AttributeValue | null) {
		this.item.attributes[this.name] = value;
	}

	public valueAs<T extends AttributeValue>(): T | null {
		return (this.item.attributes[this.name] as T) ?? null;
	}
}

export type AttributeValue<Name extends AttributeTypeName = AttributeTypeName> = typeof attributeTypes extends (infer A)[]
	? A extends AttributeType<Name, infer Frontend>
		? Frontend
		: never
	: never;

export type SerializedAttributeValue<
	Name extends AttributeTypeName = AttributeTypeName,
	Value extends AttributeValue<Name> = AttributeValue<Name>,
> = {
	type: Name;
	value: Serialized<Value>;
};

export namespace AttributeValue {
	export function deserialize<Name extends AttributeTypeName>(value: SerializedAttributeValue): AttributeValue<Name> {
		return AttributeType.fromName(value.type).deserialize(value.value);
	}

	export function serialize<Name extends AttributeTypeName, Value extends AttributeValue<Name>>(
		value: Value,
	): SerializedAttributeValue<Name, Value> {
		return { type: AttributeType.fromValue<Name>(value).name, value: value.serialize() as Serialized<Value> };
	}
}
