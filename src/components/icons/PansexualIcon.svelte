<script lang="ts">
	import type { IconProps } from "../../api/ui/icons.svelte";

	let { stroke, ...attributes }: IconProps = $props();
</script>

<svg {...attributes} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
	<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
	<g id="SVGRepo_iconCarrier">
		<rect x="2" y="9.666" width="20" height="4.666" fill="#F9D949"></rect>
		<path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V9.666H2V7Z" fill="#EC408D"></path>
		<path
			d="M2 14.332H22V16.998C22 18.1026 21.1046 18.998 20 18.998H4C2.89543 18.998 2 18.1026 2 16.998V14.332Z"
			fill="#3F93F6"
		></path>
	</g>
</svg>
