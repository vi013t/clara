<script lang="ts">
	import { PaneLayout } from "@clara/api/ui";
	import { CombinedPane, SingularPane } from "@clara/api/components";

	let { pane = $bindable() }: { pane: PaneLayout } = $props();
</script>

{#if pane.isSingle()}
	<SingularPane bind:pane bind:layout={pane} />
{:else if pane.isMulti()}
	<CombinedPane bind:pane />
{/if}
