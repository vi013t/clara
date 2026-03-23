<script lang="ts" generics="TypeName extends AttributeTypeName">
	import type { AttributeContext, AttributeTypeName } from "../../api/data/attribute/attributetype.svelte";
	import type { AttributeValue } from "../../api/data/attribute/attributevalue.svelte";
	import { Length, Measurement } from "../../api/data/attribute/measurement.svelte";
	import { NumberAttribute, StringAttribute } from "../../api/data/attribute/primitive.svelte";
	import type { RichText } from "../../api/data/attribute/richtext.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import LongTextInput from "./LongTextInput.svelte";
	import MeasurementInput from "./MeasurementInput.svelte";
	import NumberInput from "./NumberInput.svelte";
	import ShortTextInput from "./ShortTextInput.svelte";

	let {
		type,
		value = $bindable(),
		openEditor,
		context = "none",
		background = "transparent",
	}: {
		context?: AttributeContext | "none";
		type: TypeName;
		value: AttributeValue<TypeName> | null;
		openEditor: (doc: RichText) => void;
		background?: string;
	} = $props();
</script>

{#if type === "length"}
	<MeasurementInput type={Length} bind:value={value as Measurement<any> | null} />
{:else if type === "shortText"}
	<ShortTextInput {background} bind:value={value as StringAttribute} />
{:else if type === "number"}
	<NumberInput {background} bind:value={value as NumberAttribute} />
{:else if type === "longText"}
	<LongTextInput bind:value={value as RichText} {context} {openEditor} />
{:else if type === "color"}
	<ColorPicker />
{/if}
