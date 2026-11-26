<script lang="ts" module>
	let popups: SvelteMap<Id, [Snippet<[boolean]>, boolean]> = $state(new SvelteMap());

	export function registerPopup(popup: Snippet<[boolean]>) {
		let popupId = uniqueId();
		popups.set(popupId, [popup, false]);
		return {
			open() {
				popups.get(popupId)![1] = true;
			},
			close() {
				popups.get(popupId)![1] = false;
			},
		};
	}
</script>

<script lang="ts">
	import { startPlugins } from "@clara/api";
	import { InputHandler, keyboard, Navbar, NoProject, Notifications, Pane } from "@clara/api/components";
	import { Project } from "@clara/api/project";
	import {
		editorFactory,
		focusedPane,
		GroupTab,
		hierarchyFactory,
		registerGlobalView,
		spreadsheetFactory,
		TabRef,
	} from "@clara/api/ui";
	import { getFromCache, pressHotkey, userSettings } from "@clara/api/usersettings";
	import { Debug, errors, uniqueId, type Id } from "@clara/api/utils";
	import { onMount, type Snippet } from "svelte";
	import { SvelteMap } from "svelte/reactivity";
	import { rootPane, setRootPane } from "../ui/pane.svelte.ts";
	import CommandPalette from "./popups/CommandPalette.svelte";

	$effect(() => {
		if (errors().length > 0) {
			Debug.errors(errors());
		}
	});

	registerGlobalView(editorFactory);
	registerGlobalView(spreadsheetFactory);
	registerGlobalView(hierarchyFactory);

	let startingPlugins = startPlugins();

	startingPlugins.then(() => {
		const projectPath = getFromCache("lastProjectPath");
		if (projectPath) Project.openFromLocation(projectPath);
	});

	onMount(async () => {
		userSettings().selectTheme(userSettings().selectedTheme.name);
		let loadingScreen = document.getElementById("loading-screen");
		if (loadingScreen) {
			loadingScreen.textContent = "Loading Plugins...";
			await startingPlugins;
			loadingScreen.remove();
		}
	});

	Project.onSet(project => {
		const pane = focusedPane();
		if (!pane.isSingle()) return;
		if (pane.tabline.tabs.length === 0) {
			pane.tabline.tabs[0] = new TabRef(new GroupTab(project.database.id));
			pane.selectedTabID = pane.tabline.tabs[0].id;
		}
	});

	keyboard().onKeyDown(event => pressHotkey(event));
</script>

<InputHandler />

<main>
	<Navbar />
	{#if Project.get()}
		<div>
			<!-- <Sidebar /> -->
			<div class="pane">
				<Pane bind:pane={rootPane, setRootPane} />
			</div>
		</div>
	{:else}
		<NoProject />
	{/if}

	<Notifications />
</main>

<CommandPalette />

{#each popups as [id, [popup, isOpen]]}
	{@render popup(isOpen)}
{/each}

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		div {
			flex-grow: 1;
			display: flex;
		}
	}

	.pane {
		flex-grow: 1;
	}
</style>
