<script lang="ts">
	import globalCss from "../global.css?url";

	let { children } = $props();
</script>

<svelte:head>
	<link href={globalCss} rel="stylesheet" />
	<link href="/favicon.png" rel="icon" />
	<title>Clara</title>
</svelte:head>

{@render children()}
