<script lang="ts">
	import { TrashIcon, PlusIcon, GearIcon, RenameIcon, CloseIcon } from "@clara/api/icons";
	import { AttributeDefinition } from "@clara/api/attribute";
	import type { RichText } from "@clara/api/attribute";
	import { Item, type Group } from "@clara/api/database";
	import Input from "../input/Input.svelte";
	import ContextMenu from "../../../../api/src/lib/components/menus/ContextMenu.svelte";
	import FieldPropertiesPopup from "../popups/AttributeSettingsPopup.svelte";

	let { group = $bindable(), openEditor }: { group: Group; openEditor: (content: RichText) => void } = $props();

	let updateCounter = $state(0);
	let updateAttributes = $state(0);

	function addRow() {
		group.addChild(new Item("New Item"));
		updateCounter++;
	}

	function addColumn() {
		group.addNewAttributeDefinition(AttributeDefinition.basic("Attribute", "shortText"));
		updateAttributes++;
	}

	function removeItem(item: Item) {
		return function () {
			group.removeItem(item);
			updateCounter++;
		};
	}

	let fieldSettings: ContextMenu;
	let fieldPropertiesPopup: FieldPropertiesPopup;
	let editingAttribute: AttributeDefinition | null = $state(null);

	function editAttribute(event: MouseEvent, field: AttributeDefinition) {
		editingAttribute = field;
		fieldSettings.openAtMouse(event);
	}

	group.attributeDefinitions;
</script>

<div class="columns">
	<div class="column">
		<div style:width="100%" class="control cell">
			<button style:opacity="0%" disabled>
				<TrashIcon stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>

		{#each group.children as item}
			<div class="control cell">
				<button onmousedown={removeItem(item as Item)}>
					<TrashIcon stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
				</button>
			</div>
		{/each}
		<div class="new control cell">
			<button onmousedown={addRow}>
				<PlusIcon stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
			</button>
		</div>
	</div>
	{#key updateAttributes}
		{#each group.attributeDefinitions as attribute}
			<div class="column">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="cell" oncontextmenu={event => fieldSettings.openAtMouse(event)}>
					<attribute.type.icon.component stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
					{attribute.name}
					<button style="width: fit-content; margin-right: 0px;" onmousedown={event => editAttribute(event, attribute)}>
						<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
					</button>
				</div>
				{#each group.directItemChildren as item}
					<div class="cell">
						<Input
							context="spreadsheet"
							{openEditor}
							type={attribute.type.name}
							bind:value={
								() => item.getAttributeValue(attribute.name),
								value => item.addNewOrOverwriteAttributeValue(attribute.name, value!)
							}
						/>
					</div>
				{/each}
				<div class="new cell"></div>
			</div>
		{/each}
	{/key}
	<div class="column">
		<button class="new header cell" onmousedown={addColumn}>
			<PlusIcon stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
			New
		</button>
		{#each group.children as item}
			<div class="new cell"></div>
		{/each}
		<div class="new cell"></div>
	</div>
</div>

<ContextMenu bind:this={fieldSettings}>
	<button>
		<RenameIcon stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
		Rename
	</button>
	<button
		onmousedown={() => {
			fieldPropertiesPopup.open();
			fieldSettings.close();
		}}
	>
		<GearIcon stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem;" />
		Properties
	</button>
	<hr />
	<button style:color="var(--red)">
		<CloseIcon stroke="var(--red)" style="width: 1rem; height: 1rem;" />
		Delete attribute
	</button>
</ContextMenu>

<FieldPropertiesPopup bind:attribute={editingAttribute!} bind:this={fieldPropertiesPopup} owner={group} />

<style>
	.columns {
		display: flex;
		position: relative;
	}

	.new.control.cell,
	.new.header.cell {
		background-color: var(--background);
	}

	.new.cell {
		background-color: var(--border);
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
			--stroke: var(--foreground-bright);

			&:hover {
				background-color: var(--indigo);
				--stroke: var(--background-dark);
			}
		}

		&:first-child .cell:not(.new) {
			background-color: var(--background-dark);
		}
	}

	.cell {
		width: 10rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		font-size: 0.85rem;
		gap: 0.5rem;
		color: var(--foreground);

		&:first-child:not(.new) {
			background-color: var(--background-dark);
			color: var(--foreground-bright);
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
