<script lang="ts">
	import { ContextMenu, Icon, InfiniteCanvas } from "@clara/api/components";
	import { Item, type Group } from "@clara/api/database";
	import { Color, NumberAttribute, StringAttribute } from "@clara/api/attribute";
	import StickyNote, { type Note } from "./StickyNote.svelte";
	import { Project } from "@clara/api/project";
	import { Rectangle } from "@clara/api/math";
	import { uniqueId } from "@clara/api/utils";
	import { EntriesAttribute } from "../../../data/attribute/primitive.svelte.ts";

	let { item }: { item: Item } = $props();

	let contextMenu: ContextMenu;

	function ensureNotes() {
		if (!item.attributes.Notes) {
			item.attribute("Notes").value = new EntriesAttribute([]);
		}
	}

	ensureNotes();

	$effect(() => {
		ensureNotes();
	});

	let notes: Note[] = $derived(
		item
			.attribute("Notes")
			.valueAs<EntriesAttribute>()!
			.entries.map(entry => {
				const x = entry.attribute("X").valueAs<NumberAttribute>()!.value;
				const y = entry.attribute("Y").valueAs<NumberAttribute>()!.value;
				const width = entry.attribute("Width").valueAs<NumberAttribute>()!.value;
				const height = entry.attribute("Height").valueAs<NumberAttribute>()!.value;
				const color = entry.attribute("Color").valueAs<Color>()!;
				const content = entry.attribute("Content").valueAs<StringAttribute>()!.value;
				return {
					color,
					content,
					box: Rectangle.fromXYWH({ x, y, width, height }),
				};
			}),
	);

	function newNote(event: MouseEvent) {
		const note = new Item(
			Project.get()!.types.find(type => type.name === "Sticky Note")!,
			{
				Name: new StringAttribute(`Sticky Note ${uniqueId()}`),
				Content: new StringAttribute(""),
				X: new NumberAttribute(event.x),
				Y: new NumberAttribute(event.y),
				Width: new NumberAttribute(200),
				Height: new NumberAttribute(200),
				Color: Color.hex("#f38ba8"),
			},
			{ hidden: true },
		);
		Project.get()!.database.addChild(note);
		item.attribute("Notes").valueAs<EntriesAttribute>()!.values.push(note.id);

		contextMenu.close();
	}
</script>

<InfiniteCanvas oncontextmenu={(event: MouseEvent) => contextMenu.openAtMouse(event)}>
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
