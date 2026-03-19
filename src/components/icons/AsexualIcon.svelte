<script lang="ts">
	import type { IconProps } from "../../api/ui/icons.svelte";

	let { stroke, ...attributes }: IconProps = $props();
</script>

<svg {...attributes} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
	<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
	<g id="SVGRepo_iconCarrier">
		<rect x="2" y="12" width="20" height="3.5" fill="white"></rect>
		<path d="M2 8.5H22V12H2V8.5Z" fill="#A3A3A3"></path>
		<path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V8.5H2V7Z" fill="#000000"></path>
		<path d="M2 15.5H22V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V15.5Z" fill="#77187B"></path>
	</g>
</svg>
