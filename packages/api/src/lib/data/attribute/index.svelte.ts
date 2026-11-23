import {
	AnyType,
	BooleanType,
	ListType,
	NumberType,
	ObjectType,
	PrimitiveType,
	SelectType,
	StringType,
} from "../primitive.svelte.ts";
import { Color } from "./color.svelte.ts";
import { DateTime } from "./datetime.svelte.ts";
import { AttributeDefinition, type SerializedAttributeDefinition } from "./definition.svelte.ts";
import {
	AttributeGraph,
	NodeArgument,
	nodeCategoryColors,
	NodeInstance,
	NodeParameter,
	nodes,
	NodeType,
	nodeTypeColors,
	type NodeNodeArgument,
	type Type,
	type ValueArgument,
} from "./generated.svelte.ts";
import { Kilograms, Length, Measurement, Meters, Weight, type MeasurementType } from "./measurement.svelte.ts";
import { NumberAttribute, PrimitiveArrayAttributeValue, PrimitiveAttributeValue, StringAttribute } from "./primitive.svelte.ts";
import { RichText, Style, StyledText, type SerializedRichText } from "./richtext.svelte.ts";
import {
	AttributeType,
	attributeTypes,
	type AttributeContext,
	type AttributeTypeName,
	type AttributeTypeNameValue,
} from "./type.svelte.ts";
import {
	AttributeRef,
	AttributeValue,
	BasicAttributeBox,
	type AttributeBox,
	type SerializedAttributeRef,
	type SerializedAttributeValue,
} from "./value.svelte.ts";

export {
	AttributeDefinition,
	AttributeGraph,
	AttributeRef,
	AttributeType,
	attributeTypes,
	AttributeValue,
	BasicAttributeBox,
	Color,
	DateTime,
	Kilograms,
	Length,
	Measurement,
	Meters,
	NodeArgument,
	nodeCategoryColors,
	NodeInstance,
	NodeParameter,
	nodes,
	NodeType,
	nodeTypeColors,
	NumberAttribute,
	PrimitiveArrayAttributeValue,
	PrimitiveAttributeValue,
	RichText,
	StringAttribute,
	Style,
	StyledText,
	Weight,
	type AttributeBox,
	type AttributeTypeNameValue,
	type NodeNodeArgument,
	type SerializedAttributeDefinition,
	type SerializedAttributeRef,
	type SerializedRichText,
	type Type,
	type ValueArgument,
};

export type { AttributeContext, AttributeTypeName, MeasurementType, SerializedAttributeValue };

export function string() {
	return new StringType();
}

export function any() {
	return new AnyType();
}

export function number() {
	return new NumberType();
}

export function boolean() {
	return new BooleanType();
}

export function select() {
	return new SelectType();
}

export function listOf(subtype: PrimitiveType<any>) {
	return new ListType(subtype);
}

export function object() {
	return new ObjectType();
}
