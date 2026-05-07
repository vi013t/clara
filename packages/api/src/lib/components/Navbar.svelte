<script lang="ts">
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import {
		ContextMenu,
		LittleButton,
		ManualPopup,
		NewProjectPopup,
		SettingsPopup,
		ProjectSettingsPopup,
	} from "@clara/api/components";
	import { Project } from "@clara/api/project";
	import { Icon } from "@clara/api/components";

	let projectMenu: ContextMenu;

	let projectSettingsPopup: ProjectSettingsPopup | null = $state(null);
	let newProjectPopup: NewProjectPopup;
	let manualPopup: ManualPopup;
	let settingsPopup: SettingsPopup;

	async function saveProject() {
		projectMenu.close();
		await Project.save();
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

	function openProject() {
		projectMenu.close();
		Project.open();
	}

	function typeKey(event: KeyboardEvent) {
		if (event.key === "Enter") {
			event.preventDefault();
			(event.currentTarget as HTMLElement).blur();
		}
	}
</script>

<nav>
	<div>
		<div class="wrapper">
			<LittleButton size={16} icon="Folder" onmousedown={() => projectMenu.toggle()} />
			<ContextMenu bind:this={projectMenu} top="120%" left="0px">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div onmousedown={() => Project.open()} class={["cm-button"]}>
					<Icon name="Folder" size={16} />
					<span>Open project</span>

					<Icon name="ChevronRight" style="margin-left: auto;" />
					<ContextMenu>
						<button>
							<Icon name="Clock" size={16} />
							<span>Recent</span>
						</button>
						<button onmousedown={openProject}>
							<Icon name="Folder" size={16} />
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
					<Icon name="CirclePlus" size={16} />
					<span>New project</span>
				</button>
				<hr />
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					onmousedown={() => {
						projectSettingsPopup?.open();
						projectMenu.close();
					}}
					class={["cm-button", !Project.get() && "disabled"]}
				>
					<Icon name="Settings" size={16} />
					<span>Project settings</span>
				</div>
				<button disabled={!Project.get()} onmousedown={saveProject}>
					<Icon name="Save" size={16} />
					<span>Save project</span>
				</button>
				<button disabled={!Project.get()}>
					<Icon name="Save" size={16} />
					<span>Save project as...</span>
				</button>
				<button disabled={!Project.get()}>
					<Icon name="TextCursorInput" size={16} />
					<span>Rename Project</span>
				</button>
			</ContextMenu>
		</div>
		<LittleButton size={16} icon="Settings" onmousedown={() => settingsPopup.open()} />
		<LittleButton size={16} icon="CircleQuestionMark" onmousedown={() => manualPopup.open()} />
	</div>

	{#if Project.get()}
		<input
			onkeydown={typeKey}
			class="name"
			bind:value={() => Project.get()!.database.name, name => (Project.get()!.database.name = name)}
		/>
	{/if}

	<div class="controls">
		<LittleButton icon="Minus" onmousedown={minimize} size={16} />
		<LittleButton icon="Square" onmousedown={maximize} size={12} />
		<LittleButton icon="X" onmousedown={close} accent="var(--red)" size={16} />
	</div>
</nav>

<NewProjectPopup bind:this={newProjectPopup} />
{#if Project.get()}
	<ProjectSettingsPopup bind:this={projectSettingsPopup} />
{/if}
<ManualPopup bind:this={manualPopup} />
<SettingsPopup bind:this={settingsPopup} />

<style>
	.controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	nav {
		width: 100%;
		height: 2rem;
		background-color: var(--background-dark);
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		justify-content: space-between;

		> div {
			display: flex;
			gap: 0.25rem;
			color: var(--foreground-bright);

			&:last-child {
				gap: 0.5rem;
			}
		}
	}

	.name {
		color: var(--foreground);
		font-size: 0.85rem;
		text-align: center;
		border-radius: 0.25rem;
		padding: 0.25rem;
		width: 20rem;

		&:hover {
			background-color: var(--border);
		}
	}

	button,
	.cm-button {
		--stroke: var(--foreground-bright);
		cursor: pointer;

		&[disabled],
		&.disabled {
			cursor: default;
			--stroke: #6c7086;
		}
	}

	.wrapper {
		position: relative;
		height: 100%;
		color: var(--foreground-bright);

		> * {
			color: var(--foreground-bright);
		}
	}
</style>
