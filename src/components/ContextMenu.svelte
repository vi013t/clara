<script lang="ts">
	import type { Snippet } from "svelte";

    let { left, top, children }: { left: string, top: string, children: Snippet } = $props();

    let visible = $state(false);

    export function open() {
        visible = true;
    }

    export function close() {
        visible = false;
    }

    let domElement: HTMLElement;

    export function element(): HTMLElement {
        return domElement;
    }
</script>

<section bind:this={domElement} style:top style:left style:scale={visible ? "100%" : "0%"}>
    {@render children()}
</section>

<style>
    section {
        position: absolute;
        background-color: #11111b;
        border: 1px solid #585b70;
        z-index: 9999999;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        width: 200px;
        padding: 0.5rem;
        gap: 0.25rem;
        transition: scale 0.1s;
        transform-origin: 0% 0%;

        :global(> *:not(hr) ) {
            width: 100%;
            color: #cdd6f4;
            height: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-left: 0.5rem;
            font-size: 0.85rem;
            border-radius: 0.25rem;

            &:hover {
                background-color: #252634;
            }
        }

        :global(> hr) {
            width: calc(100% + 1rem);
            transform: translateX(-0.5rem);
            background-color: #252634;
            height: 1px;
        }
    }
</style>