import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { Color } from "./color.svelte.ts";

export type SerializedStyle = { bold: boolean; italic: boolean; color: string | null; underline: boolean };

export class Style implements Cloneable<Style>, Serialize<SerializedStyle> {
	public bold = $state(false);
	public italic = $state(false);
	public underline = $state(false);
	public color: Color | null = $state(null);

	public constructor({
		bold,
		italic,
		color,
		underline,
	}: Partial<{ bold: boolean; italic: boolean; underline: boolean; color: Color | null }>) {
		this.bold = bold ?? false;
		this.italic = italic ?? false;
		this.underline = underline ?? false;
		this.color = color ?? null;
	}

	public serialize(): SerializedStyle {
		return {
			bold: this.bold,
			italic: this.italic,
			underline: this.underline,
			color: this.color?.hex ?? null,
		};
	}

	public static deserialize(style: SerializedStyle): Style {
		return new Style({
			bold: style.bold,
			italic: style.italic,
			underline: style.underline,
			color: style.color ? Color.hex(style.color) : null,
		});
	}

	public clone(): Style {
		return new Style({ bold: this.bold, italic: this.italic });
	}

	public equals(other: Style): boolean {
		return (
			this.bold === other.bold &&
			this.italic === other.italic &&
			this.underline === other.underline &&
			((this.color === null && other.color === null) ||
				(this.color !== null && other.color !== null && this.color.equals(other.color)))
		);
	}

	public merge(other: Style, override: boolean): Style {
		return new Style({
			bold: override ? other.bold : this.bold || other.bold,
			underline: override ? other.underline : this.underline || other.underline,
			italic: override ? other.italic : this.italic || other.italic,
			color: override || this.color === null ? other.color : this.color,
		});
	}
}

export type SerializedStyledText = { text: string; style: SerializedStyle };

export class StyledText implements Cloneable<StyledText>, Serialize<SerializedStyledText> {
	public text: string;
	public style: Style;

	public constructor(text: string, style: Style) {
		this.text = $state(text);
		this.style = $state(style);
	}

	public serialize(): SerializedStyledText {
		return {
			text: this.text,
			style: this.style.serialize(),
		};
	}

	public static deserialize(text: SerializedStyledText): StyledText {
		return new StyledText(text.text, Style.deserialize(text.style));
	}

	public clone(): StyledText {
		return new StyledText(this.text, this.style.clone());
	}

	public styleRange(start: number, end: number, style: Style, override?: true): StyledText[] {
		const parts: StyledText[] = [];
		start = Math.min(Math.max(start, 0), this.text.length);
		end = Math.min(Math.max(end, 0), this.text.length);

		if (start > 0) {
			parts.push(new StyledText(this.text.substring(0, start), this.style));
		}

		if (start < end) {
			parts.push(new StyledText(this.text.substring(start, end), this.style.merge(style, override ?? false)));
		}

		if (end < this.text.length) {
			parts.push(new StyledText(this.text.substring(end, this.text.length), this.style));
		}

		return parts;
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
				html += `<span class="character" style="${this.style.color ? "color: " + this.style.color + ";" : ""}">${character}</span>`;
			}
		}

		if (this.style.bold) html += "</b>";

		if (addCursor) html += "<span class='cursor'>|</span>";
		element.innerHTML = html;

		return element;
	}
}

export type SerializedRichText = {
	parts: { text: string; style: SerializedStyle }[];
};

export class RichText implements Cloneable<RichText>, Serialize<SerializedRichText> {
	public parts: StyledText[];

	public constructor(parts?: StyledText[]) {
		this.parts = $state(parts ?? []);
		if (this.parts.length < 1) this.parts = [new StyledText("", new Style({ bold: false, italic: false }))];
	}

	public serialize(): SerializedRichText {
		return {
			parts: this.parts.map(part => part.serialize()),
		};
	}

	public styleRange(start: number, end: number, style: Style, override?: true) {
		let position = 0;
		const parts: StyledText[] = [];
		let rangeLength = end - start;

		for (const part of this.parts) {
			const relativeStart = start - position;
			const relativeEnd = relativeStart + rangeLength;
			console.log(relativeStart, relativeEnd);

			parts.push(...part.styleRange(relativeStart, relativeEnd, style, override));

			position += part.text.length;
		}
		this.reconstruct(new RichText(parts));
	}

	public reconstruct(doc: RichText): void {
		this.parts = doc.parts;
	}

	public get content(): string {
		return this.parts.map(part => part.text).join("");
	}

	public static deserialize(doc: SerializedRichText): RichText {
		return new RichText(doc.parts.map(part => StyledText.deserialize(part)));
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
