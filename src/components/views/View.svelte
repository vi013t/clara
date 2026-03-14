<script lang="ts">
	import type { Snippet } from "svelte";
	import GraphIcon from "../icons/GraphIcon.svelte";
	import TreeIcon from "../icons/TreeIcon.svelte";

    let { children, view = $bindable("tree") }: { children: Snippet, view?: string } = $props();

    function selectView(viewName: string) {
        return function() {
            view = viewName
        }
    }
</script>

<section>
    <div class="views">
        <button onclick={selectView("tree")} class={{selected: view === "tree"}}>
            <TreeIcon stroke="var(--stroke)" style="width: 1.25rem; height: 1.25rem;" />
        </button>
        <button onclick={selectView("graph")} class={{selected: view === "graph"}}>
            <GraphIcon stroke="var(--stroke)" style="width: 1.25rem; height: 1.25rem;" />
        </button>
    </div>
    {@render children()}
</section>

<style>
    .views {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 9999;
        background-color: #181825;

        > * {
            color: #cdd6f4;
            display: flex;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            padding: 0.25rem;
            --stroke: #cdd6f4;

            &.selected {
                border: 1px solid #313244;
                background-color: #1e1e2e;
            }

            &:hover {
                background-color: #b4befe;
                color: #181825;
                --stroke: #181825;
            }
        }
    }

    section {
        border-right: 1px solid #313244;
        background-color: #181825;
        padding: 0.5rem;
        padding-left: 1.5rem;
        width: 20rem;
        display: flex;
        flex-direction: column;
        position: relative;
    }
</style>