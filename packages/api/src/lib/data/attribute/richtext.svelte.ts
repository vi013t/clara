import type { Cloneable } from "../../util/Clone.svelte";
import { assignedLater } from "../../util/index.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { Color } from "./color.svelte.ts";

export class Style implements Cloneable<Style> {
	public bold = $state(false);
	public italic = $state(false);
	public underline = $state(false);
	public color = $state(Color.black);

	public constructor({ bold, italic }: Partial<{ bold: boolean; italic: boolean }>) {
		this.bold = bold ?? false;
		this.italic = italic ?? false;
	}

	public clone(): Style {
		return new Style({ bold: this.bold, italic: this.italic });
	}

	public equals(other: Style): boolean {
		return (
			this.bold === other.bold &&
			this.italic === other.italic &&
			this.underline === other.underline &&
			this.color.equals(other.color)
		);
	}
}

export class StyledText implements Cloneable<StyledText> {
	public text = $state(assignedLater<string>());
	public style = $state(assignedLater<Style>());

	public constructor(text: string, style: { bold?: boolean; italic?: boolean }) {
		this.text = text;
		this.style = new Style({ bold: style.bold ?? false, italic: style.italic ?? false });
	}

	clone(): StyledText {
		return new StyledText(this.text, { bold: this.style.bold, italic: this.style.italic });
	}

	public toHTML(index: number, addCursor: boolean = false): HTMLElement {
		let element = document.createElement("pre");
		element.setAttribute("data-part-index", `${index}`);

		let html = "";
		if (this.style.bold) html += "<b>";

		for (let character of this.text) {
			if (character === "\n") {
				html += "<br>";
			} else {
				html += `<span class="character">${character}</span>`;
			}
		}

		if (this.style.bold) html += "</b>";

		if (addCursor) html += "<span class='cursor'>|</span>";
		element.innerHTML = html;

		return element;
	}
}

export type SerializedRichText = {
	parts: { text: string; style: { bold: boolean; italic: boolean } }[];
};

export class RichText implements Cloneable<RichText>, Serialize<SerializedRichText> {
	private parts: StyledText[] = $state(assignedLater());

	public constructor(parts?: StyledText[]) {
		this.parts = parts ?? [];
		if (this.parts.length < 1) this.parts = [new StyledText("", new Style({ bold: false, italic: false }))];
	}

	public serialize(): SerializedRichText {
		return {
			parts: this.parts.map(part => ({
				text: part.text,
				style: { bold: part.style.bold, italic: part.style.italic },
			})),
		};
	}

	public reconstruct(doc: RichText): void {
		this.parts = doc.parts;
	}

	public get content(): string {
		return this.parts.map(part => part.text).join("");
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

	public partAtIndex(index: number): StyledText {
		return this.parts[index];
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
