<script lang="ts">
	import { Icon } from "@clara/api/components";
	import type { IconIdentifier } from "@clara/api/icons";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		icon,
		size = 16,
		color = "currentColor",
		accent = "var(--indigo)",
		element = $bindable(),
		children,
		...attributes
	}: {
		element?: HTMLButtonElement;
		icon: IconIdentifier;
		size?: number;
		accent?: string;
		color?: string;
		children?: Snippet;
	} & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<button bind:this={element} {...attributes} style:--accent={accent} style:--base={color}>
	<Icon name={icon} {size} />
	{@render children?.()}
</button>

<style>
	button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		padding: 0.2rem;
		color: var(--base);
		flex-shrink: 0;
		width: fit-content;
		height: fit-content;

		&:hover {
			background-color: var(--accent);
			color: var(--background-dark);
		}
	}
</style>
