<script lang="ts" module>
	import type { Snippet } from "svelte";
	import { GraphView, HierarchyView, SpreadsheetView, Editor } from "@clara/api/components";
	import { AttributeTab, getIcon, GroupTab, ItemTab, PaneLayout, SinglePane, type Icon } from "@clara/api/ui";
	import type { Group, Item } from "@clara/api/database";
	import type { AttributeRef } from "@clara/api/attribute";

	export type ViewType = "group" | "attribute" | "item";

	export type ViewInterface<T extends ViewType> = T extends "group"
		? GroupView
		: T extends "item"
			? ItemView
			: T extends "attribute"
				? AttributeView
				: never;

	export type ViewTypeOf<T extends View<any>> = T extends View<infer R> ? R : never;

	export interface View<T extends ViewType> {
		name: string;
		icon: Icon;
		render: Snippet<[any]>;
		type: T;
	}

	export function viewIs<T extends ViewType>(view: ViewInterface<ViewType>, type: T): view is ViewInterface<T> {
		return view.type === type;
	}

	export interface GroupView extends View<"group"> {
		type: "group";
		render: Snippet<
			[
				{
					group: Group;
					pane: SinglePane;
					tab: GroupTab;
					setPane: (pane: PaneLayout) => void;
				},
			]
		>;
	}

	export interface ItemView extends View<"item"> {
		type: "item";
		render: Snippet<
			[
				{
					item: Item;
					pane: SinglePane;
					tab: ItemTab;
					setPane: (pane: PaneLayout) => void;
				},
			]
		>;
	}

	export interface AttributeView extends View<"attribute"> {
		type: "attribute";
		render: Snippet<
			[
				{
					attribute: AttributeRef;
					pane: SinglePane;
					tab: AttributeTab;
					setPane: (pane: PaneLayout) => void;
				},
			]
		>;
	}

	export const hierarchyView: GroupView = {
		name: "Hierarchy",
		icon: getIcon("FolderTree"),
		render: renderHierarchy,
		type: "group",
	};

	export const spreadsheetView: GroupView = {
		name: "Spreadsheet",
		icon: getIcon("Table2"),
		render: renderSpreadsheet,
		type: "group",
	};

	export const nodeEditorView: AttributeView = {
		name: "Node Editor",
		icon: getIcon("GitCompare"),
		render: renderNodeEditor,
		type: "attribute",
	};

	export const editorView: AttributeView = {
		name: "Editor",
		icon: getIcon("Pencil"),
		render: renderEditor,
		type: "attribute",
	};

	let allViews: View<ViewType>[] = $state([hierarchyView, spreadsheetView, nodeEditorView, editorView]);

	export function views() {
		return allViews;
	}

	export function view<T extends ViewType = ViewType>(name: string): View<T> | null {
		return (allViews.find(view => view.name === name) as View<T>) ?? null;
	}

	export function registerGlobalView<T extends ViewType>(view: View<T>) {
		allViews.push(view);
	}
</script>

{#snippet renderHierarchy({
	group,
	pane,
	tab,
	setPane,
}: {
	group: Group;
	pane: SinglePane;
	tab: GroupTab;
	setPane: (pane: PaneLayout) => void;
})}
	<HierarchyView entry={group} {pane} {setPane} />
{/snippet}

{#snippet renderSpreadsheet({
	group,
	pane,
	tab,
}: {
	group: Group;
	pane: SinglePane;
	tab: GroupTab;
	setPane: (pane: PaneLayout) => void;
})}
	<SpreadsheetView {group} {pane} />
{/snippet}

{#snippet renderNodeEditor({
	attribute,
	pane,
	tab,
}: {
	attribute: AttributeRef;
	pane: SinglePane;
	tab: AttributeTab;
	setPane: (pane: PaneLayout) => void;
})}
	<GraphView />
{/snippet}

{#snippet renderEditor({
	attribute,
	pane,
	tab,
}: {
	attribute: AttributeRef;
	pane: SinglePane;
	tab: AttributeTab;
	setPane: (pane: PaneLayout) => void;
})}
	<Editor {tab} />
{/snippet}
