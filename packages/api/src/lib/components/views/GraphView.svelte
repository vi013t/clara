<script lang="ts">
	import { ContextMenu } from "@clara/api/components";
	import LittleButton from "../widgets/LittleButton.svelte";
	import CameraView from "./CameraView.svelte";
	import { Project } from "@clara/api/project";
	import { Camera } from "@clara/api/camera";
	import { type Node } from "@clara/api/database";
	import { Icon } from "@clara/api/components";

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
				style:background-color={clickedNode === item ? "var(--red)" : undefined}
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
		<LittleButton icon="Settings" style="border: 1px solid var(--border)" />
		<LittleButton icon="Locate" onmousedown={center} style="border: 1px solid var(--border)" />
	</div>
</section>

<ContextMenu bind:this={groupContextMenu}>
	<button>
		<Icon name="FolderPen" size={1.2} />
		<span>Rename group</span>
	</button>
	<button>
		<Icon name="PackagePlus" size={1.2} />
		<span>Add subgroup</span>
	</button>
	<button>
		<Icon name="Plus" size={1.2} />
		<span>Add item</span>
	</button>
	<button>
		<Icon name="Table2" size={1.2} />
		<span>Open in view</span>
		<Icon name="ChevronRight" style="margin-left: auto;" />
		<ContextMenu>
			<button>
				<Icon name="FolderTree" size={1.2} />
				<span>Hierarchy</span>
			</button>
			<button>
				<Icon name="Table2" size={1.2} />
				<span>Spreadsheet</span>
			</button>
		</ContextMenu>
	</button>
	<hr />
	<button>
		<Icon name="Focus" size={1.2} />
		<span>Focus</span>
	</button>
	<button>
		<Icon name="Palette" size={1.2} />
		<span>Change color</span>
	</button>
	<div>
		<Icon name="Hexagon" size={1.2} />
		<span>Change shape</span>
		<Icon name="ChevronRight" style="margin-left: auto;" />
		<ContextMenu>
			<button>
				<Icon name="Circle" size={1.2} />
				<span>Circle</span>
			</button>
			<button>
				<Icon name="Square" size={1.2} />
				<span>Rectangle</span>
			</button>
		</ContextMenu>
	</div>
	<button>
		<Icon name="Scaling" size={1.2} />
		<span>Resize outline</span>
	</button>
	<button>
		<Icon name="EyeOff" size={1.2} />
		<span>Hide outline</span>
	</button>
	<button>
		<Icon name="EyeOff" size={1.2} />
		<span>Hide group</span>
	</button>
	<button>
		<Icon name="EyeOff" size={1.2} />
		<span>Hide others</span>
	</button>
	<hr />
	<button>
		<Icon name="Trash2" size={1.2} />
		<span style:color="var(--red)">Delete group</span>
	</button>
</ContextMenu>

<style>
	.group {
		position: absolute;
		transform: translate(-50%, -50%);
		width: calc(var(--radius) * 2);
		height: calc(var(--radius) * 2);
		border: 1px solid var(--border);
		border-radius: 50%;

		&:has(span:hover),
		&.active {
			border: 1px solid var(--red);

			span {
				color: var(--red);
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
			color: var(--foreground);
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
		background-color: var(--indigo);
		cursor: move;

		&::after {
			content: var(--text);
			white-space: nowrap;
			top: 125%;
			position: absolute;
			color: var(--foreground);
		}

		&:hover {
			background-color: var(--red);
		}
	}
</style>
