<script lang="ts">
	import { isJsxChild } from "typescript";
	import type { Icon } from "../../api/components";
	import { type DataRow, type TreeNode } from "../../api/Data.svelte";
	import ContextMenu from "../ContextMenu.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import PackageIcon from "../icons/PackageIcon.svelte";
    import TreeView from "./HierarchyView.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import TreeIcon from "../icons/TreeIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";

    let { 
        tree, 
        LeafIcon, 
        hideRoot = false,
        subtree = false,
        rightClick = onRightClick
    }: { 
        tree: TreeNode<DataRow>, 
        LeafIcon: Icon, 
        hideRoot?: boolean,
        subtree?: boolean,
        rightClick?: (event: MouseEvent) => void
    } = $props();

    let expanded = $state(hideRoot);

    function toggle(event: MouseEvent) {
        if (event.button !== 0) return;
        if (event.composedPath().some(element => "classList" in element && (element as HTMLElement).classList.contains("node-name"))) {
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

    function onRightClick(event: MouseEvent) {
        event.preventDefault();
        menuTop = `${event.y}px`;
        menuLeft = `${event.offsetX + 20}px`; 
        console.log(menuTop, menuLeft);
        rightClickMenu!.open();
    }
</script>

{#if !hideRoot || subtree}
    <button class="node" onmousedown={toggle} oncontextmenu={rightClick}>
        {#if tree.isGroup}
            <PackageIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
        {:else}
            <LeafIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
        {/if}
        <span 
            class="node-name"
            contenteditable
            bind:textContent={tree.data["Name"]}
            onkeypress={onNameKeypress}
            spellcheck="false"
        >
        </span>
        {#if tree.isGroup}
            <ArrowIcon stroke="var(--arrow)" style="width: 1rem; transition: rotate 0.1s; height: 1rem; rotate: {expanded ? "180deg" : "90deg"};" />
        {/if}
    </button>
{/if}

{#if tree.children.length !== 0}
    <ul 
        class={{ expanded }} 
        style:border-left={hideRoot ? "none" : "1px solid #45475a"}
    >
        {#each tree.children as child (child.data.id)}
            <li><TreeView tree={child} {LeafIcon} subtree rightClick={rightClick} /></li>
        {/each}
    </ul>
{/if}

{#if !subtree}
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
{/if}

<style>
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

            &:hover, &:focus {
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