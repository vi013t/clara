<script lang="ts">
	let { value, suggestions }: { value: string; suggestions: string[] } = $props();
</script>

<div>
	{#each suggestions as suggestion}
		{#if suggestion.startsWith(value)}
			<button>{suggestion}</button>
		{/if}
	{/each}
</div>

<style>
</style>
