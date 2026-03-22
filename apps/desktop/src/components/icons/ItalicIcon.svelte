<script lang="ts">
	import type { IconProps } from "../../api/ui/icons.svelte";

	let { stroke = "currentcolor", scale = 1, ...attributes }: IconProps = $props();
</script>

<svg
	style:width="{scale}rem"
	style:height="{scale}rem"
	{...attributes}
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
>
	<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
	<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
	<g id="SVGRepo_iconCarrier">
		<path
			{stroke}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 3L8 17m4-14H8m4 0h4M8 17H4m4 0h4"
		></path>
	</g>
</svg>
