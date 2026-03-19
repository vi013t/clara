<script lang="ts">
	import { PrimitiveAttribute } from "../../api/data/attribute.svelte";

	let { value = $bindable(), background = "transparent" }: { value: PrimitiveAttribute<string> | null; background?: string } =
		$props();

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<input
	bind:value={() => value?.value, content => (value = content ? new PrimitiveAttribute<string>(content) : null)}
	onkeydown={typeKey}
	style:background
/>

<style>
	input {
		width: 100%;
		padding: 0.25rem;
		color: #a6adc8;

		&:hover {
			background-color: rgba(200, 200, 255, 10%);
		}
	}
</style>
