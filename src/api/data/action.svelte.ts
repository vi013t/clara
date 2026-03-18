type Action = {
	undo?: () => void;
	run: () => void;
};

let actionHistory: Action[] = $state([]);
let undoneActions: Action[] = $state([]);

export function undo() {
	let action = actionHistory.pop();
	if (!action?.undo) return;
	undoneActions.push(action);
	action.undo();
}

export function redo() {
	undoneActions.pop()?.run();
}
