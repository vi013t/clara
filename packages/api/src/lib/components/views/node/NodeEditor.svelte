<script lang="ts">
	import { Camera } from "@clara/api/camera";
	import { CameraView, Node, type NodeInstance } from "@clara/api/components";

	let camera: Camera = $state(new Camera());
	let canPan = $state(false);

	let { nodes = $bindable() }: { nodes: NodeInstance[] } = $props();

	let edges = $derived(
		nodes.map(node => [node.inputs, node.outputs] as [{ [key: string]: NodeInstance }, { [key: string]: NodeInstance }]),
	);
</script>

<section class="node-editor">
	<CameraView bind:camera {canPan}>
		{#each nodes as node}
			<Node {node} />
		{/each}
	</CameraView>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
		background-color: var(--background-darker);
	}
</style>
