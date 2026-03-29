<script lang="ts">
	import { Icon } from "@clara/api/components";
	import type { IconIdentifier } from "@clara/api/icons";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		icon,
		size = 24,
		accent = "var(--indigo)",
		...attributes
	}: { icon: IconIdentifier; size?: number; accent?: string } & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<button {...attributes} style:--accent={accent}>
	<Icon name={icon} {size} />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		padding: 0.25rem;
		color: var(--foreground-bright);
		flex-shrink: 0;
		width: fit-content;
		height: fit-content;

		&:hover {
			background-color: var(--accent);
			color: var(--background-dark);
		}
	}
</style>
