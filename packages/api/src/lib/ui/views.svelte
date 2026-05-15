<script lang="ts" module>
	import type { Snippet } from "svelte";
	import { GraphView, HierarchyView, SpreadsheetView, Editor } from "@clara/api/components";
	import { AttributeTab, EditorTab, getIcon, GroupTab, ItemTab, NodeEditorTab, SinglePane, Tab, type Icon } from "@clara/api/ui";
	import type { Group, Item } from "@clara/api/database";
	import type { AttributeRef } from "@clara/api/attribute";

	export interface View {
		name: string;
		icon: Icon;
		render: Snippet<[any]>;
		type: "group" | "attribute" | "item";
	}

	export interface GroupView extends View {
		type: "group";
		render: Snippet<[{ group: Group; pane: SinglePane; tab: GroupTab }]>;
	}

	export interface ItemView extends View {
		type: "item";
		render: Snippet<[{ item: Item; pane: SinglePane; tab: ItemTab }]>;
	}

	export interface AttributeView extends View {
		type: "attribute";
		render: Snippet<[{ attribute: AttributeRef; pane: SinglePane; tab: AttributeTab }]>;
	}

	export const hierarchy: GroupView = {
		name: "Hierarchy",
		icon: getIcon("FolderTree"),
		render: renderHierarchy,
		type: "group",
	};

	export const spreadsheet: GroupView = {
		name: "Spreadsheet",
		icon: getIcon("Table2"),
		render: renderSpreadsheet,
		type: "group",
	};

	export const nodeEditor: AttributeView = {
		name: "Node Editor",
		icon: getIcon("GitCompare"),
		render: renderNodeEditor,
		type: "attribute",
	};

	export const editor: AttributeView = {
		name: "Editor",
		icon: getIcon("Pencil"),
		render: renderEditor,
		type: "attribute",
	};

	let allViews: View[] = $state([hierarchy, spreadsheet, nodeEditor, editor]);

	export function views() {
		return allViews;
	}

	export function view(name: string): View | null {
		return allViews.find(view => view.name === name) ?? null;
	}

	export function registerGlobalView(view: View) {
		allViews.push(view);
	}
</script>

{#snippet renderHierarchy({ group, pane, tab }: { group: Group; pane: SinglePane; tab: GroupTab })}
	<HierarchyView entry={group} {pane} />
{/snippet}

{#snippet renderSpreadsheet({ group, pane, tab }: { group: Group; pane: SinglePane; tab: GroupTab })}
	<SpreadsheetView {group} {pane} />
{/snippet}

{#snippet renderNodeEditor({ attribute, pane, tab }: { attribute: AttributeRef; pane: SinglePane; tab: AttributeTab })}
	<GraphView />
{/snippet}

{#snippet renderEditor({ attribute, pane, tab }: { attribute: AttributeRef; pane: SinglePane; tab: AttributeTab })}
	<Editor tab={tab as EditorTab} />
{/snippet}
