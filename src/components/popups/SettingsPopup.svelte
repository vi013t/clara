<script lang="ts">
	import Popup from "./Popup.svelte";
	import ColorPaletteIcon from "../icons/ColorPaletteIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import DiceIcon from "../icons/DiceIcon.svelte";
	import ParagraphIcon from "../icons/ParagraphIcon.svelte";
	import PlugIcon from "../icons/PlugIcon.svelte";
	import KeyboardKeyIcon from "../icons/KeyboardKeyIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import HierarchyView from "../views/HierarchyView.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";
	import { Template } from "../../api/userdata/template.svelte";
	import DatasetEditor from "../editors/DatasetEditor.svelte";
	import { ManualDataset } from "../../api/data/dataset.svelte";

	let popup: Popup;

	export function open() {
		popup.open();
	}

	let view = $state("introduction");

	function reset() {}

	function setView(viewName: string) {
		return function () {
			view = viewName;
		};
	}

	let expandedTemplates: string[] = $state([]);

	function expandTemplate(name: string) {
		return function () {
			if (expandedTemplates.includes(name)) expandedTemplates = expandedTemplates.filter(other => other !== name);
			else expandedTemplates.push(name);
		};
	}

	let editingTemplate: Template | null = $state(null);

	function editTemplate(template: Template) {
		return function () {
			editingTemplate = template;
			setView("template-editor")();
		};
	}
</script>

<Popup {reset} bind:this={popup}>
	<div class="popup">
		<div class="sidebar">
			<h1 class="title">
				<GearIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
				Settings
			</h1>

			<h1>General</h1>

			<button onmousedown={setView("introduction")}>
				<ColorPaletteIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Appearance</span>
			</button>
			<button onmousedown={setView("introduction")}>
				<KeyboardKeyIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Hotkeys</span>
			</button>
			<button onmousedown={setView("introduction")}>
				<PlugIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Plugins</span>
			</button>

			<h1>Presets</h1>

			<button onmousedown={setView("templates")}>
				<PackageIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Templates</span>
			</button>
			<button onmousedown={setView("introduction")}>
				<DiceIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Randomizers</span>
			</button>
			<button onmousedown={setView("introduction")}>
				<ParagraphIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Suggestions</span>
			</button>
		</div>
		<div class="content">
			{#if view === "templates"}
				<div class="templates">
					{#each Template.all as template}
						{@const manualDatasets = template.database.ref().manual()}
						{@const generatedDatasets = template.database.ref().generated()}

						<button class="header" onmousedown={editTemplate(template)}>
							<div>
								<h1>{template.name}</h1>
								<p>{template.description}</p>
							</div>
							<ArrowIcon stroke="#cdd6f4" style="width: 1.5rem; height: 1.5rem; rotate: 90deg;" />
						</button>
					{/each}
				</div>
			{:else if view === "template-editor"}
				{#if editingTemplate}
					<div class="template-editor">
						<h2>Name</h2>
						<div class="name">
							<button>
								<editingTemplate.icon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
							</button>
							<input bind:value={editingTemplate.name} />
						</div>

						<h2>Datasets</h2>
						{#each editingTemplate.database.ref().datasets.ref() as dataset, index}
							{#if dataset.ref().isManual()}
								<DatasetEditor
									bind:dataset={
										() => editingTemplate!.database.ref().datasets.ref()[index].ref() as ManualDataset,
										value => editingTemplate!.database.ref().datasets.ref()[index].overwrite(value)
									}
								/>
							{/if}
						{/each}
					</div>
				{/if}
			{/if}
		</div>
	</div>
</Popup>

<style>
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
			border: 1px solid #313244;
			display: flex;
			background-color: #181825;
			gap: 0.5rem;

			button {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.25rem;
				border-radius: 0.25rem;
				--stroke: #cdd6f4;

				&:hover {
					--stroke: #181825;
					background-color: #b4befe;
				}
			}

			input {
				color: #cdd6f4;
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
			background-color: #181825;
			border: 1px solid #313244;
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
			}
		}
	}

	.title {
		border-bottom: 1px solid #313244;
		padding-bottom: 1rem;
		display: flex;
		gap: 1rem;
		margin-left: 0.5rem;
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

			p {
				color: #a6adc8;
				font-size: 0.85rem;
			}
		}

		h1 {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 0.85rem;
			color: #cdd6f4;
		}

		h2 {
			font-weight: 700;
			text-transform: uppercase;
			font-size: 0.85rem;
			color: #a6adc8;
		}

		.sidebar {
			height: 100%;
			width: 15rem;
			border-right: 1px solid #313244;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 1rem;

			h1:not(:first-child) {
				margin-top: 1rem;
			}

			button {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.25rem;
				padding-left: 0.5rem;
				width: 100%;
				border-radius: 0.25rem;
				--stroke: #cdd6f4;

				&:hover {
					background-color: #b4befe;
					--stroke: #181825;
				}

				span {
					color: var(--stroke);
				}
			}
		}
	}
</style>
