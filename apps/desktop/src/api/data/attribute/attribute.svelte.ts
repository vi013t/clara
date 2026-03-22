import CalendarIcon from "../../../components/icons/CalendarIcon.svelte";
import ColorPaletteIcon from "../../../components/icons/ColorPaletteIcon.svelte";
import GraphIcon from "../../../components/icons/GraphIcon.svelte";
import NumberSignIcon from "../../../components/icons/NumberSignIcon.svelte";
import ParagraphIcon from "../../../components/icons/ParagraphIcon.svelte";
import RulerIcon from "../../../components/icons/RulerIcon.svelte";
import TextIcon from "../../../components/icons/TextIcon.svelte";
import WeightScaleIcon from "../../../components/icons/WeightScaleIcon.svelte";
import { todo } from "../../errors.svelte";
import { getIcon, type Icon, type IconComponent } from "../../ui/icons.svelte";
import { Container, type Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";
import type { Group } from "../database.svelte";
import { DateTime } from "./datetime.svelte";
import { Length, Measurement, Weight, type SerializedMeasurement } from "./measurement.svelte";

export class Style implements Cloneable<Style> {
	bold: boolean = $state(assignedLater());
	italic: boolean = $state(assignedLater());

	public constructor({ bold, italic }: { bold: boolean; italic: boolean }) {
		this.bold = bold;
		this.italic = italic;
	}

	clone(): Style {
		return new Style({ bold: this.bold, italic: this.italic });
	}

	public equals(other: Style): boolean {
		return this.bold === other.bold && this.italic === other.italic;
	}
}

export class StyledText implements Cloneable<StyledText> {
	text: string = $state(assignedLater());
	public readonly style: Container<Style> = $state(assignedLater());

	public constructor(text: string, style: { bold?: boolean; italic?: boolean }) {
		this.text = text;
		this.style = new Container(new Style({ bold: style.bold ?? false, italic: style.italic ?? false }));
	}

	clone(): StyledText {
		return new StyledText(this.text, { bold: this.style.ref().bold, italic: this.style.ref().italic });
	}

	public toHTML(index: number, addCursor: boolean = false): HTMLElement {
		let element = document.createElement("pre");
		element.setAttribute("data-part-index", `${index}`);

		let html = "";
		if (this.style.ref().bold) html += "<b>";

		for (let character of this.text) {
			if (character === "\n") {
				html += "<br>";
			} else {
				html += `<span class="character">${character}</span>`;
			}
		}

		if (this.style.ref().bold) html += "</b>";

		if (addCursor) html += "<span class='cursor'>|</span>";
		element.innerHTML = html;

		return element;
	}
}

export type SerializedRichText = {
	parts: { text: string; style: { bold: boolean; italic: boolean } }[];
};

export class RichText implements Cloneable<RichText>, Serialize<SerializedAttributeValue> {
	private parts: StyledText[] = $state(assignedLater());

	public constructor(parts?: StyledText[]) {
		this.parts = parts ?? [];
		if (this.parts.length < 1) this.parts = [new StyledText("", new Style({ bold: false, italic: false }))];
	}

	public serialize(): SerializedAttributeValue {
		return {
			type: "longText",
			longText: {
				parts: this.parts.map(part => ({
					text: part.text,
					style: { bold: part.style.ref().bold, italic: part.style.ref().italic },
				})),
			},
		};
	}

	public static deserialize(doc: SerializedRichText): RichText {
		return new RichText(doc.parts.map(part => new StyledText(part.text, part.style)));
	}

	public addPart(part: StyledText) {
		this.parts.push(part);
	}

	public addPartAtIndex(part: StyledText, index: number): void {
		this.parts.splice(index, 0, part);
	}

	public prependPart(part: StyledText) {
		this.parts.unshift(part);
	}

	public clone(): RichText {
		return new RichText();
	}

	public partAtIndex(index: number): Container<StyledText> {
		return new Container(this.parts[index]);
	}

	public toHTML(cursor?: true): HTMLElement[] {
		return this.parts.map((part, index) => part.toHTML(index, cursor ?? false));
	}

	public some(callback: (part: StyledText, index: number) => unknown) {
		return this.parts.some(callback);
	}

	public filter(predicate: (part: StyledText, index: number) => unknown) {
		return new RichText(this.parts.map(part => part.clone()).filter(predicate));
	}

	public partCount(): number {
		return this.parts.length;
	}
}

export type AttributeValue = AttributeTypes[keyof AttributeTypes];
export type AttributeLike = AttributeValue | number | string;

export function deserializeAttributeValue(value: SerializedAttributeValue): AttributeValue {
	switch (value.type) {
		case "number":
			return new PrimitiveAttributeValue<number>("number", value.number);
		case "color":
			return new PrimitiveAttributeValue<string>("color", value.color);
		case "shortText":
			return new PrimitiveAttributeValue<string>("shortText", value.shortText);
		case "longText":
			return RichText.deserialize(value.longText);
		case "length":
			return Measurement.deserialize(value.length);
		case "weight":
			return Measurement.deserialize(value.weight);
		case "date":
			todo();
		case "entries":
			return new PrimitiveArrayAttribute<number>(value.entries);
	}
}

export class PrimitiveArrayAttribute<T extends number>
	implements Cloneable<PrimitiveArrayAttribute<T>>, Serialize<SerializedAttributeValue>
{
	values: T[] = $state(assignedLater());

	public constructor(value: T[]) {
		this.values = value;
	}

	public serialize(): SerializedAttributeValue {
		return {
			type: "entries",
			entries: this.values,
		};
	}

	public static deserialize<T extends number>(value: T[]): PrimitiveArrayAttribute<T> {
		return new PrimitiveArrayAttribute(value);
	}

	public clone(): PrimitiveArrayAttribute<T> {
		return new PrimitiveArrayAttribute([...this.values]);
	}
}

export type AttributeContext = "settings" | "spreadsheet";

export class PrimitiveAttributeValue<T extends string | number> implements Serialize<SerializedAttributeValue> {
	value: T = $state(assignedLater());
	readonly type: AttributeTypeName;

	public constructor(type: AttributeTypeName, value: T) {
		this.type = type;
		this.value = value;
	}

	public serialize(): SerializedAttributeValue {
		return { type: this.type, [this.type]: this.value } as any;
	}
}

export type SerializedAttributeDefinition = {
	name: string;
	type: AttributeTypeName;
	id: number;
	groupId: number;
};

export type AttributeDefinitionBuilder = (group: Group) => AttributeDefinition;

export class AttributeDefinition implements Serialize<SerializedAttributeDefinition> {
	public name: string = $state(assignedLater());
	public type: AttributeTypeName = $state(assignedLater());
	private id_: number = $state(assignedLater());
	public group = $state(assignedLater<Group>());

	private static nextID = 0;

	private constructor(name: string, type: AttributeTypeName, group: Group, id?: number) {
		this.name = name;
		this.type = type;
		this.group = group;
		this.id_ = id ?? AttributeDefinition.nextID++;
	}

	public serialize(): SerializedAttributeDefinition {
		return {
			name: this.name,
			type: this.type,
			id: this.id_,
			groupId: this.group.id,
		};
	}

	public static deserialize(attribute: SerializedAttributeDefinition, group: Group): AttributeDefinition {
		if (AttributeDefinition.nextID <= attribute.id) AttributeDefinition.nextID = attribute.id + 1;
		return new AttributeDefinition(attribute.name, attribute.type as AttributeTypeName, null!);
	}

	public get id() {
		return this.id_;
	}

	public static basic(name: string, type: AttributeTypeName): AttributeDefinitionBuilder {
		return (group: Group) => new AttributeDefinition(name, type, group);
	}

	public get icon(): Icon {
		return getIcon(attributeTypes.find(type => type.name === this.type)!.icon);
	}
}

export const attributeTypes = [
	{
		name: "shortText",
		icon: TextIcon,
	},
	{
		name: "longText",
		icon: ParagraphIcon,
	},
	{
		name: "number",
		icon: NumberSignIcon,
	},
	{
		name: "entries",
		icon: GraphIcon,
	},
	{
		name: "date",
		icon: CalendarIcon,
	},
	{
		name: "color",
		icon: ColorPaletteIcon,
	},
	{
		name: "length",
		icon: RulerIcon,
	},
	{
		name: "weight",
		icon: WeightScaleIcon,
	},
] as const satisfies {
	name: string;
	icon: IconComponent;
}[];

export type AttributeTypes = {
	number: PrimitiveAttributeValue<number>;
	shortText: PrimitiveAttributeValue<string>;
	color: PrimitiveAttributeValue<string>;
	longText: RichText;
	length: Measurement<Length>;
	weight: Measurement<Weight>;
	entries: PrimitiveArrayAttribute<number>;
	date: DateTime;
};

export type SerializedAttributeValue =
	| {
			type: "number";
			number: number;
	  }
	| {
			type: "shortText";
			shortText: string;
	  }
	| {
			type: "date";
			date: DateTime;
	  }
	| {
			type: "color";
			color: string;
	  }
	| {
			type: "longText";
			longText: SerializedRichText;
	  }
	| {
			type: "length";
			length: SerializedMeasurement;
	  }
	| {
			type: "weight";
			weight: SerializedMeasurement;
	  }
	| {
			type: "entries";
			entries: number[];
	  };

export type AttributeTypeName = typeof attributeTypes extends (infer T)[]
	? T extends { name: string }
		? T["name"]
		: never
	: never;
