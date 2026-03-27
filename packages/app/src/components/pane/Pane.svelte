<script lang="ts" module>
	import { EditorTab, GroupTab, TabList } from "@clara/api/ui";

	export type PaneTree = PaneSplit & { childPane: PaneTree | null; tabline: TabList };

	export type PaneSplit = {
		split: "horizontal" | "vertical" | "none";
		percent: number;
	};
</script>

<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import ManualPopup from "../popups/ManualPopup.svelte";
	import GraphView from "../views/GraphView.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";
	import Editor from "./Editor.svelte";
	import Pane from "./Pane.svelte";
	import Tabline from "./Tabline.svelte";
	import type { RichText } from "@clara/api/attribute";
	import { mouse } from "../../../../api/src/lib/components/InputHandler.svelte";
	import { clamp } from "@clara/api/math";

	let {
		background = "#1e1e2e",
		subpane = false,
		tree = $bindable({ split: "none", percent: 0, childPane: null, tabline: new TabList() }),
		onclose = () => {},
	}: {
		background?: string;
		subpane?: boolean;
		tree?: PaneTree;
		onclose?: () => void;
	} = $props();

	let dragging = $state("none");

	let selectedTabID = $state(tree.tabline.tabs[0].id);

	function drag(side: string) {
		return function () {
			dragging = side;
		};
	}

	let wrapper: HTMLElement | null = $state(null);

	mouse().onRelease(() => {
		dragging = "none";
	});

	mouse().onMove(event => {
		if (!wrapper || tree.split === "none") return;

		console.log("dragging");

		if (dragging === "right") {
			const combinedWidth = wrapper.getBoundingClientRect().width;
			const paneWidth = combinedWidth * tree.percent;
			const newWidth = paneWidth + event.movementX;
			const newPercent = newWidth / combinedWidth;
			tree.percent = clamp(newPercent, 0.05, 0.95);
		} else if (dragging === "bottom") {
			const combinedHeight = wrapper.getBoundingClientRect().height;
			const paneHeight = combinedHeight * tree.percent;
			const newHeight = paneHeight + event.movementY;
			const newPercent = newHeight / combinedHeight;
			tree.percent = clamp(newPercent, 0.05, 0.95);
		}
	});

	let isMasterPaneAlive = $state(true);

	function openEditor(content: RichText) {
		let tab = new EditorTab(content);
		tree.tabline.appendTab(tab);
		selectedTabID = tab.id;
	}

	let childPane: Pane | null = $state(null);
	let manualPopup: ManualPopup;

	let tab = $derived(tree.tabline.getTabByID(selectedTabID));
</script>

<section
	class={{ "pane-wrapper": true }}
	style:flex-grow={subpane ? "1" : undefined}
	style:grid-template-columns={tree.split !== "none" ? `${tree.percent}fr ${1 - tree.percent}fr` : "1fr"}
	bind:this={wrapper}
>
	<section
		class="pane"
		style:max-width={isMasterPaneAlive ? "100vmax" : "0px"}
		style:max-height={isMasterPaneAlive ? "100vmax" : "0px"}
	>
		<Tabline bind:isMasterPaneAlive bind:selectedTabID bind:tree {background} {subpane} {onclose} />
		<div class="content" style:background>
			{#if tab instanceof EditorTab && tab.id === selectedTabID}
				<Editor bind:doc={tab.content} />
			{:else if tab instanceof GroupTab}
				<div class="view-container" style="display: {tab.id === selectedTabID ? 'block' : 'none'}">
					{#if tab.view === "hierarchy"}
						<HierarchyView />
					{:else if tab.view === "spreadsheet"}
						<SpreadsheetView {openEditor} group={tab.group} />
					{:else if tab.view === "graph"}
						<GraphView />
					{/if}
				</div>
			{/if}
		</div>

		{#if tree.split === "horizontal"}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div onmousedown={drag("right")} class={{ drag: true, right: true, dragging: dragging === "right" }}></div>
		{:else if tree.split === "vertical"}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div onmousedown={drag("bottom")} class={{ drag: true, bottom: true, dragging: dragging === "bottom" }}></div>
		{/if}
	</section>

	{#if tree.split !== "none"}
		<Pane bind:this={childPane} background="#1e1e2e" subpane onclose={() => (tree.split = "none")} bind:tree={tree.childPane!} />
	{/if}
</section>

<ManualPopup bind:this={manualPopup} />

<style>
	.view-container {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	.pane-wrapper {
		height: 100%;
		display: grid;
	}

	.pane {
		position: relative;
		display: flex;
		flex-direction: column;
		border: 1px solid #313244;
	}

	.content {
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
