import { Container, type Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";

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
				style: { bold: part.style.ref().bold, italic: part.style.ref().italic },
			})),
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
