<script lang="ts">
	import type { IconProps } from "../../api/ui/icons.svelte";

	let { stroke, ...attributes }: IconProps = $props();
</script>

<svg
	{...attributes}
	viewBox="0 0 512 512"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	fill={stroke}
	style:scale="140%"
>
	<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
	<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
	<g id="SVGRepo_iconCarrier">
		<title>function-block</title>
		<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			<g id="Combined-Shape" fill={stroke}>
				<path
					d="M362.666667,85.3333333 L362.666333,234.666333 L426.666667,234.666667 L426.666667,277.333333 L362.666333,277.333333 L362.666667,426.666667 L149.333333,426.666667 L149.333333,341.333333 L85.3333333,341.333333 L85.3333333,298.666667 L149.333333,298.666333 L149.333333,213.333333 L85.3333333,213.333333 L85.3333333,170.666667 L149.333333,170.666333 L149.333333,85.3333333 L362.666667,85.3333333 Z M320,128 L192,128 L192,384 L320,384 L320,128 Z"
				></path>
			</g>
		</g>
	</g>
</svg>
