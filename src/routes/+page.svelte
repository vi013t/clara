<script>
	import Pane from "../components/panes/Pane.svelte";
	import StatusBar from "../components/StatusBar.svelte";
</script>

<main>
    <Pane width="1920px" height="1080px"/>
    <StatusBar />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>