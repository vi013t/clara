import type { RichText } from "$lib/data/attribute/richtext.svelte";
import { handlers } from "./internal.svelte";

export type EventHandler<Target extends keyof EventData, Name extends keyof HTMLElementEventMap> = {
	target: Target;
	name: Name;
	callback: (event: HTMLElementEventMap[Name], data: EventData[Target]) => void;
};

export type EventData = {
	editor: RichText;
};

export function on<Target extends keyof EventData, Name extends keyof HTMLElementEventMap>(
	target: Target,
	name: Name,
	callback: (event: HTMLElementEventMap[Name], data: EventData[Target]) => void,
) {
	handlers.push({ target, name, callback });
}
