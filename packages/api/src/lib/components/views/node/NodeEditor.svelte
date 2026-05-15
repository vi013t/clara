<script lang="ts">
	import { nodeTypeColors, type NodeInstance } from "@clara/api/attribute";
	import { Camera } from "@clara/api/camera";
	import { InfiniteCanvas, Node } from "@clara/api/components";

	let camera: Camera = $state(new Camera());
	let canPan = $state(true);

	let { nodes = $bindable() }: { nodes: NodeInstance[] } = $props();

	let edges = $derived(
		nodes
			.map(node =>
				Object.entries(node.outputs)
					.filter(([name, argument]) => argument.type === "node")
					.map(
						([name, argument]) =>
							[node, name, argument.node!.outputName, argument.node!.node] as [NodeInstance, string, string, NodeInstance],
					),
			)
			.flat(),
	);

	let nodeElements: Node[] = $state([]);

	let svg: SVGElement | null = $state(null);

	let updateCounter = $state(0);

	let curves: [string, string][] = $derived.by(() => {
		updateCounter;

		return edges.map(([left, outputName, inputName, right]) => {
			let fromIndex = nodes
				.map((node, index) => [node, index] as [NodeInstance, number])
				.find(([node, _index]) => node.id === left.id)?.[1];
			let toIndex = nodes
				.map((node, index) => [node, index] as [NodeInstance, number])
				.find(([node, _index]) => node.id === right.id)?.[1];

			if (fromIndex === undefined || toIndex === undefined || !nodeElements[fromIndex] || !nodeElements[toIndex] || !svg) {
				return ["", ""];
			}

			const from = nodeElements[fromIndex];
			const to = nodeElements[toIndex];

			const [from_x, from_y] = from.outputPosition(svg, outputName);
			const [to_x, to_y] = to.inputPosition(svg, inputName);

			const dx = to_x - from_x;
			const curve = Math.max(80, Math.abs(dx) * 0.5);

			return [
				`
                    M ${from_x} ${from_y}
                    C ${from_x + curve} ${from_y}
                    ${to_x - curve} ${to_y}
                    ${to_x} ${to_y}
                `,
				nodeTypeColors[left.type.outputs[outputName]!.type],
			];
		});
	});
</script>

<section class="node-editor">
	<div class="gradient"></div>
	<svg bind:this={svg}>
		{#each curves as [d, stroke]}
			<path {d} style:stroke class="edge" />
		{/each}
	</svg>
	<InfiniteCanvas bind:camera {canPan} onupdate={() => updateCounter++}>
		{#each nodes as _node, index}
			<Node bind:node={nodes[index]} bind:this={nodeElements[index]} bind:canPan {camera} onmove={() => updateCounter++} />
		{/each}
	</InfiniteCanvas>
</section>

<style>
	.gradient {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 1rem;
		background-image: linear-gradient(to bottom, var(--background), var(--background-darker));
	}

	section {
		width: 100%;
		height: 100%;
		position: relative;
		background-color: var(--background-darker);
	}

	.edge {
		fill: none;
		stroke: var(--indigo);
		stroke-width: 3;
	}

	svg {
		pointer-events: none;
		position: absolute;
		overflow: visible;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
	}
</style>
