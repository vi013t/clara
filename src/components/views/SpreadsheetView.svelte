<script lang="ts">
	import { DataEntry, type ManualDataset } from "../../api/data/dataset.svelte";
	import { Attribute } from "../../api/data/attribute.svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import Input from "../input/Input.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import FieldPropertiesPopup from "../popups/FieldPropertiesPopup.svelte";

	let {
		dataset = $bindable(),
		openEditor,
	}: { dataset: ManualDataset; openEditor: (entryID: number, fieldName: string) => void } = $props();

	let updateCounter = $state(0);
	let updateAttributes = $state(0);

	let rows = $derived.by(() => {
		updateCounter;
		return dataset.data.ref().dfsLeaves();
	});

	function addRow() {
		dataset.data.ref().addChild(DataEntry.node(""));
		updateCounter++;
	}

	function addColumn() {
		dataset.fields.ref().push(new Attribute("Attribute", "Short text"));
		updateAttributes++;
	}

	function remove(id: number) {
		return function () {
			dataset.data.ref().filter(entry => entry.id !== id);
			updateCounter++;
		};
	}

	let fieldSettings: ContextMenu;
	let fieldPropertiesPopup: FieldPropertiesPopup;
	let editingAttribute: Attribute | null = $state(null);

	function editAttribute(event: MouseEvent, field: Attribute) {
		editingAttribute = field;
		fieldSettings.openAtMouse(event);
	}
</script>

<div class="columns">
	<div class="column">
		<div style:width="100%" class="control cell">
			<button style:opacity="0%" disabled>
				<TrashIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
			</button>
		</div>

		{#each rows as row}
			<div class="control cell">
				<button onmousedown={remove(row.id)}>
					<TrashIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
				</button>
			</div>
		{/each}
		<div class="new control cell">
			<button onmousedown={addRow}>
				<PlusIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
	</div>
	{#key updateAttributes}
		{#each dataset.fields.ref() as field, index}
			<div class="column">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="cell" oncontextmenu={event => fieldSettings.openAtMouse(event)}>
					<field.icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
					{field.name}
					<button style="width: fit-content; margin-right: 0px;" onmousedown={event => editAttribute(event, field)}>
						<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
					</button>
				</div>
				{#each rows as row}
					<div class="cell">
						<Input
							openEditor={() => openEditor(row.id, field.name)}
							type={field.type}
							bind:value={() => row.get(field.name), value => row.set(field.name, value!)}
						/>
					</div>
				{/each}
				<div class="new cell"></div>
			</div>
		{/each}
	{/key}
	<div class="column">
		<button class="new header cell" onmousedown={addColumn}>
			<PlusIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
			New
		</button>
		{#each rows}
			<div class="new cell"></div>
		{/each}
		<div class="new cell"></div>
	</div>
</div>

<ContextMenu bind:this={fieldSettings}>
	<button>
		<RenameIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
		Rename
	</button>
	<button
		onmousedown={() => {
			fieldPropertiesPopup.open();
			fieldSettings.close();
		}}
	>
		<GearIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
		Properties
	</button>
	<hr />
	<button style:color="#f38ba8">
		<CloseIcon stroke="#f38ba8" style="width: 1rem; height: 1rem;" />
		Delete attribute
	</button>
</ContextMenu>

<FieldPropertiesPopup bind:attribute={editingAttribute!} bind:this={fieldPropertiesPopup} />

<style>
	.columns {
		display: flex;
		position: relative;
	}

	.new.control.cell,
	.new.header.cell {
		background-color: #1e1e2e;
	}

	.new.cell {
		background-color: #313244;
	}

	.column {
		display: flex;
		flex-direction: column;

		button:not(.new) {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: auto;
			margin-top: 0.25rem;
			padding: 0.25rem;
			border-radius: 0.25rem;
			--stroke: #cdd6f4;

			&:hover {
				background-color: #b4befe;
				--stroke: #181825;
			}
		}

		&:first-child .cell:not(.new) {
			background-color: #181825;
		}
	}

	.cell {
		width: 10rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		border-right: 1px solid #45475a;
		border-bottom: 1px solid #45475a;
		font-size: 0.85rem;
		gap: 0.5rem;
		color: #a6adc8;

		&:first-child:not(.new) {
			background-color: #181825;
			color: #cdd6f4;
		}

		&.control {
			width: fit-content;
			gap: 0.25rem;
		}

		button {
			margin-left: auto;
			margin-right: 0rem;
		}
	}
</style>
