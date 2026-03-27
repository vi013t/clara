<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { IconComponent } from "@wallflower/api/icons";

	let {
		Icon,
		accent = "#b4befe",
		scale = 1,
		...attributes
	}: { Icon: IconComponent; accent?: string; scale?: number } & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<button {...attributes} style:--accent={accent}>
	<Icon stroke="var(--stroke)" style="width: {scale}rem; height: {scale}rem;" />
</button>

<style>
	button {
		color: var(--stroke);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		font-size: 0.8rem;
		padding: 0.25rem;
		--stroke: #cdd6f4;
		flex-shrink: 0;
		width: fit-content;
		height: fit-content;

		&:hover {
			background-color: var(--accent);
			--stroke: #181825;
		}
	}
</style>
