<script lang="ts">
	import { userSettings } from "@clara/api/usersettings";
	import { getIcon } from "@clara/api/icons";
	import { LittleButton, Icon, Popup, Select, PopupSidebar, HierarchyView } from "@clara/api/components";
	import type { Template } from "@clara/api/project";

	let popup: Popup;
	let view = $state("appearance");
	let editingTemplate: Template | null = $state(null);

	export function open(viewName?: string) {
		if (viewName) view = viewName;
		popup.open();
	}

	function reset() {}

	function editTemplate(template: Template) {
		return function () {
			editingTemplate = template;
			view = "Template Editor";
		};
	}

	userSettings();
</script>

<Popup {reset} bind:this={popup}>
	<div class="popup">
		<PopupSidebar
			bind:view
			title={{ text: "Settings", icon: getIcon("Settings").component }}
			sections={{
				General: [
					["Appearance", "Palette"],
					["Hotkeys", "Keyboard"],
					["Startup", "History"],
					["Plugins", "Plug2"],
				],
				Presets: [
					["Templates", "Package"],
					["Randomizers", "Dice6"],
					["Suggestions", "SpellCheck"],
				],
				Plugins: userSettings().plugins.map(plugin => [plugin.name, getIcon(plugin.icon).component]),
			}}
		/>
		<div class="content">
			{#each userSettings().plugins as plugin}
				{#if view === plugin.name}
					<div class="plugin">
						<h1>{plugin.name}</h1>
						<p>{plugin.description}</p>
						<h2>Options</h2>
					</div>
				{/if}
			{/each}
			{#if view === "Appearance"}
				<h1>Appearance</h1>
				<div class="section">
					<div class="option">
						<div class="left">
							<h2>Theme</h2>
							<p>Additional themes can be installed as plugins.</p>
						</div>
						<Select
							style="background: var(--background);"
							options={userSettings().themes.map(theme => theme.name)}
							bind:value={() => userSettings().selectedTheme.name, name => userSettings().selectTheme(name)}
						/>
					</div>
					<div class="option">
						<div class="left">
							<h2>UI Scale</h2>
							<p>Set the color theme for Clara.</p>
						</div>
						<input />
					</div>
				</div>
			{:else if view === "Hotkeys"}
				<h1>Hotkeys</h1>
				<div class="section">
					{#each Object.entries(userSettings().hotkeys) as [name, action]}
						<div class="option">
							<h2>{name}</h2>
							<div class="hotkey">
								<span style="color: var(--foreground)">
									{action.modifiers.map(modifier => `${modifier} + `)}
									{action.key}
									<LittleButton style="margin-left: 0.5rem;" icon="X" accent="var(--red)" color="var(--red)" />
								</span>
								<LittleButton icon="Plus" color="var(--foreground)" />
							</div>
						</div>
					{/each}
				</div>
			{:else if view === "Templates"}
				<h1 style="margin-top: 1rem;">Templates</h1>
				<div class="templates">
					{#each userSettings().templates as template}
						<button class="header" onmousedown={editTemplate(template)}>
							<div>
								<h1>{template.database.name}</h1>
								<p>{template.database.description}</p>
							</div>
							<Icon name="ChevronRight" size={1.5} />
						</button>
					{/each}
				</div>
			{:else if view === "Template Editor"}
				{#if editingTemplate}
					<div class="template-editor">
						<h2>Name</h2>
						<div class="name">
							<LittleButton icon={editingTemplate.database.icon} color="var(--foreground)" />
							<input bind:value={editingTemplate.database.name} />
						</div>

						<h2>Groups &amp; Items</h2>
						<div class="hierarchy">
							<HierarchyView entry={editingTemplate.database} demo />
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</Popup>

<style>
	.plugin {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h2 {
			margin-top: 1rem;
		}

		p {
			color: var(--foreground);
			font-size: 0.85rem;
		}
	}

	.hierarchy {
		background-color: var(--background-dark);
		padding: 1rem;
		border-radius: 0.25rem;
	}

	.section {
		background-color: var(--background-dark);
		border-radius: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 1rem;
		padding-bottom: 1rem;

		input {
			background-color: var(--background);
			border: 1px solid var(--border);
			color: var(--foreground-bright);
			padding: 0.25rem;
			text-align: right;
			border-radius: 0.25rem;
			width: 5rem;
		}

		&:not(:last-child) {
			border-bottom: 1px solid var(--border);
		}

		h2:is(h2) {
			font-weight: normal;
			text-transform: none;
			color: var(--foreground-bright);
			font-size: 1rem;
		}

		.left {
			display: flex;
			flex-direction: column;
			gap: 0.1rem;

			p {
				font-size: 0.75rem;
				color: var(--foreground);
			}
		}
	}

	.template-editor {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h2:not(:first-child) {
			margin-top: 1rem;
		}

		.name {
			padding: 0.5rem;
			border-radius: 0.25rem;
			border: 1px solid var(--border);
			display: flex;
			background-color: var(--background-dark);
			gap: 0.5rem;
			align-items: center;

			input {
				color: var(--foreground-bright);
				padding: 0.25rem;
				border-radius: 0.25rem;
				font-size: 0.85rem;
				width: 80%;

				&:hover {
					background-color: rgba(200, 200, 255, 7%);
				}
			}
		}
	}

	.templates {
		.header {
			padding: 1rem;
			width: 100%;
			gap: 0.5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: var(--background-dark);
			border: 1px solid var(--border);
			transition: scale 0.1s;
			margin-bottom: 0.5rem;
			border-radius: 0.5rem;

			&:hover {
				scale: 102%;
			}

			div {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}

			p {
				font-size: 0.85rem;
				color: var(--foreground);
				margin-top: 0.25rem;
			}
		}
	}

	.popup {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 5fr;
		padding-right: 3rem;

		.content {
			h1:not(:first-child) {
				margin-top: 2rem;
			}

			padding: 1rem;
			flex-grow: 1;
			padding-left: 3rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			box-sizing: border-box;
			overflow-y: auto;
		}

		h1 {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 0.85rem;
			color: var(--foreground-bright);
		}

		h2 {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 0.85rem;
			color: var(--foreground);
		}
	}

	.hotkey {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-transform: capitalize;

		span {
			font-size: 0.8rem;
			display: flex;
			align-items: center;
			background: var(--background);
			border: 1px solid var(--border);
			padding: 0.25rem;
			padding-left: 0.5rem;
			border-radius: 0.25rem;
			display: flex;
		}
	}
</style>
