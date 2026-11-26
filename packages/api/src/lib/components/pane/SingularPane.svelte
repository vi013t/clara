<script lang="ts">
	import { StatusBar, Tabline } from "@clara/api/components";
	import { AttributeTab, GroupTab, ItemTab, PaneLayout, SinglePane } from "@clara/api/ui";

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

	let tab = $derived(pane.tabline.getTabRefByID(pane.selectedTabID));

	function setPane(newPane: PaneLayout) {
		layout = newPane;
	}
</script>

<section class="pane">
	<Tabline bind:pane bind:paneLayout={layout} {background} {subpane} {onclose} />

	<div class="content" style:background>
		{#if tab.tab instanceof AttributeTab && tab.id === pane.selectedTabID}
			{@render tab.tab.view.render({ tab: tab.tab, pane, setPane })}
		{:else if tab.tab instanceof GroupTab && tab.id === pane.selectedTabID}
			{@render tab.tab.view.render({ tab: tab.tab, pane, setPane })}
		{:else if tab.tab instanceof ItemTab && tab.id === pane.selectedTabID}
			{@render tab.tab.view.render({ tab: tab.tab, pane, setPane })}
		{/if}
	</div>
	<StatusBar bind:tab bind:pane />
</section>

<style>
	.pane {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		width: 100%;
		flex-grow: 1;
	}

	.content {
		border-top: 1px solid var(--border);
		flex-grow: 1;
	}
</style>
