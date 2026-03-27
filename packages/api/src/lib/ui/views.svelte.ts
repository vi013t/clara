import { ClockIcon, GraphIcon, SpreadsheetIcon, TreeIcon } from "./icons.svelte.ts";

export const views = {
	hierarchy: {
		icon: TreeIcon,
	},
	graph: {
		icon: GraphIcon,
	},
	spreadsheet: {
		icon: SpreadsheetIcon,
	},
	timeline: {
		icon: ClockIcon,
	},
} as const;

export type View = keyof typeof views;
