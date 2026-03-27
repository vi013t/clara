<script lang="ts">
	import { invoke } from "@tauri-apps/api/core";
	import { open as chooseFile } from "@tauri-apps/plugin-dialog";
	import Select from "../input/Select.svelte";
	import Popup from "./Popup.svelte";
	import SettingsPopup from "./SettingsPopup.svelte";
	import { asyncFn } from "../../api/errors.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import type { Database } from "@clara/api/database";
	import { Project } from "@clara/api/project";
	import { FolderIcon, GearIcon } from "@clara/api/icons";
	import { userData } from "@clara/api/userdata";

	let popup: Popup;

	export function open() {
		popup.open();
	}

	let settingsPopup: SettingsPopup;

	let location: string = $state("");
	let name: string = $state("");
	let template: Database = $state(userData().templates[0]);

	let startedTypingLocation = $state(false);
	let startedTypingName = $state(false);

	let locationError = $derived.by(() => {
		if (location.length === 0) return "Location cannot be empty";
		if (!/^([a-zA-Z]:)?[\w\.\/\\]+$/.test(location)) return "Location contains invalid characters";
		return null;
	});

	let nameError = $derived.by(() => {
		if (name.length === 0) return "Name cannot be empty";
		if (!/^[\w\. ]+$/.test(name)) return "Name contains invalid characters";
		return null;
	});

	function typeName() {
		startedTypingName = true;
	}

	function typeLocation() {
		startedTypingLocation = true;
	}

	const pickLocation = asyncFn(
		async function pickLocation() {
			const selected = await chooseFile({
				directory: true,
				multiple: false,
				title: "Select a directory",
			});

			startedTypingLocation = true;

			// Directory Chosen
			if (typeof selected === "string") {
				location = selected;
			}

			// No directory chosen
			else {
				console.log("No directory selected");
			}
		},
		import.meta.url,
	);

	let hasErrors = $derived(!!nameError || !!locationError);
	let triedToCreate = $state(false);

	const createProject = asyncFn(
		async function createProject() {
			if (hasErrors) {
				startedTypingLocation = true;
				startedTypingName = true;
				triedToCreate = true;
				return;
			}

			// let currentProject = Project.get();
			// if (currentProject) await invoke("save_project", { project: currentProject.serialize() });

			let database = template.clone();
			database.name = name;

			let project = new Project({
				location,
				database,
			});

			Project.set(project);
			let serializedProject = project.serialize();

			await invoke("new_project", { project: serializedProject });

			popup?.close();
		},
		import.meta.url,
	);

	function reset() {
		location = "";
		name = "";
		startedTypingLocation = false;
		startedTypingName = false;
		template = userData().templates[0];
	}
</script>

<Popup {reset} bind:this={popup} width="50rem">
	<section class="popup">
		<h1>New Project</h1>
		<div class={["template", (nameError || locationError) && triedToCreate && "invalid-input"]}>
			<div>
				<h2>Location</h2>
				<div class="wrapper">
					<input
						class={[locationError && startedTypingLocation && "invalid-input"]}
						bind:value={location}
						placeholder="/path/to/books/folder"
						onchange={typeLocation}
					/>
					<button class="input-button" onmousedown={pickLocation}>
						<FolderIcon stroke="#a6adc8" style="width: 1rem; height: 1rem;" />
					</button>
				</div>
				{#if locationError && startedTypingLocation}
					<span class="error">
						{locationError}
					</span>
				{/if}
			</div>

			<div>
				<h2>Name</h2>
				<input
					class={[nameError && startedTypingName && "invalid-input"]}
					bind:value={name}
					placeholder="Book title"
					onchange={typeName}
				/>
				{#if nameError && startedTypingName}
					<span class="error">
						{nameError}
					</span>
				{/if}

				{#if !locationError && !nameError && startedTypingLocation && startedTypingName}
					<span>
						Project will be created at <span style:color="#cdd6f4">{location}/{name}</span>
					</span>
				{/if}
			</div>
		</div>

		<div class="template">
			<div>
				<h2>Template</h2>
				<div class="templates">
					<div class="select">
						<Select
							width="calc(100% - 1.75rem)"
							options={userData().templates.map(template => ({ name: template.name, icon: template.icon.component }))}
							bind:value={() => template.name, choice => (template = userData().templates.find(other => other.name === choice)!)}
						/>
						<button>
							<GearIcon
								stroke="var(--stroke)"
								style="width: 1rem; height: 1rem;"
								onmousedown={() => settingsPopup.open("templates")}
							/>
						</button>
					</div>
				</div>
			</div>

			<p>{template.description}</p>

			<div>
				<h2>Entries</h2>
				<div class="tree">
					<HierarchyView hideRoot entry={template} />
				</div>
			</div>
		</div>

		<button class={["create-button", hasErrors && "disabled"]} onmousedown={createProject}>Create</button>
	</section>
</Popup>

<SettingsPopup bind:this={settingsPopup} />

<style>
	.tree {
		padding: 1rem;
		background-color: #181825;
		border-radius: 0.25rem;
	}

	.create-button {
		font-size: 0.85rem;
		padding-left: 5rem;
		padding-right: 5rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		border-radius: 0.25rem;
		transition: scale 0.1s;
		width: fit-content;
		margin-left: auto;
		margin-right: auto;

		&.disabled {
			color: #9399b2;
			background-color: #313244;
			cursor: default;
		}

		&:not(.disabled) {
			background-image: linear-gradient(to bottom right, #b4befe, #89b4fa);
			color: #181825;
			box-shadow: 0px 0px 0.5rem black;

			&:hover {
				scale: 105%;
			}
		}
	}

	.wrapper {
		position: relative;
		width: 100%;
	}

	.input-button {
		position: absolute;
		top: 50%;
		transform: translateY(-40%);
		right: 0.25rem;
	}

	.error {
		color: #f38ba8;
	}

	.templates {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.select {
			display: flex;
			width: 100%;
			gap: 0.25rem;
			align-items: center;

			button {
				--stroke: #cdd6f4;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.25rem;
				border-radius: 0.25rem;

				&:hover {
					--stroke: #181825;
					background-color: #b4befe;
				}
			}
		}
	}

	p {
		font-size: 0.75rem;
		color: #a6adc8;
	}

	.invalid-input {
		outline: 1px solid #f38ba8;
	}

	.popup {
		padding: 2rem;
		padding-top: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: fit-content;
		min-height: 100%;

		span {
			&:not(.error) {
				color: #a6adc8;
			}
			font-size: 0.85rem;
		}

		> div:not(.template) {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}
	}

	.template {
		border: 1px solid #45475a;
		padding: 1rem;
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: rgba(200, 200, 255, 5%);

		> div {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		> p {
			background-color: #181825;
			padding: 1rem;
			border-radius: 0.25rem;
		}
	}

	h1 {
		color: #cdd6f4;
		font-size: 1rem;
	}

	h2 {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.85rem;
		color: #a6adc8;
	}

	input {
		padding: 0.25rem;
		padding-left: 0.5rem;
		background-color: #181825;
		border-radius: 0.25rem;
		width: 100%;
		color: #cdd6f4;
		font-size: 0.85rem;

		&::placeholder {
			color: #6c7086;
		}
	}
</style>
