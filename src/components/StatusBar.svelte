<script lang="ts">
	import { project } from "../api/Data.svelte";
	import ContextMenu from "./ContextMenu.svelte";
	import CharacterCountIcon from "./icons/CharacterCountIcon.svelte";
	import CircledPlusIcon from "./icons/CircledPlusIcon.svelte";
	import FolderIcon from "./icons/FolderIcon.svelte";
	import GearIcon from "./icons/GearIcon.svelte";
	import PlusIcon from "./icons/PlusIcon.svelte";
	import SaveIcon from "./icons/SaveIcon.svelte";
	import SpreadsheetIcon from "./icons/SpreadsheetIcon.svelte";
	import TrashIcon from "./icons/TrashIcon.svelte";
	import WordCountIcon from "./icons/WordCountIcon.svelte";
	import Popup from "./Popup.svelte";

    let projectMenu: ContextMenu;
    let wordCountMenu: ContextMenu;
    let projectSettingsPopup: Popup;
</script>

<section>
    <div class="wrapper">
        <button onmousedown={() => wordCountMenu.toggle()}>
            <span>0 / 0 words</span>
        </button>
        <ContextMenu bind:this={wordCountMenu} bottom="100%" right="4rem">
            <button onmousedown={() => { projectSettingsPopup.open(); projectMenu.close() }}>
                <WordCountIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>Word Count</span>
            </button>
            <button>
                <CharacterCountIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>Character Count</span>
            </button>
            <button>
                <SaveIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
                <span>Chapter Count</span>
            </button>
        </ContextMenu>
    </div>
</section>

<style>
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
            color: var(--stroke);
            
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