<script lang="ts">
	import ContextMenu from "./ContextMenu.svelte";
	import CircledPlusIcon from "./icons/CircledPlusIcon.svelte";
	import FolderIcon from "./icons/FolderIcon.svelte";
	import GearIcon from "./icons/GearIcon.svelte";
	import SaveIcon from "./icons/SaveIcon.svelte";
	import Popup from "./Popup.svelte";

    let projectMenu: ContextMenu;
    let projectSettingsPopup: Popup;
</script>

<section>
    <div class="wrapper">
        <button onmousedown={() => projectMenu.toggle()}>
            <FolderIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
        </button>
        <ContextMenu bind:this={projectMenu} bottom="100%" right="1.75rem">
            <button onmousedown={() => { projectSettingsPopup.open(); projectMenu.close() }}>
                <GearIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>Project settings</span>
            </button>
            <button>
                <SaveIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>Save project</span>
            </button>
            <button>
                <SaveIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>Save project as...</span>
            </button>

            <hr />

            <button>
                <CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>New project</span>
            </button>
        </ContextMenu>
    </div>
    <div class="wrapper">
        <button>
            <GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
        </button>
    </div>
</section>

<Popup bind:this={projectSettingsPopup}>
    <div class="popup">
        <div class="sidebar">
            <button>
                <GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
                <span>General</span>
            </button>
            <button>
                <GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
                <span>Datasets</span>
            </button>
        </div>
        <div class="content">
            <div class="dataset">

            </div>
        </div>
    </div> 
</Popup>

<style>
    .popup {
        width: 100%;
        height: 100%;
        display: flex;

        .content {
            padding: 1rem;
            flex-grow: 1;
            padding-left: 3rem;
            padding-right: 3rem;

            h1 {
                color: #cdd6f4;
                line-height: 1em;
            }
        }

        .sidebar {
            height: 100%;
            width: 15rem;
            border-right: 1px solid #313244;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 1rem;

            button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.25rem;
                padding-left: 0.5rem;
                width: 100%;
                border-radius: 0.25rem;
                --stroke: #cdd6f4;

                &:hover {
                    background-color: #b4befe;
                    --stroke: #181825;
                }

                span {
                    color: var(--stroke);
                }
            }
        }
    }

    .wrapper {
        position: relative;
        display: contents;

        > button {
            display: flex;
            align-items: center;
            justify-content: center;
            --stroke: #cdd6f4;
            padding: 0.25rem;
            border-radius: 0.25rem;
            
            &:hover {
                --stroke: #181825;
                background-color: #b4befe;
            }
        }
    }

    section {
        position: fixed;
        bottom: 0px;
        right: 0px;
        background-color: #11111b;
        padding: 0.5rem;
        border-top: 1px solid #313244;
        border-left: 1px solid #313244;
        border-top-left-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
</style>