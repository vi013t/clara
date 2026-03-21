<script lang="ts">
	import { onMount } from "svelte";
	import { Point2D, type Point2DLike } from "../../api/math/matrix.svelte";
	import { assignedLater } from "../../api/util/utils.svelte";
	import CameraView from "./CameraView.svelte";
	import { Camera } from "../../api/ui/camera.svelte";
	import LittleButton from "../widgets/LittleButton.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import ReticleIcon from "../icons/ReticleIcon.svelte";
	import type { TreeNode } from "../../api/data/graph/tree.svelte";
	import { Project } from "../../api/project.svelte";
	import type { DataEntry } from "../../api/data/dataset.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import EyeIcon from "../icons/EyeIcon.svelte";
	import HexagonIcon from "../icons/HexagonIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import ScaleIcon from "../icons/ScaleIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import TreeIcon from "../icons/TreeIcon.svelte";
	import ColorPaletteIcon from "../icons/ColorPaletteIcon.svelte";

	let tree = Project.get()!.database.ref().asTree();
	let nodes = $derived(tree.dfs());
	let leaves = $derived(nodes.filter(node => node.isItem));
	let branches = $derived(nodes.filter(node => node.isGroup));

	let edges = $derived(Project.get()!.database.ref().relations());
	let edgeElements = $derived(
		edges.map(edge =>
			createEdge(
				tree.find(node => node.data.id === edge.from)!.outline.shape.center,
				tree.find(node => node.data.id === edge.to)!.outline.shape.center,
			),
		),
	);

	let nodeRadius = 8;

	function center() {
		camera.moveTo([0, 0]);
		camera.setScale(8);
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

		let delta: [number, number] = [event.movementX * camera.getScale().x, event.movementY * camera.getScale().y];

		// Make sure the node being moved isnt trying to escape its parent
		delta = clickedNode.getCollisionConstrainedShift(delta);

		// Make sure the node being moved doesn't intersect a sibling (cousin, technically)
		const parentCircle = clickedNode.parent!.outline.shape;
		delta = clickedNode.outline.shape.getConstrainedShift(delta, parentCircle, 2);

		// 3. Apply the final "safe" movement
		if (delta[0] !== 0 || delta[1] !== 0) {
			clickedNode.shift(delta);
		}
	}

	let cameraScale = $derived(camera.getScale().x);
	center();

	let canPan = $derived(!clickedNode);
	let groupContextMenu: ContextMenu;
</script>

<svelte:document onmouseup={() => (clickedNode = null)} {onmousemove} />

<section class="graph">
	<CameraView bind:camera {canPan}>
		{#each branches as branch}
			{#if !branch.isRoot}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class={["group", clickedNode === branch && "active"]}
					style:left="{branch.outline.shape.center.x}px"
					style:top="{branch.outline.shape.center.y}px"
					style:width="{branch.outline.shape.radius * 2}px"
					style:height="{branch.outline.shape.radius * 2}px"
					style:border-width="{cameraScale}px"
					style:font-size="{0.05 * branch.outline.shape.radius}px"
					style:background-color={`${branch.outline.color}`}
				>
					<span oncontextmenu={event => groupContextMenu.openAtMouse(event)} onmousedown={() => (clickedNode = branch)}>
						{branch.data.name}
					</span>
				</div>
			{/if}
		{/each}
		{#each leaves as leaf}
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				onmousedown={() => (clickedNode = leaf)}
				class="node"
				style:background-color={clickedNode === leaf ? "#f38ba8" : undefined}
				style:--text="'{leaf.data.name}'"
				style:left="{leaf.outline.shape.center.x}px"
				style:top="{leaf.outline.shape.center.y}px"
				style:width="{leaf.outline.shape.radius * 2}px"
				style:height="{leaf.outline.shape.radius * 2}px"
				style:font-size="{leaf.outline.shape.radius * 2}px"
			></button>
		{/each}

		<svg bind:this={edgesSVG}></svg>
	</CameraView>
	<div class="controls">
		<LittleButton Icon={GearIcon} style="border: 1px solid #313244" />
		<LittleButton Icon={ReticleIcon} onmousedown={center} style="border: 1px solid #313244" />
	</div>
</section>

<ContextMenu bind:this={groupContextMenu}>
	<button>
		<RenameIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Rename group</span>
	</button>
	<button>
		<PackageIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Add subgroup</span>
	</button>
	<button>
		<PlusIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Add item</span>
	</button>
	<button>
		<SpreadsheetIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Open in view</span>
		<ArrowIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem; margin-left: auto; rotate: 90deg;" />
		<ContextMenu>
			<button>
				<TreeIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
				<span>Hierarchy</span>
			</button>
			<button>
				<SpreadsheetIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
				<span>Spreadsheet</span>
			</button>
		</ContextMenu>
	</button>
	<hr />
	<button>
		<ReticleIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Focus</span>
	</button>
	<button>
		<ColorPaletteIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Change color</span>
	</button>
	<div>
		<HexagonIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Change shape</span>
		<ArrowIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem; margin-left: auto; rotate: 90deg;" />
		<ContextMenu>
			<button>
				<HexagonIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
				<span>Circle</span>
			</button>
			<button>
				<HexagonIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
				<span>Rectangle</span>
			</button>
		</ContextMenu>
	</div>
	<button>
		<ScaleIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Resize outline</span>
	</button>
	<button>
		<EyeIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Hide outline</span>
	</button>
	<button>
		<EyeIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Hide group</span>
	</button>
	<button>
		<EyeIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Hide others</span>
	</button>
	<hr />
	<button>
		<TrashIcon stroke="#f38ba8" style="width: 1.2rem; height: 1.2rem;" />
		<span style:color="#f38ba8">Delete group</span>
	</button>
</ContextMenu>

<style>
	.group {
		position: absolute;
		transform: translate(-50%, -50%);
		width: calc(var(--radius) * 2);
		height: calc(var(--radius) * 2);
		border: 1px solid #313244;
		border-radius: 50%;

		&:has(span:hover),
		&.active {
			border: 1px solid #f38ba8;

			span {
				color: #f38ba8;
				width: fit-content;
			}
		}

		span {
			cursor: move;
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
		overflow: visible;
		border-radius: 50%;
		position: absolute;
		display: flex;
		justify-content: center;
		transform: translate(-50%, -50%);
		background-color: #b4befe;
		cursor: move;

		&::after {
			content: var(--text);
			white-space: nowrap;
			top: 125%;
			position: absolute;
			color: #a6adc8;
		}

		&:hover {
			background-color: #f38ba8;
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
