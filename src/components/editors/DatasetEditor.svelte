<script lang="ts">
	import type { Dataset } from "../../api/data/dataset.svelte";
	import ConfirmationPopup from "../popups/ConfirmationPopup.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";

	let { dataset = $bindable() }: { dataset: Dataset } = $props();

	function deleteDataset() {
		dataset.delete();
	}

	let confirmDeletePopup: ConfirmationPopup;

	function confirmDelete() {
		confirmDeletePopup.open();
	}
</script>

<div class="dataset">
	<h3>Name</h3>
	<div class="name">
		<button>
			<dataset.icon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
		</button>
		<input bind:value={dataset.name} />
	</div>

	<h3>Description</h3>
	<textarea bind:value={dataset.description}></textarea>

	<h3>Values</h3>
	<div class="tree">
		<!-- <HierarchyView tree={dataset.data.ref()} LeafIcon={dataset.icon} /> -->
	</div>

	<h3>Data</h3>
	<div class="spreadsheet">
		<SpreadsheetView {dataset} openEditor={() => {}} />
	</div>

	<button class="delete" onmousedown={confirmDelete}>Delete</button>
</div>

<ConfirmationPopup bind:this={confirmDeletePopup} title="Delete '{dataset.name}' dataset?" onconfirm={deleteDataset}>
	<p>All entries in this dataset will be deleted.</p>
</ConfirmationPopup>

<style>
	.delete {
		margin-top: auto;
		background-image: linear-gradient(to bottom right, #eba0ac, #f38ba8);
		width: 10rem;
		margin-top: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		transition: scale 0.1s;
		box-shadow: 0px 0px 0.25rem black;
		color: black;

		&:hover {
			scale: 105%;
		}
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		border-radius: 0.25rem;
		--stroke: #cdd6f4;

		&:hover {
			--stroke: #181825;
			background-color: #b4befe;
		}
	}

	.dataset {
		background: #181825;
		padding: 1rem;
		border-radius: 0.25rem;
		border: 1px solid #45475a;
		background-color: rgba(200, 200, 255, 5%);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		.spreadsheet {
			border: 1px solid #45475a;
			border-radius: 0.25rem;
			overflow-x: auto;
		}

		.tree {
			padding: 0.5rem;
			background-color: #181825;
			border-radius: 0.25rem;
			padding-left: 1.5rem;
		}

		h3:not(:first-child) {
			margin-top: 0.5rem;
		}
	}

	h3 {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.85rem;
		color: #a6adc8;
	}

	.name {
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid #313244;
		display: flex;
		background-color: #181825;
		gap: 0.5rem;
	}

	textarea {
		font-size: 0.85rem;
		width: 100%;
		background-color: #181825;
		border-radius: 0.25rem;
		border: 1px solid #313244;
		padding: 0.5rem;
		color: #cdd6f4;
		resize: none;
	}

	input {
		color: #cdd6f4;
		padding: 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.85rem;
		width: 80%;

		&:hover {
			background-color: rgba(200, 200, 255, 7%);
		}
	}
</style>
