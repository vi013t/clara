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
		background = "var(--background-dark)",
		element = $bindable(),
		on = $bindable(false),
		toggle,
		children,
		...attributes
	}: {
		element?: HTMLButtonElement;
		icon: IconIdentifier;
		size?: number;
		background?: string;
		accent?: string;
		color?: string;
		children?: Snippet;
		toggle?: true;
		on?: boolean;
	} & HTMLAttributes<HTMLButtonElement> = $props();

	function onmousedown(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (toggle) {
			on = !on;
		}

		attributes.onmousedown?.(event);
	}
</script>

<button
	{...attributes}
	{onmousedown}
	bind:this={element}
	style:--bg={background}
	style:--accent={accent}
	style:--base={color}
	class={{ on }}
>
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
			color: var(--bg);
		}

		&.on {
			background-color: var(--accent);
			color: var(--bg);
		}
	}
</style>
