<script lang="ts">
	import type { ManualDataset } from "../../api/data/dataset";
	import { valueTypeIcon } from "../../api/views";
	import GearIcon from "../icons/GearIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";

	let { dataset }: { dataset: ManualDataset } = $props();

	let rows = $derived(dataset.data.dfsLeaves());

	// function onkeypress(event: KeyboardEvent) {
	//     if (event.key === "Enter") {
	//         (event.target as HTMLElement).blur();
	//     }
	// }
</script>

<div class="columns">
	{#each dataset.fields as field}
		{@const Icon = valueTypeIcon(field.type)}
		<div class="column">
			<div class="cell">
				<Icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
				{field.name}
				<button>
					<GearIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
				</button>
			</div>
			{#each rows as row}
				<div class="cell">
					<textarea bind:value={() => `${row.get(field.name) ?? ""}`, value => row.set(field.name, value)}></textarea>
				</div>
			{/each}
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
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.cell {
		color: #cdd6f4;
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

		&:has(textarea:only-child) {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}

		textarea:only-child {
			resize: none;
			width: 100%;
			color: #cdd6f4;
			height: 70%;
			border-radius: 0.25rem;
			padding: 0.25rem;

			&:hover {
				background-color: rgba(200, 200, 255, 10%);
			}
		}

		button {
			display: flex;
			align-items: center;
			margin-left: auto;
			justify-content: center;
			padding: 0.25rem;
			border-radius: 0.25rem;
			--stroke: #cdd6f4;

			&:hover {
				background-color: #b4befe;
				--stroke: #181825;
			}
		}
	}
</style>
