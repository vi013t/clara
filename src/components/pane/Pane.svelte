<script lang="ts" module>
	export type PaneTree = PaneTreeLeaf | PaneTreeBranch;

	export type PaneTreeLeaf = {
		tabs: TabList;
	};

	export type PaneTreeBranch = (
		| {
				split: "horizontal";
				width: number;
		  }
		| { split: "vertical"; height: number }
	) & { childPane: PaneTree } & PaneTreeLeaf;
</script>

<script lang="ts">
	import type { DocumentContent } from "../../api/data/attribute/attribute.svelte";

	import { EditorTab, GroupTab, TabList } from "../../api/ui/tab.svelte";
	import ManualPopup from "../popups/ManualPopup.svelte";
	import GraphView from "../views/GraphView.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";
	import Editor from "./Editor.svelte";
	import Pane from "./Pane.svelte";
	import Tabline from "./Tabline.svelte";

	let {
		width = "500px",
		height = "1000px",
		background = "#1e1e2e",
		subpane = false,
		split = undefined,
		onclose = () => {},
	}: {
		width?: string;
		height?: string;
		background?: string;
		subpane?: boolean;
		split?: "horizontal" | "vertical";
		onclose?: () => void;
	} = $props();

	let dragging = $state("none");

	let selectedTabID = $state(0);
	let tabline = $state(new TabList());

	function drag(side: string) {
		return function () {
			dragging = side;
		};
	}

	function stopDrag() {
		dragging = "none";
	}

	// svelte-ignore state_referenced_locally
	let masterHeight = $state(`${parseInt(height) / 2}px`);
	// svelte-ignore state_referenced_locally
	let masterWidth = $state(`${parseInt(width) / 2}px`);

	function onmousemove(event: MouseEvent) {
		if (dragging === "right") {
			masterWidth = `${parseInt(masterWidth) + event.movementX}px`;
		} else if (dragging === "bottom") {
			masterHeight = `${parseInt(masterHeight) + event.movementY}px`;
		}
	}
	let isMasterPaneAlive = $state(true);

	function openEditor(content: DocumentContent) {
		let tab = new EditorTab(content);
		tabline.appendTab(tab);
		selectedTabID = tab.id;
	}

	let childPane: Pane | null = $state(null);
	let manualPopup: ManualPopup;

	let tab = $derived(tabline.getTabByID(selectedTabID));
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
		<Tabline bind:isMasterPaneAlive bind:selectedTabID bind:tabs={tabline} {background} {split} {subpane} {onclose} />
		<div class="content" style:background>
			{#if tab instanceof EditorTab && tab.id === selectedTabID}
				<Editor bind:doc={tab.content} />
			{:else if tab instanceof GroupTab}
				<div class="view-container" style="display: {tab.id === selectedTabID ? 'block' : 'none'}">
					{#if tab.view === "hierarchy"}
						<HierarchyView hideRoot />
					{:else if tab.view === "spreadsheet"}
						<SpreadsheetView {openEditor} group={tab.group} />
					{:else if tab.view === "graph"}
						<GraphView />
					{/if}
				</div>
			{:else}
				<div class="no-dataset">
					<p>This tab has no dataset opened. Open an existing one now or create a new one to open.</p>
					<div>
						<button>Open dataset</button>
						<button>Create dataset</button>
					</div>
					<button onmousedown={() => manualPopup.open()}>What the heck's a dataset?</button>
				</div>
			{/if}
		</div>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onmousedown={drag("right")} class={{ drag: true, right: true, dragging: dragging === "right" }}></div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onmousedown={drag("bottom")} class={{ drag: true, bottom: true, dragging: dragging === "bottom" }}></div>
	</section>

	{#if split}
		<Pane bind:this={childPane} subpane onclose={() => (split = undefined)} />
	{/if}
</section>

<ManualPopup bind:this={manualPopup} />

<style>
	.view-container {
		width: 100%;
		height: 100%;
	}

	.no-dataset {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		gap: 2rem;
		flex-direction: column;

		p {
			color: #a6adb8;
			font-size: 0.85rem;
		}

		> button {
			color: #89b4fa;
			font-style: italic;
			font-size: 0.85rem;

			&:hover {
				text-decoration: underline;
			}
		}

		div {
			display: flex;
			gap: 2rem;

			> button {
				border-radius: 0.25rem;
				width: 10rem;
				padding: 0.5rem;
				color: #181825;
				background-image: linear-gradient(to bottom right, #b4befe, #89b4fa);
				box-shadow: 0px 0px 0.25rem black;
				font-size: 0.85rem;
				transition: scale 0.1s;

				&:last-child {
					background-image: linear-gradient(to bottom right, #94e2d5, #a6e3a1);
				}

				&:hover {
					scale: 105%;
				}
			}
		}
	}

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
