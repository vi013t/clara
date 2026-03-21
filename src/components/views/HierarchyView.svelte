<script lang="ts">
	import type { IconComponent } from "../../api/ui/icons.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
	import HierarchyView from "./HierarchyView.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import type { DataEntry } from "../../api/data/dataset.svelte";
	import type { TreeNode } from "../../api/data/structure/tree.svelte";
	import { Project } from "../../api/project.svelte";

	let {
		tree,
		LeafIcon,
		hideRoot = false,
		subtree = false,
		demo = false,
		rightClick = onRightClick,
	}: {
		tree: TreeNode<DataEntry>;
		LeafIcon: IconComponent;
		hideRoot?: boolean;
		subtree?: boolean;
		demo?: boolean;
		rightClick?: (event: MouseEvent) => void;
	} = $props();

	// svelte-ignore state_referenced_locally
	let expanded = $state(hideRoot || demo);

	function toggle(event: MouseEvent) {
		if (event.button !== 0) return;
		if (
			event.composedPath().some(element => "classList" in element && (element as HTMLElement).classList.contains("node-name"))
		) {
			return;
		}
		expanded = !expanded;
	}

	function onNameKeypress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			(event.target as HTMLElement).blur();
		}
	}

	let menuTop: string = $state("");
	let menuLeft: string = $state("");
	let rightClickMenu: ContextMenu | null = $state(null);
	let nodeElement: HTMLElement;

	function onRightClick(event: MouseEvent) {
		rightClickMenu!.openAtMouse(event);
	}
</script>

<section bind:this={nodeElement}>
	{#if !hideRoot || subtree}
		<button class="node" onmousedown={toggle} oncontextmenu={rightClick}>
			{#if tree.isGroup}
				<PackageIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			{:else}
				<LeafIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			{/if}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span
				class="node-name"
				contenteditable
				bind:textContent={tree.data.name}
				onkeypress={onNameKeypress}
				spellcheck="false"
			></span>
			{#if tree.isGroup}
				<ArrowIcon
					stroke="var(--arrow)"
					style="width: 1rem; transition: rotate 0.1s; height: 1rem; rotate: {expanded ? '180deg' : '90deg'};"
				/>
			{/if}
		</button>
	{/if}

	{#if tree.children.length !== 0}
		<ul
			class={{ expanded }}
			style:border-left={hideRoot ? "none" : "1px solid #45475a"}
			style:margin-top={subtree || !expanded ? "0px" : "0.5rem"}
		>
			{#each tree.children as child (child.data.id)}
				<li><HierarchyView {demo} tree={child} {LeafIcon} subtree {rightClick} /></li>
			{/each}
		</ul>
	{/if}
	<ContextMenu left={menuLeft} top={menuTop} bind:this={rightClickMenu}>
		<button>
			<CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
			Create new item
		</button>
		<button>
			<PackageIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
			Create new group
		</button>
		<hr />
		<button>
			<RenameIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
			<span>Rename</span>
		</button>
		<button>
			<TrashIcon stroke="#f38ba8" style="width: 0.85rem; height: 0.85rem;" />
			<span style="color: #f38ba8;">Delete</span>
		</button>
	</ContextMenu>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	li {
		padding-left: 1.25rem;
	}

	ul {
		list-style-type: none;
		overflow: hidden;

		&:not(.expanded) {
			max-height: 0px;
		}

		&.expanded {
			max-height: 100vh;
		}
	}

	.node {
		color: var(--stroke);
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
		position: relative;
		left: -0.9rem;
		padding: 0.25rem;
		padding-left: 0.5rem;
		border-radius: 0.25rem;
		width: 100%;
		--stroke: #cdd6f4;
		--arrow: #9399b2;

		span {
			color: var(--stroke);
			border-radius: 0.25rem;
			padding-left: 0.25rem;
			padding-right: 0.25rem;
			width: fit-content;
			cursor: text;

			&:not(:focus, :active) {
				user-select: none;
			}

			&:hover,
			&:focus {
				background-color: rgba(0, 0, 0, 20%);
			}
		}

		&:hover {
			--stroke: #181825;
			background-color: #b4befe;
			--arrow: #181825;
		}
	}
</style>
