<script lang="ts" generics="TypeName extends AttributeTypeName">
	import {
		AttributeValue,
		Length,
		Measurement,
		NumberAttribute,
		RichText,
		StringAttribute,
		type AttributeContext,
		type AttributeTypeName,
	} from "@clara/api/attribute";
	import { ColorPicker, LongTextInput, MeasurementInput, NumberInput, ShortTextInput } from "@clara/api/components";

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
