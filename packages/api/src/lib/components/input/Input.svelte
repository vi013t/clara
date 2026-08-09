<script lang="ts" generics="TypeName extends AttributeTypeName">
	import type { AttributeBox, AttributeRef } from "@clara/api/attribute";
	import { Length, type AttributeContext, type AttributeTypeName } from "@clara/api/attribute";
	import { ColorPicker, LongTextInput, MeasurementInput, NumberInput, ShortTextInput } from "@clara/api/components";
	import type { SinglePane } from "@clara/api/ui";
	import GeneratedInput from "./GeneratedInput.svelte";

	let {
		type,
		attribute = $bindable(),
		pane = $bindable(),
		context = "none",
		background = "transparent",
	}: {
		context?: AttributeContext | "none";
		type: TypeName;
		attribute: AttributeBox;
		pane?: SinglePane;
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
	<LongTextInput bind:attribute {context} bind:pane={pane!} />
{:else if type === "color"}
	<ColorPicker />
{:else if type === "generated"}
	<GeneratedInput bind:attribute={attribute as AttributeRef} {context} bind:pane={pane!} />
{/if}
