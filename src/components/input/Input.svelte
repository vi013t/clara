<script lang="ts">
	import type { AttributeContext, AttributeType, AttributeValue, PrimitiveAttribute } from "../../api/data/attribute.svelte";
	import { Length, Measurement } from "../../api/data/measurement.svelte";
	import ColorPaletteIcon from "../icons/ColorPaletteIcon.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import LongTextInput from "./LongTextInput.svelte";
	import MeasurementInput from "./MeasurementInput.svelte";
	import ShortTextInput from "./ShortTextInput.svelte";

	let {
		type,
		value = $bindable(),
		openEditor,
		context,
		background = "transparent",
	}: {
		context: AttributeContext;
		type: AttributeType;
		value: AttributeValue | null;
		openEditor: () => void;
		background?: string;
	} = $props();
</script>

{#if type === "Length"}
	<MeasurementInput type={Length} bind:value={value as Measurement<any> | null} />
{:else if type === "Short text"}
	<ShortTextInput {background} bind:value={value as PrimitiveAttribute<string> | null} />
{:else if type === "Long text"}
	<LongTextInput bind:value={value as PrimitiveAttribute<string> | null} {context} {openEditor} />
{:else if type === "Color"}
	<ColorPicker />
{/if}
