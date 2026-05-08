<script lang="ts">
	import { TabList } from "@clara/api/ui";
	import { CombinedPane, SingularPane } from "@clara/api/components";
	import { type PaneLayout } from "@clara/api/project";

	let tabline = new TabList();
	let { pane = $bindable({ split: "none", tabline, selectedTabID: tabline.tabs[0].id }) }: { pane?: PaneLayout } = $props();
</script>

{#if pane.split === "none"}
	<SingularPane bind:pane bind:anyPane={pane} />
{:else}
	<CombinedPane bind:pane />
{/if}
