<script lang="ts">
	import type { IconComponent } from "../../api/ui/icons.svelte";

	let {
		view = $bindable(),
		title,
		sections,
	}: {
		view: string;
		title?: { icon: IconComponent | string; text: string };
		sections: Record<string, [string, IconComponent][]>;
	} = $props();
</script>

<div class="sidebar">
	<h1 class="title">
		{#if title}
			<!-- svelte-ignore a11y_missing_attribute -->
			{#if typeof title.icon === "string"}
				<img src={title.icon} />
			{:else}
				<title.icon />
			{/if}
			{title.text}
		{/if}
	</h1>
	{#each Object.entries(sections) as [name, buttons]}
		<h1>{name}</h1>
		{#each buttons as [text, Icon]}
			<button class={{ "sidebar-button": true, "active": view === text }} onmousedown={() => (view = text)}>
				<Icon style="width: 1rem; height: 1rem;" />
				<span>{text}</span>
			</button>
		{/each}
	{/each}
</div>

<style>
	.sidebar {
		height: 100%;
		width: 15rem;
		border-right: 1px solid #313244;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem;

		h1:not(:first-child) {
			margin-top: 1rem;
		}

		:global(.sidebar-button) {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.25rem;
			padding-left: 0.5rem;
			width: 100%;
			border-radius: 0.25rem;
			color: #cdd6f4;

			&:hover,
			&.active {
				background-color: #b4befe;
				color: #181825;
			}
		}
	}

	h1 {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.85rem;
		color: #cdd6f4;
	}

	.title {
		border-bottom: 1px solid #313244;
		padding-bottom: 1rem;
		display: flex;
		gap: 1rem;

		img {
			width: 1rem;
			height: 1rem;
		}
	}
</style>
