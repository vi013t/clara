<script lang="ts">
	import type { Snippet } from "svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";
	import { stopImmediatePropagation } from "svelte/legacy";

    let { 
        title = undefined, 
        width = "25rem", 
        children = undefined 
    }: { 
        title?: string, 
        width?: string, 
        children?: Snippet 
    } = $props();

    let dragging = $state("none");

    function drag(side: string) {
        return function() {
            dragging = side;
        }
    }

    function stopDrag() {
        dragging = "none";
    }
</script>

<svelte:document onmouseup={stopDrag} />

<section style:width>
    <div onmousedown={drag("left")} class={{ drag: true, left: true, dragging: dragging === "left" }}></div>
    <div class="tab">
        <span>{title ?? ""}</span>
        <button>
            <CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
        </button>
    </div>
    {@render children?.()}
</section>

<style>
    section {
        background-color: #1e1e2e;
        color: #cdd6f4;
        padding: 2rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        border: 1px solid #313244;
        border-left: none;
    }

    .drag.left {
        height: 100%;
        width: 2px;
        position: absolute;
        top: 0px;
        left: -1px;
        cursor: ew-resize;

        &:hover:not(.dragging) {
            background-color: #313244;
        }

        &.dragging {
            background-color: #b4befe;
        }
    }

    .tab {
        position: absolute;
        width: 13rem;
        height: 2.25rem;
        top: 0px;
        left: 0px;
        transform: translate(-1px, -100%);
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        border: 1px solid #313244;
        background-color: #1e1e2e;
        border-bottom: none;
        color: #cdd6f4;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-right: 0.5rem;
        justify-content: space-between;

        > button {
            display: flex;
            align-items: center;
            justify-content: center;
            --stroke: #cdd6f4;
            padding: 0.25rem;
            border-radius: 0.25rem;

            &:hover {
                --stroke: #181825;
                background-color: #f38ba8;
            }
        }
    }
</style>