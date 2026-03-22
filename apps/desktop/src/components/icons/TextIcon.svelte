<script lang="ts">
	import type { IconProps } from "../../api/ui/icons.svelte";

	let { stroke = "currentcolor", scale = 1, ...attributes }: IconProps = $props();
</script>

<svg
	style:width="{scale}rem"
	style:height="{scale}rem"
	{...attributes}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
	<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
	<g id="SVGRepo_iconCarrier">
		<path
			d="M12 18L8 5H7L3 18M4.23077 14H10.7692M14.5 10C16 9 20 8 20 11.5C20 15 20 18 20 18M20 12.5C18.5 13 14 13 14 16C14 19 18.5 18 20 15.5"
			{stroke}
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		></path>
	</g>
</svg>
