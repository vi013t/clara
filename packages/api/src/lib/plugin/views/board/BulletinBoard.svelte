<script lang="ts">
	import { ContextMenu, Icon, InfiniteCanvas } from "@clara/api/components";
	import { Item, ItemType, type Group } from "@clara/api/database";
	import { AttributeDefinition, AttributeType, Color, NumberAttribute, StringAttribute } from "@clara/api/attribute";
	import StickyNote, { type Note } from "./StickyNote.svelte";
	import { Project } from "@clara/api/project";
	import { Rectangle } from "@clara/api/math";
	import { uniqueId } from "@clara/api/utils";

	let { group }: { group: Group } = $props();

	if (!Project.get()!.types.some(type => type.name === "Sticky Note")) {
		Project.get()!.types.push(
			new ItemType({
				name: "Sticky Note",
				icon: "StickyNote",
				attributes: [
					new AttributeDefinition({ name: "Name", type: AttributeType.fromName("shortText") }),
					new AttributeDefinition({ name: "Content", type: AttributeType.fromName("longText") }),
					new AttributeDefinition({ name: "Color", type: AttributeType.fromName("color") }),
					new AttributeDefinition({ name: "x", type: AttributeType.fromName("number"), hidden: true }),
					new AttributeDefinition({ name: "y", type: AttributeType.fromName("number"), hidden: true }),
					new AttributeDefinition({ name: "width", type: AttributeType.fromName("number"), hidden: true }),
					new AttributeDefinition({ name: "height", type: AttributeType.fromName("number"), hidden: true }),
				],
			}),
		);
	}

	let contextMenu: ContextMenu;

	let notes: Note[] = $derived(
		group
			.dfsItems()
			.filter(item => item.type.name === "Sticky Note")
			.map(note => ({
				content: "",
				color: Color.white,
				box: Rectangle.fromXYWH({
					x: (note.attributes.x as NumberAttribute).value,
					y: (note.attributes.y as NumberAttribute).value,
					width: (note.attributes.width as NumberAttribute).value,
					height: (note.attributes.height as NumberAttribute).value,
				}),
			})),
	);

	function newNote(event: MouseEvent) {
		const item = new Item(
			Project.get()!.types.find(type => type.name === "Sticky Note")!,
			{
				Name: new StringAttribute(`Sticky Note ${uniqueId()}`),
				Content: new StringAttribute(""),
				x: new NumberAttribute(event.x),
				y: new NumberAttribute(event.y),
				width: new NumberAttribute(200),
				height: new NumberAttribute(200),
			},
			{ hidden: true },
		);
		group.addChild(item);
		contextMenu.close();
	}
</script>

<InfiniteCanvas oncontextmenu={event => contextMenu.openAtMouse(event)}>
	{#each notes as note, index}
		<StickyNote bind:note={notes[index]} />
	{/each}
</InfiniteCanvas>

<ContextMenu bind:this={contextMenu}>
	<button onmousedown={newNote}>
		<Icon name="CirclePlus" />
		New Note
	</button>
</ContextMenu>
