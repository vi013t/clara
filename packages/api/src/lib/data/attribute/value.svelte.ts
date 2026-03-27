import type { Serialized } from "../../util/serialize.svelte.ts";
import { AttributeType, attributeTypes, type AttributeTypeName } from "./type.svelte.ts";

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
