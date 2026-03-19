import SpreadsheetIcon from "../../../components/icons/SpreadsheetIcon.svelte";
import GraphIcon from "../../../components/icons/GraphIcon.svelte";
import TreeIcon from "../../../components/icons/TreeIcon.svelte";

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
} as const;

export type View = keyof typeof views;
