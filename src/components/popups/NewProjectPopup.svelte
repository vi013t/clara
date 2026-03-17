<script lang="ts">
	import { frameworks, isGenerated, type Framework } from "../../api/Data.svelte";
	import FolderIcon from "../icons/FolderIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import Select from "../input/Select.svelte";
	import Popup from "../Popup.svelte";
	import { open as chooseFile } from "@tauri-apps/plugin-dialog";

	let popup: Popup;

	export function open() {
		popup.open();
	}

	let location: string = $state("");
	let name: string = $state("");
	let framework: Framework = $state(frameworks.basic);

	let startedTypingLocation = $state(false);
	let startedTypingName = $state(false);

	let locationError = $derived.by(() => {
		if (location.length === 0) return "Location cannot be empty";
		if (!/^[\w\.\/\\]+$/.test(location)) return "Location contains invalid characters";
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

	async function pickLocation() {
		const selected = await chooseFile({
			directory: true,
			multiple: false,
			title: "Select a directory",
		});

		// Directory Chosen
		if (typeof selected === "string") {
			location = selected;
		}

		// No directory chosen
		else {
			console.log("No directory selected");
		}
	}
</script>

<Popup bind:this={popup} width="50rem">
	<section class="popup">
		<div>
			<h2>Location</h2>
			<div class="wrapper">
				<input
					class={[locationError && startedTypingLocation && "invalid-input"]}
					bind:value={location}
					placeholder="/path/to/books/folder"
					onkeydown={typeLocation}
				/>
				<button class="input-button" onmousedown={pickLocation}>
					<FolderIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
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
				onkeydown={typeName}
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

		<div>
			<h2>Template</h2>
			<div class="frameworks">
				<div class="select">
					<Select
						width="100%"
						options={Object.values(frameworks).map(framework => ({ name: framework.name, icon: framework.icon }))}
						bind:value={
							() => framework.name, choice => (framework = Object.values(frameworks).find(other => other.name === choice)!)
						}
					/>
					<button>
						<PlusIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
					</button>
				</div>
				<div class="content">
					<p>{framework.description}</p>
					<h2>Datasets</h2>
					<div class="datasets">
						{#each framework.datasets().filter(dataset => !isGenerated(dataset)) as dataset}
							<div class="dataset">
								<div class="header">
									<dataset.icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
									<h3>{dataset.name}</h3>
								</div>
								<p>{dataset.description}</p>
							</div>
							<hr />
						{/each}
						<h2>Generated Datasets</h2>
						{#each framework.datasets().filter(isGenerated) as dataset}
							<div class="dataset">
								<div class="header">
									<dataset.icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
									<h3>{dataset.name}</h3>
								</div>
								<p>{dataset.description}</p>
							</div>
							<hr />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</Popup>

<style>
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

	.dataset {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		.header {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}
	}

	.error {
		color: #f38ba8;
	}

	.datasets {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;

		hr {
			background-color: #313244;
			width: 100%;
			height: 1px;
		}
	}

	.frameworks {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.select {
			display: flex;
			width: 100%;
			gap: 0.5rem;
		}

		.content {
			background-color: #181825;
			padding: 1rem;
			display: flex;
			border-radius: 0.25rem;
			flex-direction: column;
			gap: 1rem;

			p {
				font-size: 0.85rem;
				color: #a6adc8;
			}
		}
	}

	.invalid-input {
		outline: 1px solid #f38ba8;
	}

	.popup {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		overflow-y: auto;

		span {
			&:not(.error) {
				color: #a6adc8;
			}
			font-size: 0.85rem;
		}

		> div {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}
	}

	h2 {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.85rem;
		color: #cdd6f4;
	}

	h3 {
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
	}
</style>
