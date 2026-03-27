<script lang="ts">
	import { errors } from "../api/errors.svelte";
	import { Project } from "@clara/api/project";
	import { Debug } from "../api/log";
	import Navbar from "../components/Navbar.svelte";
	import NoProject from "../components/NoProject.svelte";
	import Pane from "../components/pane/Pane.svelte";
	import StatusBar from "../components/StatusBar.svelte";
	import { InputHandler } from "@clara/api/components";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});
</script>

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
