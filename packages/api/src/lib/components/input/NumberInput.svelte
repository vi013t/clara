<script lang="ts">
	import { AttributeRef, NumberAttribute } from "@clara/api/attribute";

	let { attribute = $bindable(), background = "transparent" }: { attribute: AttributeRef; background?: string } = $props();

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<input
	bind:value={
		() => attribute.valueAs<NumberAttribute>()?.value,
		content => (attribute.value = content ? new NumberAttribute(content) : null)
	}
	onkeydown={typeKey}
	style:background
/>

<style>
	input {
		width: 100%;
		padding: 0.5rem;
		color: var(--foreground);

		&:hover {
			background-color: rgba(200, 200, 255, 10%);
		}
	}
</style>
