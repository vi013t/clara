<script lang="ts">
	import type {
		AttributeContext,
		AttributeTypeName,
		AttributeValue,
		RichText,
		PrimitiveAttributeValue,
	} from "../../api/data/attribute/attribute.svelte";
	import { Length, Measurement } from "../../api/data/attribute/measurement.svelte";
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
		type: AttributeTypeName;
		value: AttributeValue | null;
		openEditor: (doc: RichText) => void;
		background?: string;
	} = $props();
</script>

{#if type === "Length"}
	<MeasurementInput type={Length} bind:value={value as Measurement<any> | null} />
{:else if type === "shortText"}
	<ShortTextInput {background} bind:value={value as PrimitiveAttributeValue<string> | null} />
{:else if type === "longText"}
	<LongTextInput bind:value={value as RichText} {context} {openEditor} />
{:else if type === "Color"}
	<ColorPicker />
{/if}
