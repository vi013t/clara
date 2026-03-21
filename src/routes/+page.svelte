<script>
	import Navbar from "../components/panels/Navbar.svelte";
	import Pane from "../components/pane/Pane.svelte";
	import StatusBar from "../components/StatusBar.svelte";
	import { pressHotkey } from "../api/userdata/action.svelte";
	import { Project } from "../api/project.svelte";
	import NoProject from "../components/NoProject.svelte";
	import InputHandler from "../components/util/InputHandler.svelte";
</script>

<svelte:document onkeydown={pressHotkey} />

<InputHandler />

<main>
	<Navbar />
	{#if Project.get()}
		<div>
			<Pane background="#181825" />
			<StatusBar />
		</div>
	{:else}
		<NoProject />
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		div {
			height: 100%;
		}
	}
</style>
