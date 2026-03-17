<script lang="ts">
	import { event } from "@tauri-apps/api";
	import type { Snippet } from "svelte";
	import CloseIcon from "./icons/CloseIcon.svelte";

    let { children }: { children?: Snippet } = $props();

    let visible = $state(false);

    export function open() {
        visible = true;
    }
 
    export function close() {
        visible = false;
    }

    let popup: HTMLElement;

    function clickBackground(event: MouseEvent) {
        if (!event.composedPath().includes(popup)) {
            close();
        }
    }
</script>

<div 
    class="background" 
    onclick={clickBackground} 
    style:background-color={visible ? "rgba(0, 0, 0, 50%)" : "rgba(0, 0, 0, 0%)"} 
    style:pointer-events={visible ? "auto" : "none"}>
    <section bind:this={popup} style:scale={visible ? "100%" : "0%"}
>
        {@render children?.()}
        <button class="close-button" onmousedown={close}>
            <CloseIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
        </button>
    </section>
</div>

<style>
    .background {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 50%);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.1s;
    }

    section {
        width: 70%;
        height: 85%;
        background-color: #1e1e2e;
        border: 1px solid #313244;
        border-radius: 0.5rem;
        box-shadow: 0px 0px 0.5rem black;
        position: relative;
        transition: scale 0.1s;
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        --stroke: #cdd6f4;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        padding: 0.25rem;

        &:hover {
            --stroke: #181825;
            background: #f38ba8;
        }
    }
</style>