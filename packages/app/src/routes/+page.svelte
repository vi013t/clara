<script lang="ts">
	import { errors, Debug } from "@clara/api/utils";
	import { Project, type PaneLayout } from "@clara/api/project";
	import { InputHandler, Navbar, Pane, StatusBar, NoProject, Sidebar, Notifications } from "@clara/api/components";
	import { startPlugins } from "@clara/api";
	import { onMount } from "svelte";
	import { getFromCache, userSettings } from "@clara/api/usersettings";
	import { TabList } from "@clara/api/ui";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});

	const projectPath = getFromCache("lastProjectPath");
	if (projectPath) Project.openFromLocation(projectPath);

	startPlugins();

	onMount(() => {
		userSettings().selectTheme(userSettings().selectedTheme.name);
		document.getElementById("loading-screen")?.remove();
	});

	let focusedPane: PaneLayout = $derived(Project.get() ? { split: "none", tabline: new TabList(), selectedTabID: null! } : null!);
</script>

<InputHandler />

<main>
	<Navbar />
	{#if Project.get()}
		<div>
			<Sidebar bind:focusedPane />
			<div class="pane">
				<Pane bind:pane={focusedPane} />
			</div>
			<StatusBar />
		</div>
	{:else}
		<NoProject />
	{/if}

	<Notifications />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		div {
			height: 100%;
			display: flex;
		}
	}

	.pane {
		flex-grow: 1;
	}
</style>
