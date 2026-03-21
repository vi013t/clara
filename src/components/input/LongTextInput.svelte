<script lang="ts">
	import { PrimitiveAttribute, type AttributeContext } from "../../api/data/attribute.svelte";

	let {
		openEditor,
		context,
		value = $bindable(),
	}: { value: PrimitiveAttribute<string> | null; context: AttributeContext; openEditor: () => void } = $props();
</script>

{#if context === "settings"}
	<textarea
		bind:value={() => value?.value, content => (value = content ? new PrimitiveAttribute<string>(content) : null)}
	></textarea>
{/if}
<button class={{ "settings-button": context === "settings" }} onmousedown={openEditor}>Open in Editor</button>

<style>
	textarea {
		background-color: #181825;
		resize: none;
		width: 100%;
		height: 10rem;
		margin-bottom: 1rem;
		padding: 0.5rem;
		color: #cdd6f4;
		border-radius: 0.25rem;
	}

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
