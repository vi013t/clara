<script lang="ts">
	import type { Value, ValueType } from "../../api/data/dataset";
	import { Length, Measurement } from "../../api/data/measurement";
	import type { StyledText } from "../panels/Editor.svelte";
	import LongTextInput from "./LongTextInput.svelte";
	import MeasurementInput from "./MeasurementInput.svelte";
	import ShortTextInput from "./ShortTextInput.svelte";

	let { type, value = $bindable(), openEditor }: { type: ValueType; value: Value | null; openEditor: () => void } = $props();
</script>

{#if type === "length"}
	<MeasurementInput type={Length} bind:value={value as Measurement<any> | null} />
{:else if type === "short text"}
	<ShortTextInput bind:value={value as string | null} />
{:else if type === "long text"}
	<LongTextInput {openEditor} />
{/if}
