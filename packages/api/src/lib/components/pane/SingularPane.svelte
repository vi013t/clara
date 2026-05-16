<script lang="ts">
	import { AttributeTab, GroupTab, ItemTab, PaneLayout, SinglePane } from "@clara/api/ui";
	import { Tabline } from "@clara/api/components";

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

	function setPane(newPane: PaneLayout) {
		layout = newPane;
	}
</script>

<section class="pane">
	<Tabline bind:pane bind:anyPane={layout} {background} {subpane} {onclose} />

	<div class="content" style:background>
		{#if tab instanceof AttributeTab && tab.id === pane.selectedTabID}
			{@render tab.view.render({ tab, pane, attribute: tab.attribute, setPane })}
		{:else if tab instanceof GroupTab && tab.id === pane.selectedTabID}
			{@render tab.view.render({ tab, pane, group: tab.group, setPane })}
		{:else if tab instanceof ItemTab && tab.id === pane.selectedTabID}
			{@render tab.view.render({ tab, pane, item: tab.item, setPane })}
		{/if}
	</div>
</section>

<style>
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
