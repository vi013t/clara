<script lang="ts">
	import { errors, Debug } from "@clara/api/utils";
	import { Project } from "@clara/api/project";
	import { InputHandler, Navbar, Pane, StatusBar, NoProject } from "@clara/api/components";
	import { startPlugins } from "@clara/api";
	import { onMount } from "svelte";
	import { userSettings } from "@clara/api/usersettings";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});

	startPlugins();

	onMount(() => {
		userSettings().selectTheme(userSettings().selectedTheme.name);
		document.getElementById("loading-screen")?.remove();
	});
</script>

<InputHandler />

<main>
	<Navbar />
	{#if Project.get()}
		<div>
			<Pane />
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
