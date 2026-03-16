<script lang="ts">
	import { event } from "@tauri-apps/api";
	import type { Snippet } from "svelte";

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

<div class="background" style:scale={visible ? "100%" : "0%"} onclick={clickBackground}>
    <section bind:this={popup}>
        {@render children?.()}
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
    }

    section {
        width: 70%;
        height: 85%;
        background-color: #1e1e2e;
        border: 1px solid #313244;
        border-radius: 0.5rem;
        box-shadow: 0px 0px 0.5rem black;
    }
</style>