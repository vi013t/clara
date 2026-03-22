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
		<rect x="2" y="9.67" width="20" height="4.67" fill="#6D5291"></rect>
		<path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V9.67H2V7Z" fill="#C62B6F"></path>
		<path d="M2 14.34H22V17.01C22 18.1146 21.1046 19.01 20 19.01H4C2.89543 19.01 2 18.1146 2 17.01V14.34Z" fill="#1439A3"></path>
	</g>
</svg>
