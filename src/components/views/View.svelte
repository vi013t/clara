<script lang="ts">
	import type { Snippet } from "svelte";
	import GraphIcon from "../icons/GraphIcon.svelte";
	import TreeIcon from "../icons/TreeIcon.svelte";
	import type { Icon } from "../../api/components";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import MarkdownIcon from "../icons/MarkdownIcon.svelte";
	import EyeIcon from "../icons/EyeIcon.svelte";

    export type View = "tree" | "graph" | "spreadsheet" | "markdown" | "preview"

    let { 
        children, 
        view = $bindable() ,
        views
    }: { 
        children: Snippet,
        view: string 
        views: View[]
    } = $props();

    const viewIcons: { [Key in View]: Icon } = {
        tree: TreeIcon,
        spreadsheet: SpreadsheetIcon,
        graph: GraphIcon,
        markdown: MarkdownIcon,
        preview: EyeIcon,
    }

    function selectView(viewName: string) {
        return function() {
            view = viewName
        }
    }
</script>

<section>
    <div class="views">
        {#each views as possibleView}
            {@const Icon = viewIcons[possibleView]}
            <button onclick={selectView(possibleView)} class={{selected: view === possibleView}}>
                <Icon stroke="var(--stroke)" style="width: 1.25rem; height: 1.25rem;" />
            </button>
        {/each}
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

        > * {
            color: #cdd6f4;
            display: flex;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            padding: 0.25rem;
            --stroke: #cdd6f4;

            &.selected {
                outline: 1px solid #313244;
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
        padding: 0.5rem;
        padding-left: 1.5rem;
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
    }
</style>