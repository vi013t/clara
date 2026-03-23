<script lang="ts">
	import { Group, Item, type Node } from "../../api/data/database.svelte";
	import { Project } from "../../api/project.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import HierarchyView from "./HierarchyView.svelte";

	let {
		entry,
		hideRoot = false,
		subtree = false,
		demo = false,
	}: {
		entry?: Node;
		hideRoot?: boolean;
		subtree?: boolean;
		demo?: boolean;
	} = $props();

	// svelte-ignore state_referenced_locally
	let expanded = $state(hideRoot || demo);
	// svelte-ignore state_referenced_locally
	if (!entry) entry = Project.get()!.database;

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
	let clickedNode = $state(false);

	function onRightClick(event: MouseEvent) {
		clickedNode = true;
		rightClickMenu!.openAtMouse(event);
	}

	function newGroup() {
		(entry as Group).addChild(new Group("New Group"));
		rightClickMenu?.close();
		expanded = true;
	}

	function newItem() {
		(entry as Group).addChild(new Item("New Item"));
		rightClickMenu?.close();
		expanded = true;
	}

	let name: HTMLSpanElement | null = $state(null);

	function rename() {
		rightClickMenu?.close();
		if (!name) return;

		name.focus();
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(name);
		range.collapse(false);
		selection?.removeAllRanges();
		selection?.addRange(range);
	}

	function deleteEntry() {
		entry!.delete();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section bind:this={nodeElement}>
	{#if !hideRoot || subtree}
		<button oncontextmenu={onRightClick} class={["node", clickedNode && "active"]} onmousedown={toggle}>
			{#if entry.isBranch()}
				<PackageIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			{:else}
				<entry.icon.component stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
			{/if}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span
				class="node-name"
				contenteditable
				bind:textContent={() => entry.name, name => entry.setName(name)}
				onkeypress={onNameKeypress}
				spellcheck="false"
				bind:this={name}
			></span>
			{#if entry.isBranch()}
				<ArrowIcon
					stroke="var(--arrow)"
					style="width: 1rem; transition: rotate 0.1s; height: 1rem; rotate: {expanded ? '180deg' : '90deg'};"
				/>
			{/if}
		</button>
	{/if}

	{#if entry.children.length !== 0}
		<ul
			class={{ expanded }}
			style:border-left={hideRoot ? "none" : "1px solid #45475a"}
			style:margin-top={subtree || !expanded ? "0px" : "0.5rem"}
		>
			{#each entry.sortedChildren as child (child.id)}
				<li style:padding-left={hideRoot && entry.isRoot ? "0px" : "1.25rem"}>
					<HierarchyView {demo} {hideRoot} entry={child} subtree />
				</li>
			{/each}
		</ul>
	{/if}

	<ContextMenu onclose={() => (clickedNode = false)} left={menuLeft} top={menuTop} bind:this={rightClickMenu}>
		{#if entry.isBranch()}
			<button onmousedown={newItem}>
				<CircledPlusIcon scale={0.85} />
				Create new item
			</button>
			<button onmousedown={newGroup}>
				<PackageIcon scale={0.85} />
				Create new group
			</button>
			{#if !entry.isRoot}
				<hr />
			{/if}
		{/if}
		{#if !entry.isRoot}
			<button onmousedown={rename}>
				<RenameIcon scale={0.85} />
				<span>Rename</span>
			</button>
			<button onmousedown={deleteEntry}>
				<TrashIcon stroke="#f38ba8" scale={0.85} />
				<span style="color: #f38ba8;">Delete</span>
			</button>
		{/if}
	</ContextMenu>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	ul {
		list-style-type: none;

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

		&:hover,
		&.active {
			--stroke: #181825;
			background-color: #b4befe;
			--arrow: #181825;
		}
	}
</style>
