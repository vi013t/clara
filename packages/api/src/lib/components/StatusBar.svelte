<script lang="ts">
	import { LittleButton } from "@clara/api/components";
	import { AttributeView, ItemView, SinglePane, TabRef, views, type ViewFactory, type ViewType } from "@clara/api/ui";

	let { tab = $bindable(), pane = $bindable() }: { tab: TabRef; pane: SinglePane } = $props();

	function setView<T extends ViewType>(view: ViewFactory<T>) {
		return function () {
			tab.tab = view.createTab(tab.tab);
		};
	}
</script>

<section>
	{#if tab.tab.view instanceof AttributeView}
		{#each views().filter(view => view.type === "attribute") as view}
			<LittleButton onmousedown={setView(view)} icon={view.icon} toggle on={tab.tab.view.identifier === view.identifier} />
		{/each}

		<div class="separator"></div>
	{/if}
	{#if tab.tab.view instanceof ItemView || tab.tab.view instanceof AttributeView}
		{#each views().filter(view => view.type === "item") as view}
			<LittleButton onmousedown={setView(view)} icon={view.icon} toggle on={tab.tab.view.identifier === view.identifier} />
		{/each}

		<div class="separator"></div>
	{/if}
	{#each views().filter(view => view.type === "group") as view}
		<LittleButton onmousedown={setView(view)} icon={view.icon} toggle on={tab.tab.view.identifier === view.identifier} />
	{/each}
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

	.separator {
		height: 100%;
		margin-top: 2px;
		margin-bottom: 2px;
		background-color: var(--border);
		width: 2px;
	}
</style>
