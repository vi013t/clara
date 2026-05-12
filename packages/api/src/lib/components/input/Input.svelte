<script lang="ts" generics="TypeName extends AttributeTypeName">
	import {
		AttributeValue,
		Length,
		Measurement,
		NumberAttribute,
		RichText,
		StringAttribute,
		type AttributeContext,
		type AttributeRef,
		type AttributeTypeName,
		type GeneratedAttribute,
	} from "@clara/api/attribute";
	import { ColorPicker, LongTextInput, MeasurementInput, NumberInput, ShortTextInput } from "@clara/api/components";
	import GeneratedInput from "./GeneratedInput.svelte";

	let {
		type,
		attribute = $bindable(),
		openEditor,
		openNodeEditor,
		context = "none",
		background = "transparent",
	}: {
		context?: AttributeContext | "none";
		type: TypeName;
		attribute: AttributeRef;
		openEditor: (value: AttributeRef) => void;
		openNodeEditor: (generator: AttributeRef) => void;
		background?: string;
	} = $props();
</script>

{#if type === "length"}
	<MeasurementInput type={Length} bind:attribute />
{:else if type === "shortText"}
	<ShortTextInput {background} bind:attribute />
{:else if type === "number"}
	<NumberInput {background} bind:attribute />
{:else if type === "longText"}
	<LongTextInput bind:attribute {context} {openEditor} />
{:else if type === "color"}
	<ColorPicker />
{:else if type === "generated"}
	<GeneratedInput bind:attribute {context} {openNodeEditor} />
{/if}
