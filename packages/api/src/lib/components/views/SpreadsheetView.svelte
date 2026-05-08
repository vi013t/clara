<script lang="ts">
	import { AttributeDefinition, attributeTypes } from "@clara/api/attribute";
	import { AttributeType, type RichText } from "@clara/api/attribute";
	import { Item, type Group } from "@clara/api/database";
	import { Icon, AttributeSettingsPopup, ContextMenu, LittleButton, Input } from "@clara/api/components";

	let { group = $bindable(), openEditor }: { group: Group; openEditor: (content: RichText) => void } = $props();

	let updateCounter = $state(0);
	let updateAttributes = $state(0);
	let newAttributeMenu: ContextMenu;

	function addRow() {
		group.addChild(new Item("New Item"));
		// updateCounter++;
		console.log(group);
	}

	function addColumn(event: MouseEvent) {
		newAttributeMenu.openAtMouse(event);
		updateAttributes++;
	}

	function createColumn(type: AttributeType) {
		group.addNewAttributeDefinition(AttributeDefinition.basic("Attribute", type.name));
		newAttributeMenu.close();
	}

	function removeItem(item: Item) {
		return function () {
			group.removeItem(item);
			updateCounter++;
		};
	}

	let fieldSettings: ContextMenu;
	let fieldPropertiesPopup: AttributeSettingsPopup;
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
			<Icon name={group.icon.name} />
		</div>

		{#each group.dfsLeaves() as item}
			<div class="control cell">
				<LittleButton accent="var(--red)" icon="Trash2" onmousedown={removeItem(item)} />
			</div>
		{/each}
		<div class="new control cell">
			<LittleButton icon="Plus" onmousedown={addRow} />
		</div>
	</div>
	{#key updateAttributes}
		{#each group.attributeDefinitions as attribute}
			<div class="column">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="cell" oncontextmenu={event => fieldSettings.openAtMouse(event)}>
					<attribute.type.icon.component
						stroke="var(--foreground-bright)"
						style="width: 1rem; height: 1rem; margin-right: 0.75rem;"
					/>
					{attribute.name}
					{#if attribute.name !== "Name"}
						<LittleButton
							color="var(--foreground)"
							style="margin-left: auto;"
							icon="Settings"
							onmousedown={(event: MouseEvent) => editAttribute(event, attribute)}
						/>
						<LittleButton
							color="var(--foreground)"
							accent="var(--red)"
							icon="Trash2"
							onmousedown={(event: MouseEvent) => editAttribute(event, attribute)}
						/>
					{/if}
				</div>
				{#each group.dfsLeaves() as item}
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
		<div class="new header cell">
			<LittleButton icon="Plus" onmousedown={addColumn} />
		</div>
		{#each group.children as item}
			<div class="new cell"></div>
		{/each}
		<div class="new cell"></div>
	</div>
</div>

<ContextMenu bind:this={fieldSettings}>
	<button>
		<Icon name="Type" />
		Rename
	</button>
	<button
		onmousedown={() => {
			fieldPropertiesPopup.open();
			fieldSettings.close();
		}}
	>
		<Icon name="Settings" />
		Properties
	</button>
	<hr />
	<button style:color="var(--red)">
		<Icon name="X" />
		Delete attribute
	</button>
</ContextMenu>

<ContextMenu bind:this={newAttributeMenu}>
	{#each attributeTypes as type}
		<button onmousedown={() => createColumn(type)}>
			<Icon name={type.icon.name} />
			<span>{AttributeType.readableName(type)}</span>
		</button>
	{/each}
</ContextMenu>

<AttributeSettingsPopup bind:attribute={editingAttribute!} bind:this={fieldPropertiesPopup} owner={group} />

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
		background-color: var(--background);
	}

	.column {
		display: flex;
		flex-direction: column;

		&:first-child .cell:not(.new) {
			background-color: var(--background);
		}

		&:last-child .cell {
			width: fit-content;
			border: none;
			background-color: var(--background);

			&:first-child {
				border-bottom: 1px solid var(--border);
			}
		}

		> .cell:last-child {
			&:not(.control) {
				border-right: none;
			}
			border-bottom: none;
		}
	}

	.cell {
		width: 15rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		font-size: 0.85rem;
		color: var(--foreground);
		background-color: var(--background-dark);
		gap: 0.25rem;

		&:first-child:not(.new) {
			background-color: var(--background);
			color: var(--foreground-bright);
		}

		&.control {
			width: fit-content;
			gap: 0.25rem;
		}
	}
</style>
