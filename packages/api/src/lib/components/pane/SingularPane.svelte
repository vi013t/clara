<script lang="ts">
	import { EditorTab, GroupTab, NodeEditorTab, PaneLayout, SinglePane } from "@clara/api/ui";
	import { GraphView, HierarchyView, SpreadsheetView, Editor, Tabline, NodeEditor } from "@clara/api/components";

	let {
		background = "var(--background)",
		subpane = false,
		layout = $bindable(),
		pane = $bindable(),
		onclose = () => {},
	}: {
		background?: string;
		subpane?: boolean;
		pane: SinglePane;
		layout: PaneLayout;
		onclose?: () => void;
	} = $props();

	let tab = $derived(pane.tabline.getTabByID(pane.selectedTabID));
</script>

<section class="pane">
	<Tabline bind:pane bind:anyPane={layout} {background} {subpane} {onclose} />
	<div class="content" style:background>
		{#if tab instanceof EditorTab && tab.id === pane.selectedTabID}
			<Editor bind:tab />
		{:else if tab instanceof NodeEditorTab && tab.id === pane.selectedTabID}
			<NodeEditor bind:nodes={tab.nodes} />
		{:else if tab instanceof GroupTab}
			<div class="view-container" style="display: {tab.id === pane.selectedTabID ? 'block' : 'none'}">
				{#if tab.view === "Hierarchy"}
					<HierarchyView bind:pane bind:layout />
				{:else if tab.view === "Spreadsheet"}
					<SpreadsheetView bind:pane group={tab.group} />
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
