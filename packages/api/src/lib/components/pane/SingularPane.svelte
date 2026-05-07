<script lang="ts">
	import { EditorTab, GroupTab } from "@clara/api/ui";
	import type { RichText } from "@clara/api/attribute";
	import { GraphView, HierarchyView, SpreadsheetView, Editor, Tabline } from "@clara/api/components";
	import type { PaneLayout, SinglePane } from "@clara/api/project";

	let {
		background = "var(--background)",
		subpane = false,
		anyPane = $bindable(),
		pane = $bindable(),
		onclose = () => {},
	}: {
		background?: string;
		subpane?: boolean;
		pane: SinglePane;
		anyPane: PaneLayout;
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
	<Tabline bind:pane bind:anyPane {background} {subpane} {onclose} />
	<div class="content" style:background>
		{#if tab instanceof EditorTab && tab.id === pane.selectedTabID}
			<Editor bind:doc={tab.content} />
		{:else if tab instanceof GroupTab}
			<div class="view-container" style="display: {tab.id === pane.selectedTabID ? 'block' : 'none'}">
				{#if tab.view === "Hierarchy"}
					<HierarchyView />
				{:else if tab.view === "Spreadsheet"}
					<SpreadsheetView {openEditor} group={tab.group} />
				{:else if tab.view === "Graph"}
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
		border: 1px solid var(--border);
		width: 100%;
		height: 100%;
	}

	.content {
		border-top: 1px solid var(--border);
		flex-grow: 1;
	}
</style>
