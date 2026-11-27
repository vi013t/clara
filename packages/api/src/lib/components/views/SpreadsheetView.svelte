<script lang="ts">
	import { AttributeDefinition, AttributeType, attributeTypes, type AttributeRef } from "@clara/api/attribute";
	import { AttributeSettingsPopup, ContextMenu, Icon, Input, LittleButton } from "@clara/api/components";
	import { Item, ItemType } from "@clara/api/database";
	import { Project } from "@clara/api/project";
	import type { SinglePane, Spreadsheet } from "@clara/api/ui";
	import { SvelteMap } from "svelte/reactivity";

	let {
		spreadsheet = $bindable(),
		pane = $bindable(),
	}: {
		spreadsheet: Spreadsheet;
		pane: SinglePane;
	} = $props();

	let updateCounter = $state(0);
	let updateAttributes = $state(0);
	let newAttributeMenu: ContextMenu;

	function randomize(attribute: AttributeRef) {
		return function () {
			let args = Object.fromEntries(
				Object.entries(attribute.definition.randomizer?.arguments ?? {}).map(([name, boxed]) => [name, boxed.value!]),
			);
			attribute.value = attribute.definition.randomizer?.randomizer.random(args);
		};
	}

	function addRow() {
		spreadsheet.group.addChild(new Item(spreadsheet.itemType!, `New ${spreadsheet.itemType.name}`));
		Project.autosave();
	}

	function addColumn(event: MouseEvent) {
		newAttributeMenu.openAtMouse(event);
		updateAttributes++;
	}

	function createColumn(type: AttributeType) {
		spreadsheet.itemType.attributes.push(new AttributeDefinition({ name: "Attribute", type }));
		newAttributeMenu.close();
		Project.autosave();
	}

	function removeItem(item: Item) {
		return function () {
			spreadsheet.group.removeItem(item);
			Project.autosave();
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

	let itemTypeMenu: ContextMenu;

	function setItemType(type: ItemType) {
		return function () {
			spreadsheet.itemType = type;
			itemTypeMenu.close();
			Project.autosave();
		};
	}

	let attributes: SvelteMap<AttributeDefinition, SvelteMap<Item, AttributeRef>> = $derived.by(() => {
		let attributes = new SvelteMap<AttributeDefinition, SvelteMap<Item, AttributeRef>>();
		for (const attribute of spreadsheet.itemType.attributes) {
			const items = new SvelteMap<Item, AttributeRef>();
			for (const item of spreadsheet.group.dfsLeaves().filter(item => item.type === spreadsheet.itemType)) {
				items.set(item, item.attribute(attribute.name));
			}
			attributes.set(attribute, items);
		}
		return attributes;
	});
</script>

<div class="columns">
	<div class="column">
		<div style:width="100%" class="control cell" style:position="relative">
			<LittleButton icon={spreadsheet.itemType.icon.name} onmousedown={() => itemTypeMenu.open()}>
				<ContextMenu bind:this={itemTypeMenu} top="100%" left="0%">
					{#each Project.get()!.types.filter(type => !["Document", "Node"].includes(type.name) && !type.hidden) as itemType}
						<button onmousedown={setItemType(itemType)}>
							<Icon name={itemType.icon} />
							{itemType.pluralName}
						</button>
					{/each}
					<hr />
					{#each Project.get()!.types.filter(type => ["Document", "Node"].includes(type.name)) as itemType}
						<button onmousedown={setItemType(itemType)}>
							<Icon name={itemType.icon} />
							{itemType.pluralName}
						</button>
					{/each}
				</ContextMenu>
			</LittleButton>
		</div>

		{#each spreadsheet.group.dfsLeaves().filter(item => item.type === spreadsheet.itemType) as item}
			<div class="control cell">
				<LittleButton accent="var(--red)" icon="Trash2" onmousedown={removeItem(item)} />
			</div>
		{/each}
		<div class="new control cell">
			<LittleButton icon="Plus" onmousedown={addRow} />
		</div>
	</div>

	{#key updateAttributes}
		{#each attributes as [attribute, items]}
			<div class="column">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="cell" oncontextmenu={event => fieldSettings.openAtMouse(event)}>
					<attribute.icon.component stroke="var(--foreground-bright)" style="width: 1rem; height: 1rem; margin-right: 0.75rem;" />
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

				{#each items as [item, attributeRef]}
					<div class="cell">
						<Input
							context="spreadsheet"
							bind:pane
							type={attribute instanceof AttributeDefinition ? attribute.type.name : "shortText"}
							bind:attribute={
								() => attributes.get(attribute)!.get(item)!, ref => (attributes.get(attribute)!.get(item)!.value = ref.value)
							}
						/>
						{#if attribute instanceof AttributeDefinition && attribute.randomizer}
							<LittleButton icon="Dice6" onmousedown={randomize(attributeRef)} />
						{/if}
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
		{#each spreadsheet.group.children}
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

<AttributeSettingsPopup bind:attribute={editingAttribute!} bind:this={fieldPropertiesPopup} owner={spreadsheet.itemType} />

<style>
	.columns {
		display: flex;
		position: relative;
		padding: 2rem;
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
