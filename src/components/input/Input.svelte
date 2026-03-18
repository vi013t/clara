<script lang="ts">
	import type { FieldWithNullableValue, Value, ValueType } from "../../api/data/dataset";
	import { Length } from "../../api/data/measurement";
	import LongTextInput from "./LongTextInput.svelte";
	import MeasurementInput from "./MeasurementInput.svelte";
	import ShortTextInput from "./ShortTextInput.svelte";

	let {
		type,
		value = $bindable(),
		openEditor,
	}: { type: ValueType; value: Value | null; openEditor: (value: string) => void } = $props();
	let field = $derived({ type, value } as FieldWithNullableValue);
</script>

{#if field.type === "length"}
	<MeasurementInput type={Length} bind:value={field.value} />
{:else if field.type === "short text"}
	<ShortTextInput bind:value={field.value} />
{:else if field.type === "long text"}
	<LongTextInput {openEditor} bind:value={field.value} />
{/if}
