import { AttributeDefinition } from "./definition.svelte.ts";
import { RichText, StyledText, Style, type SerializedRichText } from "./richtext.svelte.ts";
import { StringAttribute, NumberAttribute, PrimitiveArrayAttributeValue, PrimitiveAttributeValue } from "./primitive.svelte.ts";
import {
	attributeTypes,
	AttributeType,
	type AttributeTypeName,
	type AttributeContext,
	type AttributeTypeNameValue,
} from "./type.svelte.ts";
import { DateTime } from "./datetime.svelte.ts";
import { Color } from "./color.svelte.ts";
import { Measurement, Length, Weight, Meters, Kilograms, type MeasurementType } from "./measurement.svelte.ts";
import { AttributeValue, type SerializedAttributeValue } from "./value.svelte.ts";

export {
	RichText,
	Style,
	StyledText,
	StringAttribute,
	NumberAttribute,
	PrimitiveArrayAttributeValue,
	PrimitiveAttributeValue,
	AttributeType,
	AttributeDefinition,
	DateTime,
	Color,
	Measurement,
	Length,
	Weight,
	Meters,
	Kilograms,
	attributeTypes,
	AttributeValue,
	type SerializedRichText,
	type AttributeTypeNameValue,
};

export type { AttributeTypeName, SerializedAttributeValue, AttributeContext, MeasurementType };
