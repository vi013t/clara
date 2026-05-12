<script lang="ts">
	import { Measurement, type AttributeRef, type MeasurementType } from "@clara/api/attribute";
	import { Icon } from "@clara/api/components";

	let { attribute = $bindable(), type }: { attribute: AttributeRef; type: MeasurementType<any> } = $props();

	// svelte-ignore state_referenced_locally
	let unit = $state(type.units()[0]);

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<div class="wrapper">
	<input
		bind:value={() => attribute.valueAs<Measurement<any>>()?.count ?? 0, count => (attribute.value = type.of(count, unit))}
		onkeydown={typeKey}
	/>
	<button>{type.units()[0].abbreviation()}</button>
	<button class="transfer">
		<Icon name="ArrowDownUp" />
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
		border: 1px solid var(--border);
		background-color: var(--background-dark);
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
		--stroke: var(--foreground-bright);

		&:hover {
			--stroke: var(--background-dark);
			background-color: var(--indigo);
		}
	}

	input {
		color: var(--foreground);
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
