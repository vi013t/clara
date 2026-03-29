import type { IconIdentifier } from "./icons.svelte.ts";

export const views = {
	hierarchy: {
		icon: "FolderTree",
	},
	graph: {
		icon: "Share2",
	},
	spreadsheet: {
		icon: "Table2",
	},
	timeline: {
		icon: "Clock",
	},
} as const satisfies { [key: string]: { icon: IconIdentifier } };

export type View = keyof typeof views;
