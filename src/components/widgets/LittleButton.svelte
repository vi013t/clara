<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { IconComponent } from "../../api/ui/icons.svelte";

	let {
		Icon,
		accent = "#b4befe",
		iconScale = 1,
		...attributes
	}: { Icon: IconComponent; accent?: string; iconScale?: number } & HTMLAttributes<HTMLButtonElement> = $props();
</script>

<button {...attributes} style:--accent={accent}>
	<Icon stroke="var(--stroke)" style="width: {iconScale}rem; height: {iconScale}rem;" />
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

		&:hover {
			background-color: var(--accent);
			--stroke: #181825;
		}
	}
</style>
