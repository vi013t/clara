<script lang="ts">
	import type { Icon } from "../../api/components";
	import { type DataRow, type TreeNode } from "../../api/tree";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
    import TreeView from "./TreeView.svelte";

    let { tree, LeafIcon }: { tree: TreeNode<DataRow>, LeafIcon: Icon } = $props();
</script>

<button class="node">
    {#if tree.children.length !== 0}
        <ArrowIcon stroke="white" style="width: 1rem; height: 1rem; rotate: 180deg;" />
    {:else}
        <LeafIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
    {/if}
    {tree.data["Name"]}
</button>

{#if tree.children.length !== 0}
    <ul>
        {#each tree.children as child}
            <li><TreeView tree={child} {LeafIcon} /></li>
        {/each}
    </ul>
{/if}

<style>
    li {
        padding-left: 1.25rem;
    }

    ul {
        list-style-type: none;
        border-left: 1px solid #45475a;
    }

    .node {
        color: #cdd6f4;
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

        &:hover {
            background-color: #b4befe;
            color: #181825;
        }
    }
</style>