<script lang="ts">
	import type { Snippet } from "svelte";
	import CloseIcon from "./icons/CloseIcon.svelte";
	import type { Icon } from "../api/components";
	import PlusIcon from "./icons/PlusIcon.svelte";
	import ContextMenu from "./ContextMenu.svelte";
	import BookIcon from "./icons/BookIcon.svelte";
	import PersonIcon from "./icons/PersonIcon.svelte";
	import ClockIcon from "./icons/ClockIcon.svelte";
	import { event } from "@tauri-apps/api";
	import PencilIcon from "./icons/PencilIcon.svelte";
	import CircledPlusIcon from "./icons/CircledPlusIcon.svelte";
	import LocationIcon from "./icons/LocationIcon.svelte";

    let { 
        tabs, 
        width = "25rem",
        background = "#1e1e2e",
        children 
    }: {
        tabs: { title: string; icon: Icon }[],
        width?: string,
        background?: string;
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

    let newTabContextMenu: ContextMenu = $state(null!);
    let newTabButton: HTMLElement = $state(null!);

    function onclick(event: MouseEvent) {
        if (
            newTabContextMenu && 
            !event.composedPath().includes(newTabContextMenu.element()) &&
            !event.composedPath().includes(newTabButton)
        ) {
            newTabContextMenu.close();
        }
    }
</script>

<svelte:document onmouseup={stopDrag} {onclick}/>

<section style:width>
    <div class="tabs">
        {#each tabs as tab}
            <div class="tab" style:background>
                <span><tab.icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;"/> {tab.title}</span>
                <button>
                    <CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
                </button>
            </div>
        {/each}
        <div class="new-tab-wrapper">
            <button class="new-tab" onclick={() => newTabContextMenu.open()} bind:this={newTabButton}>
                <PlusIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
            </button>
            <ContextMenu bind:this={newTabContextMenu} top="100%" left="0px">
                <button style="padding-left: 0.25rem;">
                    <PencilIcon stroke="#cdd6f4" style="width: 1.25rem; height: 1.25rem;" />
                    <span>Editor</span>
                </button>
                <button>
                    <BookIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                    <span>Plot Events</span>
                </button>
                <button>
                    <PersonIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                    <span>Characters</span>
                </button>
                <button style="padding-left: 0.35rem;">
                    <LocationIcon stroke="#cdd6f4" style="width: 1.1rem; height: 1.1rem;" />
                    <span>Locations</span>
                </button>
                <button>
                    <ClockIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                    <span>Timeline</span>
                </button>
                <hr />
                <button>
                    <CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                    <span>New Tab Type</span>
                </button>
            </ContextMenu>
        </div>
    </div>

    <div class="content">
        {@render children?.()}
    </div>

    <div onmousedown={drag("right")} class={{ drag: true, right: true, dragging: dragging === "right" }}></div>
</section>

<style>
    section {
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #313244;
        border-left: 1px solid #313244;
    }

    .content {
        background-color: #1e1e2e;
        height: 100%;
        border-top: 1px solid #313244;
    }

    .new-tab-wrapper {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .tabs {
        background-color: #11111b;
        width: 100%;
        height: 3rem;
        display: flex;
        align-items: flex-end;
        padding-left: 1rem;
    }

    .new-tab {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.5rem;
        --stroke: #cdd6f4;
        margin-top: auto;
        margin-bottom: auto;
        transform: translateY(0.25rem);
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            --stroke: #181825;
            background-color: #b4befe;
        }
    }

    .tab {
        width: 13rem;
        height: 2.5rem;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        border: 1px solid #313244;
        transform: translateY(1px);
        border-bottom: none;
        color: #cdd6f4;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-right: 0.5rem;
        justify-content: space-between;

        > span {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

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

    .drag.right {
        height: 100%;
        width: 2px;
        position: absolute;
        top: 0px;
        right: -1px;
        cursor: ew-resize;

        &:hover:not(.dragging) {
            background-color: #313244;
        }

        &.dragging {
            background-color: #b4befe;
        }
    }
</style>