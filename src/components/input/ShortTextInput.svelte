<script lang="ts">
	let { value = $bindable() }: { value: string | null } = $props();

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") (event.target as HTMLElement).blur();
	}
</script>

<input bind:value onkeydown={typeKey} />

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
