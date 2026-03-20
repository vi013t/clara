<script lang="ts">
	import { onMount } from "svelte";
	import { Point2D, type Point2DLike } from "../../api/math/matrix.svelte";
	import { assignedLater } from "../../api/util/utils.svelte";
	import CameraView from "./CameraView.svelte";
	import { Camera } from "../../api/ui/camera.svelte";
	import LittleButton from "../widgets/LittleButton.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import ReticleIcon from "../icons/ReticleIcon.svelte";
	import type { TreeNode } from "../../api/data/structure/tree.svelte";
	import { Project } from "../../api/project.svelte";
	import type { DataEntry } from "../../api/data/dataset.svelte";

	let tree = Project.get()!.database.ref().asTree();
	let nodes = $derived(tree.dfs());
	let leaves = $derived(nodes.filter(node => node.isItem));
	let branches = $derived(nodes.filter(node => node.isGroup));

	let edges = $derived(Project.get()!.database.ref().relations());
	let edgeElements = $derived(
		edges.map(edge =>
			createEdge(tree.find(node => node.data.id === edge.from)!.center, tree.find(node => node.data.id === edge.to)!.center),
		),
	);

	let nodeRadius = 8;

	function center() {
		camera.moveTo([0, 0]);
		camera.setScale(1);
	}

	function createEdge(pos1: Point2DLike, pos2: Point2DLike) {
		let point1 = new Point2D(pos1);
		let point2 = new Point2D(pos2);

		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		let angle = Math.atan((point2.y - point1.y) / (point2.x - point1.x));
		let radius = nodeRadius + 9;
		let signsX = point2.x > point2.x ? [-1, 1] : [1, -1];
		let signsY = point2.y > point2.y ? [-1, 1] : [1, -1];

		line.setAttribute("x1", `${point1.x + signsX[0] * nodeRadius * Math.cos(angle)}`);
		line.setAttribute("y1", `${point1.y + signsY[0] * nodeRadius * Math.sin(angle)}`);
		line.setAttribute("x2", `${point2.x + signsX[1] * radius * Math.cos(angle)}`);
		line.setAttribute("y2", `${point2.y + signsY[1] * radius * Math.sin(angle)}`);
		line.setAttribute("stroke-width", "2");
		line.setAttribute("marker-end", "url(#arrow)");
		line.setAttribute("class", "edge");

		return line;
	}

	$effect(() => {
		edgesSVG.innerHTML = "";
		const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

		const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
		marker.setAttribute("id", "arrow");
		marker.setAttribute("markerWidth", "10");
		marker.setAttribute("markerHeight", "10");
		marker.setAttribute("refX", "0");
		marker.setAttribute("refY", "3");
		marker.setAttribute("orient", "auto");
		marker.setAttribute("markerUnits", "userSpaceOnUse");

		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M0,0 L0,6 L9,3 z");
		path.setAttribute("fill", "context-stroke");

		marker.appendChild(path);
		defs.appendChild(marker);
		edgesSVG.appendChild(defs);

		for (let child of edgeElements.flat()) {
			edgesSVG.appendChild(child);
		}
	});

	let edgesSVG = $state(assignedLater<SVGElement>());

	onMount(() => {
		let parentBox = edgesSVG.parentElement!.parentElement!.getBoundingClientRect();
		edgesSVG.style.width = `${parentBox.width}px`;
		edgesSVG.style.height = `${parentBox.height}px`;
	});

	let clickedNode: TreeNode<DataEntry> | null = $state(null);

	let camera = $state(new Camera());

	function onmousemove(event: MouseEvent) {
		if (!clickedNode) return;
		// clickedNode.box.left += event.movementX * camera.getScale().x;
		// clickedNode.box.top += event.movementY * camera.getScale().y;
	}

	let cameraScale = $derived(camera.getScale().x);
</script>

<svelte:document onmouseup={() => (clickedNode = null)} {onmousemove} />

<section class="graph">
	<CameraView bind:camera>
		{#each branches as branch}
			{#if !branch.isRoot}
				<div
					class="group"
					style:left="{branch.center.x}px"
					style:top="{branch.center.y}px"
					style:width="{branch.size}px"
					style:height="{branch.size}px"
					style:--text="'{branch.data.name}'"
					style:border-width="{cameraScale}px"
					style:font-size="{branch.size / 40}px"
				></div>
			{/if}
		{/each}
		{#each leaves as leaf}
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				onmousedown={() => (clickedNode = leaf)}
				class="node"
				style:cursor={clickedNode === leaf ? "move" : "pointer"}
				style:background-color={clickedNode === leaf ? "#f38ba8" : "#b4befe"}
				style:--text="'{leaf.data.name}'"
				style:left="{leaf.center.x}px"
				style:top="{leaf.center.y}px"
			></button>
		{/each}

		<svg bind:this={edgesSVG}></svg>
	</CameraView>
	<div class="controls">
		<LittleButton Icon={GearIcon} style="border: 1px solid #313244" />
		<LittleButton Icon={ReticleIcon} onmousedown={center} style="border: 1px solid #313244" />
	</div>
</section>

<style>
	.group {
		background-color: rgba(0, 0, 0, 20%);
		position: absolute;
		transform: translate(-50%, -50%);
		width: calc(var(--radius) * 2);
		height: calc(var(--radius) * 2);
		border-radius: 50%;
		border: 1px solid #313244;

		&::after {
			content: var(--text);
			white-space: nowrap;
			top: 2%;
			left: 50%;
			transform: translate(-50%);
			position: absolute;
			color: #a6adc8;
			font-size: calc(var(--radius) / 20);
			font-size: inherit;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: center;
		}
	}

	section {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.controls {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.node {
		width: 20px;
		height: 20px;
		overflow: visible;
		border-radius: 50%;
		position: absolute;
		display: flex;
		justify-content: center;
		transform: translate(-50%, -50%);
		z-index: 99;

		&::after {
			content: var(--text);
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
		overflow: visible;
		pointer-events: stroke;

		:global(.edge) {
			stroke: #45475a;
			&:hover {
				stroke: #f38ba8;
			}
		}
	}
</style>
