<script lang="ts">
    import globalCss from "../global.css?url";

    let { children } = $props();
</script>

<svelte:head>
    <link href={globalCss} rel="stylesheet" />
    <title>Wallflower</title>
</svelte:head>

{@render children()}
