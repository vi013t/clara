<script lang="ts" module>
	import { TabList } from "@clara/api/ui";
</script>

<script lang="ts">
	import CombinedPane from "./CombinedPane.svelte";
	import SingularPane from "./SingularPane.svelte";
	import { type PaneLayout } from "@clara/api/project";

	let tabline = new TabList();
	let { pane = $bindable({ split: "none", tabline, selectedTabID: tabline.tabs[0].id }) }: { pane?: PaneLayout } = $props();
</script>

{#if pane.split === "none"}
	<SingularPane bind:pane bind:anyPane={pane} />
{:else}
	<CombinedPane bind:pane />
{/if}
