<script lang="ts">
	import type { Measurement, MeasurementType } from "../../api/data/measurement";
	import TransferIcon from "../icons/TransferIcon.svelte";

	let { value = $bindable(), type }: { value: Measurement<any> | null; type: MeasurementType<any> } = $props();

	let count = $state(`${value?.count ?? ""}`);

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<div class="wrapper">
	<input bind:value={count} onkeydown={typeKey} />
	<button>{type.units()[0].abbreviation()}</button>
	<button class="transfer">
		<TransferIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
	</button>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.transfer {
		border: 1px solid #313244;
		background-color: #181825;
		margin-left: 0.25rem;
	}

	button {
		color: var(--stroke);
		width: 1.5rem;
		height: 1.5rem;
		padding: 0.25rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		--stroke: #cdd6f4;

		&:hover {
			--stroke: #181825;
			background-color: #b4befe;
		}
	}

	input {
		color: #a6adc8;
		width: 100%;
		text-align: right;
		flex-shrink: 1;
		border-radius: 0.25rem;
		padding: 0.25rem;

		&:hover {
			background-color: rgba(200, 200, 255, 10%);
		}
	}
</style>
