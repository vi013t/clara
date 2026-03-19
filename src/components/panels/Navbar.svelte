<script lang="ts">
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";
	import DashIcon from "../icons/DashIcon.svelte";
	import FolderIcon from "../icons/FolderIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import MinimizeIcon from "../icons/MinimizeIcon.svelte";
	import QuestionMarkIcon from "../icons/QuestionMarkIcon.svelte";
	import SaveIcon from "../icons/SaveIcon.svelte";
	import NewProjectPopup from "../popups/NewProjectPopup.svelte";
	import { invoke } from "@tauri-apps/api/core";
	import { open as chooseFile } from "@tauri-apps/plugin-dialog";
	import { Project, type BackendProject } from "../../api/project.svelte";
	import ProjectSettingsPopup from "../popups/ProjectSettingsPopup.svelte";
	import ManualPopup from "../popups/ManualPopup.svelte";
	import SettingsPopup from "../popups/SettingsPopup.svelte";

	let projectMenu: ContextMenu;

	let projectSettingsPopup: ProjectSettingsPopup;
	let newProjectPopup: NewProjectPopup;
	let manualPopup: ManualPopup;
	let settingsPopup: SettingsPopup;

	function typeTitle(event: KeyboardEvent) {
		if (event.key === "Enter") {
			(event.target as HTMLElement).blur();
		}
	}

	function close() {
		const appWindow = getCurrentWindow();
		appWindow.close();
	}

	function minimize() {
		const appWindow = getCurrentWindow();
		appWindow.minimize();
	}

	function maximize() {
		const appWindow = getCurrentWindow();
		appWindow.toggleMaximize();
	}

	async function openProject(path: string) {
		const selected = await chooseFile({
			directory: true,
			multiple: false,
			title: "Select a directory",
		});

		// Directory Chosen
		if (typeof selected === "string") {
			const project = await invoke<BackendProject>("open_project", { selected });
			Project.set(Project.fromBackend(project));
		}

		// No directory chosen
		else {
			console.log("No directory selected");
		}
	}
</script>

<nav>
	<div>
		<div class="wrapper">
			<button onmousedown={() => projectMenu.toggle()}>
				<FolderIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
			<ContextMenu bind:this={projectMenu} top="120%" left="0px">
				<button
					onmousedown={() => {
						projectSettingsPopup.open();
						projectMenu.close();
					}}
				>
					<GearIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
					<span>Project settings</span>
				</button>
				<button>
					<SaveIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
					<span>Save project</span>
				</button>
				<button>
					<SaveIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
					<span>Save project as...</span>
				</button>

				<hr />

				<button>
					<FolderIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
					<span>
						Open project
						<span></span>
					</span>
				</button>
				<button
					onmousedown={() => {
						newProjectPopup.open();
						projectMenu.close();
					}}
				>
					<CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
					<span>New project</span>
				</button>
			</ContextMenu>
		</div>
		<button onmousedown={() => settingsPopup.open()}>
			<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
		</button>
		<button onmousedown={() => manualPopup.open()}>
			<QuestionMarkIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
		</button>
	</div>

	<div>
		<input onkeydown={typeTitle} bind:value={() => Project.get().name, name => (Project.get().name = name)} />
	</div>

	<div>
		<button onmousedown={minimize}>
			<DashIcon stroke="var(--stroke)" style="width: 0.75rem; height: 0.75rem;" />
		</button>
		<button onmousedown={maximize}>
			<MinimizeIcon stroke="var(--stroke)" style="width: 0.75rem; height: 0.75rem;" />
		</button>
		<button class="close" onmousedown={close}>
			<CloseIcon stroke="var(--stroke)" style="width: 0.75rem; height: 0.75rem;" />
		</button>
	</div>
</nav>

<NewProjectPopup bind:this={newProjectPopup} />
<ProjectSettingsPopup bind:this={projectSettingsPopup} />
<ManualPopup bind:this={manualPopup} />
<SettingsPopup bind:this={settingsPopup} />

<style>
	nav {
		width: 100%;
		height: 2rem;
		background-color: #181825;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		justify-content: space-between;

		> div {
			display: flex;
			gap: 0.25rem;

			&:last-child {
				gap: 0.5rem;
			}

			input {
				color: #a6adc8;
				border-radius: 0.25rem;
				padding: 0.25rem;
				font-size: 0.75rem;
				text-align: center;
				width: 30rem;

				&:hover,
				&:focus {
					background-color: rgba(200, 200, 255, 10%);
				}
			}

			> button {
				color: #cdd6f4;
				display: flex;
				border-radius: 0.25rem;
				font-size: 0.8rem;
				padding: 0.25rem;
				--stroke: #cdd6f4;

				&:hover {
					background-color: #b4befe;
					color: #181825;
					--stroke: #181825;
				}
			}
		}

		.close {
			--stroke: #f38ba8;

			&:hover {
				background-color: #f38ba8;
				--stroke: #181825;
			}
		}
	}

	.wrapper {
		position: relative;
		height: 100%;

		> button {
			display: flex;
			align-items: center;
			justify-content: center;
			--stroke: #cdd6f4;
			padding: 0.25rem;
			border-radius: 0.25rem;
			color: var(--stroke);

			&:hover {
				--stroke: #181825;
				background-color: #b4befe;
			}
		}
	}
</style>
