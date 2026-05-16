<script lang="ts">
	let { name }: { name: string } = $props();
</script>

<div data-component-slot={name}></div>

<style>
	div {
		display: contents;
	}
</style>
