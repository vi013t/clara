<script lang="ts">
	import { StringAttribute } from "@clara/api/attribute";

	let { value = $bindable(), background = "transparent" }: { value: StringAttribute | null; background?: string } = $props();

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<input
	bind:value={() => value?.value, content => (value = content ? new StringAttribute(content) : null)}
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
