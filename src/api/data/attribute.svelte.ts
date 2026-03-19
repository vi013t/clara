import CalendarIcon from "../../components/icons/CalendarIcon.svelte";
import GraphIcon from "../../components/icons/GraphIcon.svelte";
import NumberSignIcon from "../../components/icons/NumberSignIcon.svelte";
import ParagraphIcon from "../../components/icons/ParagraphIcon.svelte";
import RulerIcon from "../../components/icons/RulerIcon.svelte";
import TextIcon from "../../components/icons/TextIcon.svelte";
import WeightScaleIcon from "../../components/icons/WeightScaleIcon.svelte";
import { Project } from "../project.svelte";
import type { ManualDataset } from "./dataset.svelte";
import { Length, Measurement, Weight } from "./measurement.svelte";
import { Template } from "../userdata/template.svelte";
import type { IconComponent } from "../ui/icons.svelte";
import { Container, type Cloneable } from "../util/Clone.svelte";
import { empty } from "../util/utils.svelte";

const fieldValueTypes = [
	{
		name: "Short text",
		icon: TextIcon,
	},
	{
		name: "Long text",
		icon: ParagraphIcon,
	},
	{
		name: "Number",
		icon: NumberSignIcon,
	},
	{
		name: "Entry",
		icon: GraphIcon,
	},
	{
		name: "Date",
		icon: CalendarIcon,
	},
	{
		name: "Length",
		icon: RulerIcon,
	},
	{
		name: "Weight",
		icon: WeightScaleIcon,
	},
] as const satisfies { name: string; icon: IconComponent }[];

export type AttributeType = typeof fieldValueTypes extends (infer T)[] ? (T extends { name: string } ? T["name"] : never) : never;

export class Style implements Cloneable<Style> {
	bold: boolean = $state(empty());
	italic: boolean = $state(empty());

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
	text: string = $state(empty());
	public readonly style: Container<Style> = $state(empty());

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

export class DocumentContent implements Cloneable<DocumentContent> {
	private parts: StyledText[] = $state(empty());

	public constructor(parts?: StyledText[]) {
		this.parts = parts ?? [];
		if (this.parts.length < 1) this.parts = [new StyledText("", new Style({ bold: false, italic: false }))];
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

	public clone(): DocumentContent {
		return new DocumentContent();
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
		return new DocumentContent(this.parts.map(part => part.clone()).filter(predicate));
	}

	public partCount(): number {
		return this.parts.length;
	}
}

type AttributeTypes = {
	number: PrimitiveAttribute<number>;
	"short text": PrimitiveAttribute<string>;
	"long text": DocumentContent;
	length: Measurement<Length>;
	weight: Measurement<Weight>;
};

export type AttributeValue = AttributeTypes[keyof AttributeTypes];

export class PrimitiveAttribute<T> implements Cloneable<PrimitiveAttribute<T>> {
	value: T = $state(empty());

	public constructor(value: T) {
		this.value = value;
	}

	public clone(): PrimitiveAttribute<T> {
		return new PrimitiveAttribute(this.value);
	}
}

export class Attribute {
	public name: string = $state(empty());
	public type: AttributeType = $state(empty());
	private id_: number = $state(empty());

	private static fieldID = 0;

	public constructor(name: string, type: AttributeType) {
		this.name = name;
		this.type = type;
		this.id_ = Attribute.fieldID++;
	}

	public get id() {
		return this.id_;
	}

	public clone(): Attribute {
		return new Attribute(this.name, this.type);
	}

	public get dataset(): Container<ManualDataset> {
		for (let dataset of Project.get().database.ref().datasets.ref()) {
			let set = dataset.ref();
			if (set.isManual()) {
				for (let field of set.fields.ref()) {
					if (field.id === this.id) {
						return new Container(set);
					}
				}
			}
		}

		for (let dataset of Template.all.map(template => template.database.ref().datasets.ref()).flat()) {
			let set = dataset.ref();
			if (set.isManual()) {
				for (let field of set.fields.ref()) {
					if (field.id === this.id) {
						return new Container(set);
					}
				}
			}
		}

		throw `Internal error: Field "${this.name}" is not part of a dataset.`;
	}

	public get icon(): IconComponent {
		return fieldValueTypes.find(type => type.name === this.type)!.icon;
	}

	public delete(): void {
		this.dataset.ref().deleteField(this.id);
	}
}
