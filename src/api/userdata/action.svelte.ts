let actionListeners: { [Key in ActionName]?: () => void } = $state({});

type ActionName = "New Tab";

export function onActionRequested(name: ActionName, callback: () => void): void {
	actionListeners[name] = callback;
}

export function runAction(name: ActionName) {
	actionListeners[name]?.();
}

type Modifier = "ctrl" | "alt" | "shift";

type Keybinding = {
	key: string;
	modifiers: Modifier[];
};

function key(key: string, ...modifiers: Modifier[]): Keybinding {
	return { key, modifiers };
}

let hotkeys: { [Key in ActionName]?: Keybinding } = $state({
	"New Tab": key("n", "ctrl"),
});

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
	let actionName = Object.entries(hotkeys).find(([_actionName, hotkey]) =>
		matchesHotkey(event.key, event.ctrlKey, event.altKey, event.shiftKey, hotkey),
	)?.[0] as ActionName | undefined;
	if (actionName) runAction(actionName);
}
