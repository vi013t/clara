<script lang="ts">
	import { fly } from "svelte/transition";

	let { title, text }: { title: string; text?: string } = $props();
</script>

<div transition:fly={{ duration: 100 }}>
	<h1>{title}</h1>
	{#if text}
		<p>{text}</p>
	{/if}
</div>

<style>
	div {
		position: fixed;
		background-color: var(--background-darker);
		border-radius: 0.25rem;
		border: 1px solid var(--border);
		color: var(--foreground);
		padding: 0.5rem;
		width: 20rem;
		display: flex;
		right: 1rem;
		bottom: 3.5rem;
		box-shadow: 0px 0px 0.5rem black;
	}

	h1 {
		font-size: 0.8rem;
	}
</style>
