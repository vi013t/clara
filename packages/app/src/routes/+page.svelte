<script lang="ts">
	import { errors, Debug } from "@clara/api/utils";
	import { Project } from "@clara/api/project";
	import { InputHandler, Navbar, Pane, StatusBar, NoProject, Sidebar, Notifications, keyboard } from "@clara/api/components";
	import { startPlugins } from "@clara/api";
	import { onMount } from "svelte";
	import { getFromCache, pressHotkey, userSettings } from "@clara/api/usersettings";
	import { PaneLayout, SinglePane, TabList } from "@clara/api/ui";
	import { GroupTab } from "@clara/api/ui";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});

	let startingPlugins = startPlugins();

	startingPlugins.then(() => {
		const projectPath = getFromCache("lastProjectPath");
		if (projectPath) Project.openFromLocation(projectPath);
	});

	let tabline = new TabList([]);

	onMount(async () => {
		userSettings().selectTheme(userSettings().selectedTheme.name);
		let loadingScreen = document.getElementById("loading-screen");
		if (loadingScreen) {
			loadingScreen.textContent = "Loading Plugins...";
			await startingPlugins;
			loadingScreen.remove();
		}
	});

	let focusedPane: PaneLayout = $state(null!);

	Project.onSet(project => {
		if (!(tabline.tabs[0] instanceof GroupTab)) tabline.tabs[0] = new GroupTab(project.database.id);
		focusedPane = new SinglePane(tabline);
	});

	keyboard().onKeyDown(event => pressHotkey(event));
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
