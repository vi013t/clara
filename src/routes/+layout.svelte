<script lang="ts">
    import globalCss from "../global.css?url";

    let { children } = $props();
</script>

<svelte:head>
    <link href={globalCss} rel="stylesheet" />
</svelte:head>

{@render children()}
