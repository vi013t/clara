<script lang="ts">
	import { flip } from "svelte/animate";
	import { Dataset } from "../../api/data/dataset.svelte";
	import { Project } from "../../api/project.svelte";
	import DatasetEditor from "../editors/DatasetEditor.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import Popup from "./Popup.svelte";

	let popup: Popup;

	export function open() {
		popup.open();
	}

	let selectedTab = $state("general");

	function reset() {
		selectedTab = "general";
	}
</script>

<Popup {reset} bind:this={popup}>
	<div class="popup">
		<div class="sidebar">
			<button>
				<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>General</span>
			</button>
			<button>
				<SpreadsheetIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Datasets</span>
			</button>
		</div>
		<div class="content">
			<h1>Datasets</h1>
			{#each Project.get()!.database.ref().datasets.ref() as dataset, index (dataset.ref().id)}
				<div animate:flip={{ duration: 200 }}>
					<DatasetEditor
						bind:dataset={
							() => Project.get()!.database.ref().datasets.ref()[index].ref() as Dataset,
							value => Project.get()!.database.ref().datasets.ref()[index].overwrite(value)
						}
					/>
				</div>
			{/each}
			<button class="add-dataset">
				<PlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
	</div>
</Popup>

<style>
	.popup {
		width: 100%;
		height: 100%;
		display: flex;
		overflow-y: auto;

		.content {
			padding: 1rem;
			flex-grow: 1;
			padding-left: 3rem;
			padding-right: 3rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h1 {
				font-weight: 700;
				text-transform: uppercase;
				font-size: 0.85rem;
				margin-bottom: 0.5rem;
				color: #a6adc8;
			}
		}

		.sidebar {
			height: 100%;
			width: 15rem;
			border-right: 1px solid #313244;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 1rem;

			button {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.25rem;
				padding-left: 0.5rem;
				width: 100%;
				border-radius: 0.25rem;
				--stroke: #cdd6f4;

				&:hover {
					background-color: #b4befe;
					--stroke: #181825;
				}

				span {
					color: var(--stroke);
				}
			}
		}
	}

	.add-dataset {
		margin-left: auto;
		--stroke: #cdd6f4;
		padding: 0.25rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			--stroke: #181825;
			background-color: #b4befe;
		}
	}
</style>
