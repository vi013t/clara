<script lang="ts">
	import { onMount } from "svelte";
	import ContextMenu from "../../../../api/src/lib/components/menus/ContextMenu.svelte";
	import LittleButton from "../widgets/LittleButton.svelte";
	import CameraView from "./CameraView.svelte";
	import { Project } from "@wallflower/api/project";
	import {
		ArrowIcon,
		ColorPaletteIcon,
		EyeIcon,
		GearIcon,
		HexagonIcon,
		PackageIcon,
		PlusIcon,
		RenameIcon,
		ReticleIcon,
		ScaleIcon,
		SpreadsheetIcon,
		TrashIcon,
		TreeIcon,
	} from "@wallflower/api/icons";
	import { Camera } from "@wallflower/api/camera";
	import { type Node } from "@wallflower/api/database";
	import { Point2D, type Point2DLike } from "@wallflower/api/math";

	let tree = Project.get()!.database;
	let items = $derived(tree.dfsItems());
	let groups = $derived(tree.dfsGroups());

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
</style>
