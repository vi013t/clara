<script lang="ts">
	import { statusBarButtons } from "@clara/api/ui";
	import { LittleButton } from "@clara/api/components";
</script>

<section>
	<div class="wrapper">
		{#each statusBarButtons() as button}
			<LittleButton icon={button.icon} isToggle={button.isToggle} />
		{/each}
	</div>
</section>

<style>
	.wrapper {
		position: relative;
		display: contents;
		color: var(--foreground);
	}

	section {
		position: fixed;
		bottom: 0px;
		right: 0px;
		background-color: var(--background-darker);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
		border-top-left-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
