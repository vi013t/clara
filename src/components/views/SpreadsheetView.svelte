<script lang="ts">
	import { DataEntry, type ManualDataset } from "../../api/data/dataset";
	import { valueTypeIcon } from "../../api/views";
	import GearIcon from "../icons/GearIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import Input from "../input/Input.svelte";

	let { dataset, openEditor }: { dataset: ManualDataset; openEditor: (value: string) => void } = $props();

	let updateCounter = $state(0);

	let rows = $derived.by(() => {
		updateCounter;
		return dataset.data.dfsLeaves();
	});

	function addRow() {
		dataset.data.addChild(DataEntry.node("Unnamed Entry"));
		updateCounter++;
	}

	function remove(id: number) {
		return function () {
			dataset.data.filter(entry => entry.id !== id);
			updateCounter++;
		};
	}
</script>

<div class="columns">
	<div class="column">
		<div style:width="100%" class="control cell">
			<button style:opacity="0%" disabled>
				<TrashIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
			</button>
		</div>

		{#each rows as row}
			<div class="control cell">
				<button onmousedown={remove(row.id)}>
					<TrashIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
				</button>
			</div>
		{/each}
	</div>
	{#each dataset.fields as field, index}
		{@const Icon = valueTypeIcon(field.type)}
		<div class="column">
			<div class="cell">
				<Icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
				{field.name}
				<button>
					<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				</button>
			</div>
			{#each rows as row}
				<div class="cell">
					<Input {openEditor} type={field.type} bind:value={() => row.get(field.name), value => row.set(field.name, value!)} />
				</div>
			{/each}
			{#if index === 0}
				<button onmousedown={addRow}>
					<PlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				</button>
			{/if}
		</div>
	{/each}
	<div class="column">
		<div class="cell" style:width="fit-content" style:border="none">
			<button>
				<PlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
	</div>
</div>

<style>
	.columns {
		display: flex;
		position: relative;
	}

	.column {
		display: flex;
		flex-direction: column;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: auto;
			margin-top: 0.25rem;
			padding: 0.25rem;
			border-radius: 0.25rem;
			--stroke: #cdd6f4;

			&:hover {
				background-color: #b4befe;
				--stroke: #181825;
			}
		}

		&:first-child .cell {
			background-color: #181825;
		}
	}

	.cell {
		width: 10rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		border-right: 1px solid #45475a;
		border-bottom: 1px solid #45475a;
		font-size: 0.85rem;
		gap: 0.5rem;
		color: #a6adc8;

		&:first-child {
			background-color: #181825;
			color: #cdd6f4;
		}

		&.control {
			width: fit-content;
			gap: 0.25rem;
		}

		button {
			margin-left: auto;
			margin-right: 0rem;
		}
	}
</style>
