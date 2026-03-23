import CalendarIcon from "../../../components/icons/CalendarIcon.svelte";
import ColorPaletteIcon from "../../../components/icons/ColorPaletteIcon.svelte";
import GraphIcon from "../../../components/icons/GraphIcon.svelte";
import NumberSignIcon from "../../../components/icons/NumberSignIcon.svelte";
import ParagraphIcon from "../../../components/icons/ParagraphIcon.svelte";
import RulerIcon from "../../../components/icons/RulerIcon.svelte";
import TextIcon from "../../../components/icons/TextIcon.svelte";
import WeightScaleIcon from "../../../components/icons/WeightScaleIcon.svelte";
import { getIcon, type Icon, type IconIdentifier } from "../../ui/icons.svelte";
import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize, Serialized, Serializer } from "../../util/serialize.svelte";
import type { AttributeValue } from "./attributevalue.svelte";
import { Color } from "./color.svelte";
import { DateTime } from "./datetime.svelte";
import { Measurement } from "./measurement.svelte";
import { EntriesAttribute, NumberAttribute, StringAttribute } from "./primitive.svelte";
import { RichText } from "./richtext.svelte";

export type AttributeContext = "settings" | "spreadsheet" | "none";

interface InternalAttributeType<
	Name extends string = any,
	Frontend extends Serialize<Backend> = any,
	Backend = Serialized<Frontend>,
> extends Cloneable<InternalAttributeType> {
	icon: Icon;
	name: Name;
	type: any;

	serialize(deserialized: Frontend): Backend;
	deserialize(serialized: Backend): Frontend;
}

export type AttributeType<
	Name extends AttributeTypeName = AttributeTypeName,
	Frontend extends Serialize<Backend> = any,
	Backend = Serialized<Frontend>,
> = InternalAttributeType<Name, Frontend, Backend>;

function attributeType<Frontend extends Serialize<Backend>, Backend, const Name extends string>(
	name: Name,
	type: Serializer<Frontend, Backend>,
	icon: IconIdentifier,
): InternalAttributeType<Name, Frontend, Backend> {
	return {
		icon: getIcon(icon),
		name,
		type,

		serialize(value: Frontend) {
			return value.serialize();
		},

		deserialize(value: Backend): Frontend {
			return type.deserialize(value);
		},

		clone() {
			return this; // AttributeTypes are immutable
		},
	};
}

export const attributeTypes = [
	attributeType("shortText", StringAttribute, TextIcon),
	attributeType("longText", RichText, ParagraphIcon),
	attributeType("number", NumberAttribute, NumberSignIcon),
	attributeType("color", Color, ColorPaletteIcon),
	attributeType("entries", EntriesAttribute, GraphIcon),
	attributeType("date", DateTime, CalendarIcon),
	attributeType("length", Measurement, RulerIcon),
	attributeType("weight", Measurement, WeightScaleIcon),
] as const satisfies InternalAttributeType[];

export type AttributeTypeName = typeof attributeTypes extends (infer A)[]
	? A extends InternalAttributeType
		? A["name"]
		: never
	: never;

export namespace AttributeType {
	export function fromName<Name extends AttributeTypeName>(name: Name): AttributeType<Name> {
		return attributeTypes.find(type => type.name === name) as AttributeType<Name>;
	}

	export function fromValue<Name extends AttributeTypeName, Value extends AttributeValue<Name> = AttributeValue<Name>>(
		value: Value,
	): AttributeType<Name> {
		return attributeTypes.find(type => value instanceof type.type)! as AttributeType<Name>;
	}

	export function names(): AttributeTypeName[] {
		return attributeTypes.map(type => type.name);
	}
}
