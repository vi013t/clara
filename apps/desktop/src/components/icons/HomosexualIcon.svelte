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
		<path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7H2Z" fill="#FF575B"></path>
		<rect x="2" y="7" width="20" height="2" fill="#FF8353"></rect>
		<rect x="2" y="9" width="20" height="2" fill="#FABA2C"></rect>
		<rect x="2" y="11" width="20" height="2" fill="#7AC74D"></rect>
		<rect x="2" y="13" width="20" height="2" fill="#00B0FF"></rect>
		<rect x="2" y="15" width="20" height="2" fill="#B99FE4"></rect>
		<path d="M2 17H22C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" fill="#E39BD1"></path>
	</g>
</svg>
