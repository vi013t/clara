<script lang="ts" module>
	import { TabList } from "@clara/api/ui";
</script>

<script lang="ts">
	import CombinedPane from "./CombinedPane.svelte";
	import SingularPane from "./SingularPane.svelte";
	import { type PaneLayout } from "@clara/api/project";

	let { pane = $bindable({ split: "none", tabline: new TabList(), selectedTabID: null! }) }: { pane?: PaneLayout } = $props();

	if (pane.split === "none" && pane.selectedTabID === null) {
		pane.selectedTabID = pane.tabline.tabs[0].id;
	}
</script>

{#if pane.split === "none"}
	<SingularPane bind:pane bind:anyPane={pane} />
{:else}
	<CombinedPane bind:pane />
{/if}
