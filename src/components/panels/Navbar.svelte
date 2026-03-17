<script lang="ts">
	import { project } from "../../api/Data.svelte";
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import ContextMenu from "../ContextMenu.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";
	import DashIcon from "../icons/DashIcon.svelte";
	import FolderIcon from "../icons/FolderIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import MinimizeIcon from "../icons/MinimizeIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import QuestionMarkIcon from "../icons/QuestionMarkIcon.svelte";
	import SaveIcon from "../icons/SaveIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import Popup from "../Popup.svelte";
	import NewProjectPopup from "../popups/NewProjectPopup.svelte";

	let projectMenu: ContextMenu;
	let projectSettingsPopup: Popup;
	let newProjectPopup: NewProjectPopup;

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
		<button>
			<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
		</button>
		<button>
			<QuestionMarkIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
		</button>
	</div>

	<div>
		<input onkeydown={typeTitle} bind:value={() => project().name, name => (project().name = name)} />
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

<Popup bind:this={projectSettingsPopup}>
	<div class="popup">
		<div class="sidebar">
			<button>
				<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>General</span>
			</button>
			<button>
				<SpreadsheetIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>Datasets</span>
			</button>
		</div>
		<div class="content">
			<h1>Datasets</h1>
			<div class="datasets">
				{#each project().datasets as dataset}
					<div class="dataset">
						<div class="dataset-info">
							<div class="dataset-header">
								<dataset.icon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
								<span>{dataset.name}</span>
							</div>
							<p>{dataset.description ?? ""}</p>
						</div>
						<button>
							<TrashIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
						</button>
					</div>
				{/each}
			</div>
			<button class="add-dataset">
				<PlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
	</div>
</Popup>

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

	.popup {
		width: 100%;
		height: 100%;
		display: flex;

		.content {
			padding: 1rem;
			flex-grow: 1;
			padding-left: 3rem;
			padding-right: 3rem;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;

			h1 {
				font-weight: 700;
				text-transform: uppercase;
				font-size: 0.85rem;
				margin-bottom: 0.5rem;
				color: #a6adc8;
			}
		}

		.sidebar {
			height: 100%;
			width: 15rem;
			border-right: 1px solid #313244;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 1rem;

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

	.datasets {
		background-color: #181825;
		border-radius: 0.5rem;
	}

	.dataset {
		color: #cdd6f4;
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		width: 100%;
		gap: 0.5rem;
		position: relative;

		&:not(:last-child)::after {
			content: "";
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			height: 1px;
			width: calc(100% - 2rem);
			background-color: #313244;
		}

		> *:last-child {
			margin-left: auto;
		}

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			--stroke: #a6adc8;
			padding: 0.25rem;
			border-radius: 0.25rem;

			&:hover {
				background-color: #b4befe;
				--stroke: #181825;
			}
		}
	}

	.dataset-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		p {
			color: #a6adc8;
			font-size: 0.8rem;
		}
	}

	.dataset-header {
		align-items: center;
		display: flex;
		gap: 0.5rem;
	}

	.add-dataset {
		margin-left: auto;
		--stroke: #cdd6f4;
		padding: 0.25rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			--stroke: #181825;
			background-color: #b4befe;
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
