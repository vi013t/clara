import { Project } from "../project.svelte.ts";
import { userSettings } from "./index.svelte.ts";

let actionListeners: { [Key in ActionName]?: () => void } = $state({
	"Save Project": () => Project.save(),
});

export type ActionName = "New Tab" | "Save Project";

export function onActionRequested(name: ActionName, callback: () => void): void {
	actionListeners[name] = callback;
}

export function runAction(name: ActionName) {
	actionListeners[name]?.();
}

export type Modifier = "ctrl" | "alt" | "shift";

export type Keybinding = {
	key: string;
	modifiers: Modifier[];
};

export function key(key: string, ...modifiers: Modifier[]): Keybinding {
	return { key, modifiers };
}

function isEditable(element: HTMLElement) {
	return (
		element.closest(`
			input:not([readonly]):not([disabled]),
			textarea:not([readonly]):not([disabled]),
			select:not([disabled]),
			[contenteditable=""],
			[contenteditable="true"]
		`) !== null
	);
}

function matchesHotkey(key: string, ctrl: boolean, alt: boolean, shift: boolean, binding: Keybinding): boolean {
	return (
		key.toLowerCase() === binding.key.toLowerCase() &&
		ctrl === binding.modifiers.includes("ctrl") &&
		alt === binding.modifiers.includes("alt") &&
		shift === binding.modifiers.includes("shift")
	);
}

export function pressHotkey(event: KeyboardEvent) {
	if (!isEditable(event.target as HTMLElement)) event.preventDefault();
	let actionName = Object.entries(userSettings().hotkeys).find(([_actionName, hotkey]) =>
		matchesHotkey(event.key, event.ctrlKey, event.altKey, event.shiftKey, hotkey),
	)?.[0] as ActionName | undefined;
	if (actionName) runAction(actionName);
}
