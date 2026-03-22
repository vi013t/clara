<script lang="ts">
	import { errors } from "../api/errors.svelte";
	import { Project } from "../api/project.svelte";
	import { pressHotkey } from "../api/userdata/action.svelte";
	import { Debug } from "../api/util/log";
	import Navbar from "../components/Navbar.svelte";
	import NoProject from "../components/NoProject.svelte";
	import Pane from "../components/pane/Pane.svelte";
	import StatusBar from "../components/StatusBar.svelte";
	import InputHandler from "../components/util/InputHandler.svelte";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});
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
