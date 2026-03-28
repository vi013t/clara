<script lang="ts" module>
	import { TabList } from "@clara/api/ui";

	export type AnyPane = SinglePane | MultiPane;

	export type SinglePane = {
		split: "none";
		tabline: TabList;
		selectedTabID: number;
	};

	export type MultiPane = {
		split: "horizontal" | "vertical";
		percent: number;
		panes: [AnyPane, AnyPane];
	};
</script>

<script lang="ts">
	import CombinedPane from "./CombinedPane.svelte";
	import SingularPane from "./SingularPane.svelte";

	let { pane = $bindable({ split: "none", tabline: new TabList(), selectedTabID: null! }) }: { pane?: AnyPane } = $props();

	if (pane.split === "none" && pane.selectedTabID === null) {
		pane.selectedTabID = pane.tabline.tabs[0].id;
	}

	$inspect(pane);
</script>

{#if pane.split === "none"}
	<SingularPane {pane} bind:anyPane={pane} />
{:else}
	<CombinedPane bind:pane />
{/if}
