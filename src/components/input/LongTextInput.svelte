<script lang="ts">
	let { value = $bindable(), openEditor }: { value: string | null; openEditor: (value: string) => void } = $props();
</script>

<button onmousedown={() => openEditor(value ?? "")}>Open in Editor</button>

<style>
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
	}
</style>
