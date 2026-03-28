<script lang="ts">
	import { EditorTab, GroupTab } from "@clara/api/ui";
	import GraphView from "../views/GraphView.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";
	import Editor from "./Editor.svelte";
	import Tabline from "./Tabline.svelte";
	import type { RichText } from "@clara/api/attribute";
	import type { AnyPane, SinglePane } from "./Pane.svelte";

	let {
		background = "#1e1e2e",
		subpane = false,
		anyPane = $bindable(),
		pane,
		onclose = () => {},
	}: {
		background?: string;
		subpane?: boolean;
		pane: SinglePane;
		anyPane: AnyPane;
		onclose?: () => void;
	} = $props();

	function openEditor(content: RichText) {
		let tab = new EditorTab(content);
		pane.tabline.appendTab(tab);
		pane.selectedTabID = tab.id;
	}

	let tab = $derived(pane.tabline.getTabByID(pane.selectedTabID));
</script>

<section class="pane">
	<Tabline {pane} bind:anyPane {background} {subpane} {onclose} />
	<div class="content" style:background>
		{#if tab instanceof EditorTab && tab.id === pane.selectedTabID}
			<Editor bind:doc={tab.content} />
		{:else if tab instanceof GroupTab}
			<div class="view-container" style="display: {tab.id === pane.selectedTabID ? 'block' : 'none'}">
				{#if tab.view === "hierarchy"}
					<HierarchyView />
				{:else if tab.view === "spreadsheet"}
					<SpreadsheetView {openEditor} group={tab.group} />
				{:else if tab.view === "graph"}
					<GraphView />
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.view-container {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	.pane {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid #313244;
	}

	.content {
		border-top: 1px solid #313244;
		flex-grow: 1;
	}
</style>
