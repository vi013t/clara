<script lang="ts">
	import CloseIcon from "../icons/CloseIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import ContextMenu from "../ContextMenu.svelte";
	import BookIcon from "../icons/BookIcon.svelte";
	import PersonIcon from "../icons/PersonIcon.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import LocationIcon from "../icons/LocationIcon.svelte";
	import SplitHorizontalIcon from "../icons/SplitHorizontalIcon.svelte";
    import Pane from "./Pane.svelte";
	import TreeView from "../views/TreeView.svelte";
	import { views, type Dataset, type View } from "../../api/tree";
	import { project } from "../../api/project.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import SpreadsheetView from "../views/SpreadsheetView.svelte";

    let { 
        width = "500px",
        height = "1000px",
        background = "#1e1e2e",
        subpane = false,
        onclose = () => {}
    }: {
        width?: string,
        height?: string;
        background?: string;
        subpane?: boolean
        onclose?: () => void
    } = $props();

    let dragging = $state("none");

    let datasets: Dataset[] = $state(project().datasets);
    let tabs: TreeView[] = $state([]);
    let view: View = $state("hierarchy");

    function drag(side: string) {
        return function() {
            dragging = side;
        }
    }

    function stopDrag() {
        dragging = "none";
    }

    let newTabContextMenu: ContextMenu = $state(null!);
    let paneSettingsMenu: ContextMenu = $state(null!);
    let newTabButton: HTMLElement = $state(null!);

    let masterHeight = $state(`${parseInt(height) / 2}px`);
    let masterWidth = $state(`${parseInt(width) / 2}px`);

    function onmousemove(event: MouseEvent) {
        if (dragging === "right") {
            masterWidth = `${parseInt(masterWidth) + event.movementX}px`
        }
        else if (dragging === "bottom") {
            masterHeight = `${parseInt(masterHeight) + event.movementY}px`
        }
    }

    function createTab() {
        return function() {
            newTabContextMenu.close();
        }
    }

    let selectedTabIndex = $state(0);

    function clickTab(index: number) {
        return function() {
            selectedTabIndex = index;
        }
    }

    function closeTab(index: number) {
        return function() {
            tabs = tabs.filter((_element, tabIndex) => tabIndex !== index);
            if (tabs.length === 0) {
                isMasterPaneAlive = false;
                onclose();
            }
        }
    }

    function closePane() {
        isMasterPaneAlive = false;
        onclose();
    }

    let isMasterPaneAlive = $state(true);
    let isChildPaneAlive = $state(false);
    
    let splitDirection: "vertical" | "horizontal" | null = $state(null);

    function splitHorizontal() {
        splitDirection = "horizontal";
        isChildPaneAlive = true;
        paneSettingsMenu.close();
    }

    function splitVertical() {
        splitDirection = "vertical";
        isChildPaneAlive = true;
        paneSettingsMenu.close();
    }

    function setView(name: View) {
        return function() {
            paneSettingsMenu.close();
            view = name;
        }
    }

    $inspect(width);
</script>

<svelte:document onmouseup={stopDrag} {onmousemove}/>

<section 
    class={{ "pane-wrapper": true }}
    style:flex-direction={splitDirection === "horizontal" ? "row" : "column"}
