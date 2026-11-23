<script lang="ts">
	import type { ViewType } from "$lib/ui/views.svelte";
	import { LittleButton } from "@clara/api/components";
	import { views, type View } from "@clara/api/ui";

	let { view = $bindable() }: { view: View<ViewType> } = $props();
</script>

<section>
	{#each views().filter(view => view.type === "group") as otherView}
		<LittleButton icon={otherView.icon} toggle on={view.name === otherView.name} />
	{/each}
	{#if view.type === "item" || view.type === "attribute"}
		{#each views().filter(view => view.type === "item") as otherView}
			<LittleButton icon={otherView.icon} toggle on={view.name === otherView.name} />
		{/each}
		{#if view.type === "attribute"}
			{#each views().filter(view => view.type === "attribute") as otherView}
				<LittleButton icon={otherView.icon} toggle on={view.name === otherView.name} />
			{/each}
		{/if}
	{/if}
</section>

<style>
	section {
		position: absolute;
		color: var(--foreground);
		height: 2rem;
		bottom: 0px;
		right: 0px;
		background-color: var(--background-darker);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
		border-top-left-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
