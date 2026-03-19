<script lang="ts">
	import { onMount } from "svelte";
	import { GraphNode } from "../../api/data/structure/graph.svelte";
	import { Point2D, type Point2DLike } from "../../api/math/matrix.svelte";
	import { assignedLater } from "../../api/util/utils.svelte";
	import CameraView from "./CameraView.svelte";

	let { graph }: { graph: GraphNode<any> } = $props();

	let nodes = $derived(graph.dfs());
	let edges = $derived(graph.edges());
	let edgeElements = $derived(edges.map(edge => createEdge(edge.from.position, edge.to.position)));

	function createEdge(pos1: Point2DLike, pos2: Point2DLike) {
		let point1 = new Point2D(pos1);
		let point2 = new Point2D(pos2);

		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		line.setAttribute("x1", `${point1.x}`);
		line.setAttribute("y1", `${point1.y}`);
		line.setAttribute("x2", `${point2.x}`);
		line.setAttribute("y2", `${point2.y}`);
		line.setAttribute("stroke", "#888888");
		line.setAttribute("stroke-width", "2");

		return line;
	}

	$effect(() => {
		// const rect = edgesSVG.getBoundingClientRect();

		// edgesSVG.setAttribute("viewBox", `${-rect.width / 2} ${-rect.height / 2} ${rect.width} ${rect.height}`);

		edgesSVG.innerHTML = "";
		for (let child of edgeElements) {
			edgesSVG.appendChild(child);
		}
	});

	let edgesSVG = $state(assignedLater<SVGElement>());

	onMount(() => {
		let parentBox = edgesSVG.parentElement!.parentElement!.getBoundingClientRect();
		edgesSVG.style.width = `${parentBox.width}px`;
		edgesSVG.style.height = `${parentBox.height}px`;
	});
</script>

<section class="graph">
	<CameraView>
		{#each nodes as node}
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				class="node"
				style:left="{node.position.x}px"
				style:top="{node.position.y}px"
				style:--text="'{node.data.name}'"
			></button>
		{/each}

		<svg bind:this={edgesSVG}></svg>
	</CameraView>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
	}

	.node {
		background-color: #f38ba8;
		width: 1rem;
		height: 1rem;
		overflow: visible;
		border-radius: 50%;
		position: absolute;
		display: flex;
		justify-content: center;
		transform: translate(-50%, -50%);
		z-index: 99;

		&::after {
			content: var(--text);
			word-wrap: none;
			white-space: nowrap;
			top: 125%;
			position: absolute;
			color: #a6adc8;
		}
	}

	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
