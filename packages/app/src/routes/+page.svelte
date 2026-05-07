<script lang="ts">
	import { errors, Debug } from "@clara/api/utils";
	import { Project, type PaneLayout } from "@clara/api/project";
	import { InputHandler, Navbar, Pane, StatusBar, NoProject, Sidebar, Notifications, keyboard } from "@clara/api/components";
	import { startPlugins } from "@clara/api";
	import { onMount } from "svelte";
	import { getFromCache, pressHotkey, userSettings } from "@clara/api/usersettings";
	import { getIcon, TabList } from "@clara/api/ui";
	import { Tab } from "@clara/api/ui";
	import { GroupTab } from "@clara/api/ui";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});

	const projectPath = getFromCache("lastProjectPath");
	if (projectPath) Project.openFromLocation(projectPath);

	startPlugins();

	let tabline = new TabList([new Tab(getIcon("StickyNote"))]);

	onMount(() => {
		userSettings().selectTheme(userSettings().selectedTheme.name);
		document.getElementById("loading-screen")?.remove();
	});

	Project.onSet(project => {
		if (!(tabline.tabs[0] instanceof GroupTab)) tabline.tabs[0] = new GroupTab(project.database.id);
	});

	let focusedPane: PaneLayout = $derived(Project.get() ? { split: "none", tabline, selectedTabID: tabline.tabs[0].id } : null!);

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
