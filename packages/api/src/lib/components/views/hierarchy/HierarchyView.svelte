<script lang="ts">
	import type { Database } from "@clara/api/database";
	import { Hierarchy, PaneLayout, SinglePane } from "@clara/api/ui";
	import HierarchyEntry from "./HierarchyEntry.svelte";

	let {
		hierarchy = $bindable(),
		database,
		hideRoot = false,
		subtree = false,
		demo = false,
		pane = $bindable(),
		layout = $bindable(),
		setPane,
	}: {
		database: Database;
		hierarchy: Hierarchy;
		hideRoot?: boolean;
		subtree?: boolean;
		demo?: boolean;
		pane?: SinglePane;
		layout?: PaneLayout;
		setPane?: (pane: PaneLayout) => void;
	} = $props();
</script>

<HierarchyEntry
	bind:hierarchy
	entry={database.dfsGroups().find(group => group.id === hierarchy.groupID)!}
	{hideRoot}
	{subtree}
	{demo}
	{pane}
	{layout}
	{setPane}
/>
