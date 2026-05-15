<script lang="ts" module>
	import { Color } from "@clara/api/attribute";
	import { Rectangle } from "@clara/api/math";

	export type SerializedNote = {
		color: string;
		content: string;
		box: { x: number; y: number; width: number; height: number };
	};

	export type Note = {
		color: Color;
		content: string;
		box: Rectangle;
	};
</script>

<script lang="ts">
	let { note = $bindable() }: { note: Note } = $props();
</script>

<div
	style:left="{note.box.left}px"
	style:top="{note.box.top}px"
	style:width="{note.box.width}px"
	style:height="{note.box.height}px"
	style:background={note.color.hex}
	contenteditable
	spellcheck="false"
	autocapitalize="off"
	style:rotate="{Math.random() * 10}deg"
	bind:textContent={note.content}
></div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Pangolin&display=swap");

	div {
		position: absolute;
		color: black;
		font-family: "Pangolin", cursive;
		padding: 1rem;
		cursor: text;
	}
</style>
