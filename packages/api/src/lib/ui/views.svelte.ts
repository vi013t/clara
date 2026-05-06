import type { Component } from "svelte";
import type { IconName } from "./icons.svelte.ts";
import { GraphView, HierarchyView, SpreadsheetView, TimelineView } from "../components/index.svelte.ts";

export type View = {
	name: string;
	icon: IconName;
	component: Component<any>;
};

export let views: View[] = [
	{ name: "Hierarchy", icon: "FolderTree", component: HierarchyView },
	{ name: "Graph", icon: "Share2", component: GraphView },
	{ name: "Spreadsheet", icon: "Table2", component: SpreadsheetView },
	{ name: "Timeline", icon: "Clock", component: TimelineView },
];
