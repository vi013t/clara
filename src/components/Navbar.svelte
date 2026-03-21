<script lang="ts">
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { Project } from "../api/project.svelte";
	import ArrowIcon from "./icons/ArrowIcon.svelte";
	import CircledPlusIcon from "./icons/CircledPlusIcon.svelte";
	import ClockIcon from "./icons/ClockIcon.svelte";
	import CloseIcon from "./icons/CloseIcon.svelte";
	import DashIcon from "./icons/DashIcon.svelte";
	import FolderIcon from "./icons/FolderIcon.svelte";
	import GearIcon from "./icons/GearIcon.svelte";
	import MinimizeIcon from "./icons/MinimizeIcon.svelte";
	import QuestionMarkIcon from "./icons/QuestionMarkIcon.svelte";
	import SaveIcon from "./icons/SaveIcon.svelte";
	import ContextMenu from "./menus/ContextMenu.svelte";
	import ManualPopup from "./popups/ManualPopup.svelte";
	import NewProjectPopup from "./popups/NewProjectPopup.svelte";
	import ProjectSettingsPopup from "./popups/ProjectSettingsPopup.svelte";
	import SettingsPopup from "./popups/SettingsPopup.svelte";
	import LittleButton from "./widgets/LittleButton.svelte";

	let projectMenu: ContextMenu;

	let projectSettingsPopup: ProjectSettingsPopup;
	let newProjectPopup: NewProjectPopup;
	let manualPopup: ManualPopup;
	let settingsPopup: SettingsPopup;

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

	function openProject() {
		projectMenu.close();
		Project.open();
	}
</script>

<nav>
	<div>
		<div class="wrapper">
			<LittleButton Icon={FolderIcon} onmousedown={() => projectMenu.toggle()} />
			<ContextMenu bind:this={projectMenu} top="120%" left="0px">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div onmousedown={() => Project.open()} class={["cm-button"]}>
					<FolderIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
					<span>Open project</span>

					<ArrowIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem; rotate: 90deg; margin-left: auto;" />
					<ContextMenu>
						<button>
							<ClockIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
							<span>Recent</span>
						</button>
						<button onmousedown={openProject}>
							<FolderIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
							<span>Browse</span>
						</button>
					</ContextMenu>
				</div>
				<button
					onmousedown={() => {
						newProjectPopup.open();
						projectMenu.close();
					}}
				>
					<CircledPlusIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
					<span>New project</span>
				</button>
				<hr />
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onmousedown={() => {
						projectSettingsPopup.open();
						projectMenu.close();
					}}
					class={["cm-button", !Project.get() && "disabled"]}
				>
					<GearIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
					<span>Project settings</span>
				</div>
				<button disabled={!Project.get()}>
					<SaveIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
					<span>Save project</span>
				</button>
				<button disabled={!Project.get()}>
					<SaveIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
					<span>Save project as...</span>
				</button>
			</ContextMenu>
		</div>
		<LittleButton Icon={GearIcon} onmousedown={() => settingsPopup.open()} />
		<LittleButton Icon={QuestionMarkIcon} onmousedown={() => manualPopup.open()} />
	</div>

	{#if Project.get()}
		<div>
			{Project.get()!.database.name}
		</div>
	{/if}

	<div>
		<LittleButton Icon={DashIcon} onmousedown={minimize} scale={0.85} />
		<LittleButton Icon={MinimizeIcon} onmousedown={maximize} scale={0.85} />
		<LittleButton Icon={CloseIcon} onmousedown={close} accent="#f38ba8" scale={0.85} />
	</div>
</nav>

<NewProjectPopup bind:this={newProjectPopup} />
{#if Project.get()}
	<ProjectSettingsPopup bind:this={projectSettingsPopup} />
{/if}
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
		}
	}

	button,
	.cm-button {
		--stroke: #cdd6f4;
		cursor: pointer;

		&[disabled],
		&.disabled {
			--stroke: #6c7086;
		}
	}

	.wrapper {
		position: relative;
		height: 100%;
	}
</style>
