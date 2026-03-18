import SpreadsheetIcon from "../components/icons/SpreadsheetIcon.svelte";
import GraphIcon from "../components/icons/GraphIcon.svelte";
import TreeIcon from "../components/icons/TreeIcon.svelte";
import type { Icon } from "./components";
import ParagraphIcon from "../components/icons/ParagraphIcon.svelte";
import NumberSignIcon from "../components/icons/NumberSignIcon.svelte";
import TextIcon from "../components/icons/TextIcon.svelte";
import { type ValueType } from "./data/dataset";
import RulerIcon from "../components/icons/RulerIcon.svelte";
import WeightScaleIcon from "../components/icons/WeightScaleIcon.svelte";

export function valueTypeIcon(type: ValueType): Icon {
	return {
		number: NumberSignIcon,
		"long text": ParagraphIcon,
		"short text": TextIcon,
		length: RulerIcon,
		weight: WeightScaleIcon,
	}[type];
}

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
