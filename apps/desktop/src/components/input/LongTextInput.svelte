<script lang="ts">
	import { RichText, type AttributeContext } from "../../api/data/attribute/attribute.svelte";

	let {
		openEditor,
		context,
		value = $bindable(),
	}: { value: RichText; context: AttributeContext; openEditor: (doc: RichText) => void } = $props();
</script>

<button class={{ "settings-button": context === "settings" }} onmousedown={() => openEditor(value)}>Open in Editor</button>

<style>
	.settings-button {
		width: fit-content;
		padding: 0.5rem;
		width: 10rem;
		margin-left: auto;
	}

	button {
		color: #181825;
		padding: 0.25rem;
		width: 100%;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(to bottom right, #b4befe, #89b4fa);
		font-size: 0.85rem;
		box-shadow: 0px 0px 0.25rem black;
		transition: scale 0.05s;
		box-shadow: 0px 0px 0.25rem black;

		&:hover {
			scale: 103%;
		}
	}
</style>