>
    <section 
        class="pane"
        style:max-width={isMasterPaneAlive ? "100vmax" : "0px"}
        style:height={splitDirection === "vertical" && isChildPaneAlive ? masterHeight : "100%"}
        style:width={splitDirection === "horizontal" && isChildPaneAlive ? masterWidth : "100%"}
    >
        <div class="tabs">
            {#each datasets as dataset, index}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div style:background class={{ tab: true, selected: selectedTabIndex === index }} onclick={clickTab(index)}>
                    <span><dataset.icon stroke="#cdd6f4" style="width: 1rem; height: 1rem;"/> {dataset.name}</span>
                    <button onclick={closeTab(index)}>
                        <CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
                    </button>
                </div>
            {/each}
            <div class="new-tab-wrapper">
                <button class="new-tab" onmousedown={() => newTabContextMenu.toggle()} bind:this={newTabButton}>
                    <PlusIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
                </button>
                <ContextMenu bind:this={newTabContextMenu} top="100%" left="0px">
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
                    <hr />
                    <button>
                        <CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                        <span>New Dataset</span>
                    </button>
                </ContextMenu>
            </div>

            <div class="controls">
                <button onmousedown={() => paneSettingsMenu.toggle()}>
                    <GearIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
                </button>
                {#if subpane || splitDirection}
                    <button onclick={closePane}>
                        <CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
                    </button>
                {/if}
                <ContextMenu bind:this={paneSettingsMenu} top="100%" left="0px">
                    {#each Object.entries(views) as [name, info]}
                        <button disabled={view === name} onmousedown={setView(name as View)}>
                            <info.icon stroke={view === name ? "#6c7086" : "#cdd6f4"} style="width: 1rem; height: 1rem;" />
                            <span>View as {name}</span>
                        </button>
                    {/each}
                    <hr />
                    <button onclick={splitHorizontal}>
                        <SplitHorizontalIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
                        <span>Split Horizontally</span>
                    </button>
                    <button onclick={splitVertical}>
                        <SplitHorizontalIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem; rotate: 90deg;" />
                        <span>Split Vertically</span>
                    </button>
                </ContextMenu>
            </div>
        </div>

        <div class="content" style:background>
            {#each datasets as dataset, index}
                <div style="display: {index === selectedTabIndex ? "contents" : "none"}">
                    {#if view === "hierarchy"}
                        <TreeView tree={dataset.data} bind:this={tabs[index]} LeafIcon={dataset.icon} />
                    {:else if view === "spreadsheet"}
                        <SpreadsheetView dataset={dataset} />
                    {/if}
                </div>
            {/each}
        </div>

        <div onmousedown={drag("right")} class={{ drag: true, right: true, dragging: dragging === "right" }}></div>
        <div onmousedown={drag("bottom")} class={{ drag: true, bottom: true, dragging: dragging === "bottom" }}></div>
    </section>

    {#if splitDirection}
        <Pane subpane onclose={() => isChildPaneAlive = false} />
    {/if}
</section>

<style>
    .pane-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .pane {
        position: relative;
        display: flex;
        flex-direction: column;
        border: 1px solid #313244;
        overflow: hidden;
    }

    .content {
        background-color: #1e1e2e;
        border-top: 1px solid #313244;
        flex-grow: 1;
        padding: 1rem;
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
        height: 2.5rem;
        display: flex;
        align-items: flex-end;
        padding-left: 1rem;
    }

    .controls {
        position: relative;
        display: flex;
        margin-left: auto;
        height: 100%;
        align-items: center;

        > button {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.5rem;
            --stroke: #cdd6f4;
            margin-top: auto;
            margin-bottom: auto;
            margin-right: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;

            &:last-child:hover {
                --stroke: #181825;
                background-color: #f38ba8;
            }

            &:not(:last-child):hover {
                --stroke: #181825;
                background-color: #b4befe;
            }
        }
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
        height: 85%;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        border: 1px solid #313244;
        transform: translateY(1px);
        border-bottom: none;
        color: #cdd6f4;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        justify-content: space-between;
        user-select: none;
        background-color: #181825;

        &:not(.selected) {
            filter: brightness(70%);
            transform: initial;
            cursor: pointer;
        }

        > span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
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

    .drag {
        position: absolute;

        &:hover:not(.dragging) {
            background-color: #313244;
        }

        &.dragging {
            background-color: #b4befe;
        }

        &.bottom {
            width: 100%;
            height: 2px;
            bottom: -1px;
            left: 0px;
            cursor: ns-resize;
        }

        &.right {
            height: 100%;
            width: 2px;
            top: 0px;
            right: -1px;
            cursor: ew-resize;
        }
    }

</style>