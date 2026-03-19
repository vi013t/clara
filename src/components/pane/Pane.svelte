<script lang="ts" module>
	export type SerializedPane = {
		split: "horizontal" | "vertical" | undefined;
		childData: SerializedPane | null;
	};
</script>

<script lang="ts">
	import Pane from "./Pane.svelte";
	import TreeView from "../views/HierarchyView.svelte";
	import { type View } from "../../api/data/structure/views.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";
	import { onMount, type Snippet } from "svelte";
	import Tabline from "./Tabline.svelte";
	import { DataEntry, type Dataset } from "../../api/data/dataset.svelte";
	import Editor from "../panels/Editor.svelte";
	import { onActionRequested } from "../../api/userdata/action.svelte";
	import ManualPopup from "../popups/ManualPopup.svelte";
	import { DocumentContent } from "../../api/data/attribute.svelte";

	let {
		width = "500px",
		height = "1000px",
		background = "#1e1e2e",
		subpane = false,
		split = undefined,
		onclose = () => {},
		serializationData,
	}: {
		width?: string;
		height?: string;
		background?: string;
		subpane?: boolean;
		split?: "horizontal" | "vertical";
		onclose?: () => void;
		serializationData?: SerializedPane;
	} = $props();

	let dragging = $state("none");

	// svelte-ignore state_referenced_locally
	let datasets: Dataset[] = $state([]);
	export type Tab = { id: number; dataset?: Dataset; component: TreeView; editorContent?: [DataEntry, string]; view: View };
	let tabID = $state(0);
	let tabs: Tab[] = $state([{ id: tabID++, component: null!, view: "hierarchy" }]);
	let selectedTabID = $state(0);

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

	function openEditor(entryID: number, fieldName: string) {
		tabs.push({ id: tabID++, component: null!, editorContent: [DataEntry.fromID(entryID)!, fieldName], view: "graph" });
		selectedTabID = tabID - 1;
	}

	onActionRequested("New Tab", () => {
		tabs.push({ id: tabID++, component: null!, view: "hierarchy" });
	});

	let childPane: Pane | null = $state(null);

	export function serialize(): SerializedPane {
		let childData = childPane?.serialize() ?? null;
		return {
			split,
			childData,
		};
	}

	export function deserialize(data: SerializedPane) {
		split = data.split;
		if (data.childData) childPane!.deserialize(data.childData);
	}

	onMount(() => {
		if (serializationData) {
			deserialize(serializationData);
		}
	});

	let manualPopup: ManualPopup;
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
		<Tabline bind:isMasterPaneAlive bind:tabID bind:selectedTabID bind:tabs {background} {split} {subpane} {onclose} />
		<div class="content" style:background>
			{#each tabs as tab, index (tab.id)}
				{#if tab.editorContent && tab.id === selectedTabID}
					<!-- Editing a field -->
					<Editor
						bind:doc={
							() => (tab.editorContent![0].get(tab.editorContent![1]) as DocumentContent | null) ?? new DocumentContent(),
							content => tab.editorContent![0].set(tab.editorContent![1], content ?? new DocumentContent())
						}
					/>
				{:else if !tab.dataset}
					<div class="no-dataset">
						<p>This tab has no dataset opened. Open an existing one now or create a new one to open.</p>
						<div>
							<button>Open dataset</button>
							<button>Create dataset</button>
						</div>
						<button onmousedown={() => manualPopup.open()}>What the heck's a dataset?</button>
					</div>
				{:else if tab.dataset.isManual()}
					<div style="display: {tab.id === selectedTabID ? 'block' : 'none'}">
						{#if tab.view === "hierarchy"}
							<TreeView hideRoot tree={tab.dataset.data.ref()} bind:this={tabs[index].component} LeafIcon={tab.dataset.icon} />
						{:else if tab.view === "spreadsheet"}
							<SpreadsheetView {openEditor} dataset={tab.dataset} />
						{/if}
					</div>
				{/if}
			{/each}
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
