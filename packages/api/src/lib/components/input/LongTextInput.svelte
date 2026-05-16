<script lang="ts">
	import type { AttributeContext, AttributeRef } from "@clara/api/attribute";
	import { AttributeTab, editor, SinglePane } from "@clara/api/ui";

	let {
		pane = $bindable(),
		context,
		attribute = $bindable(),
	}: {
		pane: SinglePane;
		attribute: AttributeRef;
		context: AttributeContext;
	} = $props();

	function openEditor(attribute: AttributeRef) {
		let tab = new AttributeTab(attribute, editor);
		pane.tabline.appendTab(tab);
		pane.selectedTabID = tab.id;
	}
</script>

<button class={{ "settings-button": context === "settings" }} onmousedown={() => openEditor(attribute)}>Open in Editor</button>

<style>
	.settings-button {
		width: fit-content;
		padding: 0.5rem;
		width: 10rem;
		margin-left: auto;
	}

	button {
		color: var(--background-dark);
		padding: 0.25rem;
		width: 100%;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(to bottom right, var(--indigo), var(--blue));
		font-size: 0.85rem;
		box-shadow: 0px 0px 0.25rem black;
		transition: scale 0.05s;
		box-shadow: 0px 0px 0.25rem black;

		&:hover {
			scale: 103%;
		}
	}
</style>
