<script lang="ts">
	import Pane from "./Pane.svelte";
	import TreeView from "../views/HierarchyView.svelte";
	import { type Dataset, type View } from "../../api/Data.svelte";
	import { project } from "../../api/Data.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";
	import { type Snippet } from "svelte";
	import Tabline from "./Tabline.svelte";

	let {
		width = "500px",
		height = "1000px",
		background = "#1e1e2e",
		subpane = false,
		split = undefined,
		onclose = () => {},
		children = undefined,
	}: {
		width?: string;
		height?: string;
		background?: string;
		subpane?: boolean;
		split?: "horizontal" | "vertical";
		onclose?: () => void;
		children?: Snippet;
	} = $props();

	let dragging = $state("none");

	let datasets: Dataset[] = $state([project().datasets[0]]);
	export type Tab = { id: number; dataset: Dataset; component: TreeView };
	let tabID = $state(0);
	let tabs: Tab[] = $state(datasets.map(dataset => ({ id: tabID++, dataset, component: null! })));
	let view: View = $state("hierarchy");
	let selectedTabID = $state(0);

	function drag(side: string) {
		return function () {
			dragging = side;
		};
	}

	function stopDrag() {
		dragging = "none";
	}

	let masterHeight = $state(`${parseInt(height) / 2}px`);
	let masterWidth = $state(`${parseInt(width) / 2}px`);

	function onmousemove(event: MouseEvent) {
		if (dragging === "right") {
			masterWidth = `${parseInt(masterWidth) + event.movementX}px`;
		} else if (dragging === "bottom") {
			masterHeight = `${parseInt(masterHeight) + event.movementY}px`;
		}
	}
	let isMasterPaneAlive = $state(true);
</script>

<svelte:document onmouseup={stopDrag} {onmousemove} />

<section
	class={{ "pane-wrapper": true }}
	style:flex-direction={split === "horizontal" ? "row" : "column"}
	style:flex-grow={subpane ? "1" : undefined}
>
	<section
		class="pane"
		style:max-width={isMasterPaneAlive ? "100vmax" : "0px"}
		style:max-height={isMasterPaneAlive ? "100vmax" : "0px"}
		style:height={split === "vertical" ? masterHeight : "100%"}
		style:width={split === "horizontal" ? masterWidth : "100%"}
	>
		<Tabline bind:isMasterPaneAlive bind:tabID bind:selectedTabID bind:view {background} {split} {subpane} {onclose} {tabs} />
		<div class="content" style:background>
			{#each tabs as tab, index (tab.id)}
				{#if !("content" in tab.dataset)}
					<div style="display: {tab.id === selectedTabID ? 'block' : 'none'}">
						{#if view === "hierarchy"}
							<TreeView hideRoot tree={tab.dataset.data} bind:this={tabs[index].component} LeafIcon={tab.dataset.icon} />
						{:else if view === "spreadsheet"}
							<SpreadsheetView dataset={tab.dataset} />
						{/if}
					</div>
				{/if}
			{/each}
		</div>

		<div onmousedown={drag("right")} class={{ drag: true, right: true, dragging: dragging === "right" }}></div>
		<div onmousedown={drag("bottom")} class={{ drag: true, bottom: true, dragging: dragging === "bottom" }}></div>
	</section>

	{#if split}
		{#if children}
			{@render children()}
		{:else}
			<Pane subpane onclose={() => (split = undefined)} />
		{/if}
	{/if}
</section>

<style>
	.pane-wrapper {
		display: flex;
		height: 100%;
	}

	.pane {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid #313244;
	}

	.content {
		background-color: #1e1e2e;
		border-top: 1px solid #313244;
		flex-grow: 1;
	}

	.drag {
		position: absolute;

		&:hover:not(.dragging) {
			background-color: #313244;
		}

		&.dragging {
			background-color: #b4befe;
		}

		&.bottom {
			width: 100%;
			height: 2px;
			bottom: -1px;
			left: 0px;
			cursor: ns-resize;
		}

		&.right {
			height: 100%;
			width: 2px;
			top: 0px;
			right: -1px;
			cursor: ew-resize;
		}
	}
</style>
