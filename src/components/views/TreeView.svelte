<script lang="ts">
	import { type TreeNode, type TreeNodeData } from "../../api/tree";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import EllipsisIcon from "../icons/EllipsisIcon.svelte";
    import TreeView from "./TreeView.svelte";

    let { tree }: { tree: TreeNode<TreeNodeData> } = $props();
</script>

<button class="node">
    {#if tree.children.length !== 0}
        <ArrowIcon stroke="white" style="width: 1rem; height: 1rem; rotate: 180deg;" />
    {/if}
    {#if typeof tree.data !== "string"}
        <tree.data.icon stroke="white" style="width: 1rem; height: 1rem;" />
        {tree.data.text}
    {:else}
        {tree.data}
    {/if}
</button>

{#if tree.children.length !== 0}
    <ul>
        {#each tree.children as child}
            <li><TreeView tree={child} /></li>
        {/each}
    </ul>
{/if}

<style>
    li {
        padding-left: 1.5rem;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: -0.25rem;
            top: 1rem;
            transform: translateY(-50%);
            background-color: #b4befe;
            border-radius: 50%;
            width: 0.5rem;
            height: 0.5rem;
        }
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
        margin-bottom: 1rem;
        position: relative;
        left: -7px;
        padding: 0.25rem;
        border-radius: 0.25rem;
        width: 100%;

        &:hover {
            background-color: #b4befe;
            color: #181825;
        }
    }
</style>