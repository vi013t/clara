<script lang="ts">
	import { onMount } from "svelte";
	import type { Node } from "../../api/data/database.svelte";
	import { Point2D, type Point2DLike } from "../../api/math/matrix.svelte";
	import { Project } from "../../api/project.svelte";
	import { Camera } from "../../api/ui/camera.svelte";
	import { assignedLater } from "../../api/util/utils.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import ColorPaletteIcon from "../icons/ColorPaletteIcon.svelte";
	import EyeIcon from "../icons/EyeIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import HexagonIcon from "../icons/HexagonIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import ReticleIcon from "../icons/ReticleIcon.svelte";
	import ScaleIcon from "../icons/ScaleIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import TreeIcon from "../icons/TreeIcon.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import LittleButton from "../widgets/LittleButton.svelte";
	import CameraView from "./CameraView.svelte";

	let tree = Project.get()!.database;
	let nodes = $derived(tree.dfs());
	let items = $derived(nodes.filter(node => node.isLeaf()));
	let groups = $derived(nodes.filter(node => node.isBranch()));

	// let edges = $derived(Project.get()!.database.relations());
	// let edgeElements = $derived(
	// 	edges.map(edge =>
	// 		createEdge(
	// 			tree.find(node => node.data.id === edge.from)!.outline.shape.center,
	// 			tree.find(node => node.data.id === edge.to)!.outline.shape.center,
	// 		),
	// 	),
	// );

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

		// for (let child of edgeElements.flat()) {
		// 	edgesSVG.appendChild(child);
		// }
	});

	let edgesSVG = $state(assignedLater<SVGElement>());

	onMount(() => {
		let parentBox = edgesSVG.parentElement!.parentElement!.getBoundingClientRect();
		edgesSVG.style.width = `${parentBox.width}px`;
		edgesSVG.style.height = `${parentBox.height}px`;
	});

	let clickedNode: Node | null = $state(null);

	let camera = $state(new Camera());

	function onmousemove(event: MouseEvent) {
		if (!clickedNode) return;

		let delta: [number, number] = [event.movementX * camera.getScale().x, event.movementY * camera.getScale().y];

		// Make sure the node being moved doesn't intersect a sibling (cousin, technically)
		delta = clickedNode.getCollisionConstrainedShift(delta);

		// Make sure the node being moved isnt trying to escape its parent
		if (clickedNode.parent?.outline.isVisible) {
			const parentCircle = clickedNode.parent!.outline.shape;
			delta = clickedNode.outline.shape.getConstrainedShift(delta, parentCircle, 2);
		}

		// 3. Apply the final "safe" movement
		if (delta[0] !== 0 || delta[1] !== 0) {
			clickedNode.shift(delta);
		}
	}

	let cameraScale = $derived(camera.getScale().x);
	center();

	let canPan = $derived(!clickedNode);
	let groupContextMenu: ContextMenu;
	tree.outline;
</script>

<svelte:document onmouseup={() => (clickedNode = null)} {onmousemove} />

<section class="graph">
	<CameraView bind:camera {canPan}>
		{#each groups as group}
			{#if group.outline.isVisible}
				<div
					class={["group", clickedNode === group && "active"]}
					style:left="{group.outline.shape.center.x}px"
					style:top="{group.outline.shape.center.y}px"
					style:width="{group.outline.shape.radius * 2}px"
					style:height="{group.outline.shape.radius * 2}px"
					style:border-width="{cameraScale}px"
					style:font-size="{0.05 * group.outline.shape.radius}px"
					style:background-color={`${group.outline.color}`}
				>
					<span
						tabindex="0"
						role="tree"
						oncontextmenu={event => groupContextMenu.openAtMouse(event)}
						onmousedown={() => (clickedNode = group)}
					>
						{group.name}
					</span>
				</div>
			{/if}
		{/each}
		{#each items as item}
			<button
				aria-label="Node"
				onmousedown={() => (clickedNode = item)}
				class="node"
				style:background-color={clickedNode === item ? "#f38ba8" : undefined}
				style:--text="'{item.attributes.name}'"
				style:left="{item.outline.shape.center.x}px"
				style:top="{item.outline.shape.center.y}px"
				style:width="{item.outline.shape.radius * 2}px"
				style:height="{item.outline.shape.radius * 2}px"
				style:font-size="{item.outline.shape.radius * 2}px"
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
