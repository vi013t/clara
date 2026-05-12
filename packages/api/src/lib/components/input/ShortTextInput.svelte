<script lang="ts">
	import { AttributeRef, StringAttribute } from "@clara/api/attribute";

	let { attribute = $bindable(), background = "transparent" }: { attribute: AttributeRef; background?: string } = $props();

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<input
	bind:value={
		() => (attribute?.value as StringAttribute)?.value ?? "",
		content => (attribute.value = content ? new StringAttribute(content) : null)
	}
	onkeydown={typeKey}
	style:background
/>

<style>
	input {
		flex-grow: 1;
		padding: 0.5rem;
		color: var(--foreground);

		&:hover {
			background-color: rgba(200, 200, 255, 10%);
		}
	}
</style>
