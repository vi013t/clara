<script lang="ts">
	import type { Snippet } from "svelte";

    let { 
        left, 
        right,
        bottom,
        top, 
        children 
    }: { 
        left?: string, 
        top?: string, 
        bottom?: string;
        right?: string;
        children: Snippet 
    } = $props();

    let visible = $state(false);
    let doneTransitioning = $state(true);
    let transitionTimer = $state(0);
    let innerWidth: number = $state(0);
    let domElement: HTMLElement | null = $state(null);
    let flipX = $derived.by(() => {
        return domElement ? domElement.getBoundingClientRect().right > innerWidth : false;
    });
    let flipY = $state(false);
    let transformOriginX = $derived(left ? flipX ? "100%" : "0%" : flipX ? "0%" : "100%");
    let transformOriginY = $derived(top ? flipY ? "100%" : "0%" : flipY ? "0%" : "100%");

    export function toggle() {
        if (visible) close();
        else open();
    }

    export function open() {
        if (!doneTransitioning) return;
        doneTransitioning = false;
        visible = true;
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => {
            doneTransitioning = true;
        }, 100);
    }

    export function close() {
        if (!doneTransitioning) return;
        doneTransitioning = false;
        visible = false;
        if (transitionTimer) clearTimeout(transitionTimer);
        transitionTimer = setTimeout(() => {
            doneTransitioning = true;
        }, 100);
    }

    export function element(): HTMLElement {
        return domElement!;
    }

    function onmousedown(event: MouseEvent) {
        if (doneTransitioning && domElement && !event.composedPath().includes(domElement)) {
            close();
        }
    }

    export function openingState() {
        if (doneTransitioning && visible) return "open";
        if (!doneTransitioning && visible) return "opening";
        if (doneTransitioning && !visible) return "closing";
        return "closed"
    }
</script>

<svelte:document {onmousedown} />
<svelte:window bind:innerWidth />

<section 
    bind:this={domElement}
    style:top
    style:bottom
    style:right
    style:left
>
    <div
        class="inner" 
        style:scale={visible ? "100%" : "0%"}
        style:transform={flipX ? "translateX(-170px)" : undefined}
        style:transform-origin="{transformOriginX} {transformOriginY}"
    >
        {@render children()}
    </div>
</section>

<style>
    section {
        position: absolute;
        z-index: 9999999;
        width: 200px;
        pointer-events: none;

        .inner {
            pointer-events: auto;
            display: flex;
            flex-direction: column;
            background-color: #181825;
            box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 50%);
            border: 1px solid #585b70;
            padding: 0.5rem;
            gap: 0.25rem;
            width: 100%;
            border-radius: 0.5rem;
            transition: scale 0.1s;

            :global(> *:not(hr) ) {
                width: 100%;
                color: #cdd6f4;
                height: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding-left: 0.5rem;
                font-size: 0.8rem;
                border-radius: 0.25rem;

                &[disabled] {
                    color: #6c7086;
                }

                &:hover {
                    background-color: #252634;
                }
            }

            :global(> hr) {
                width: calc(100% + 1rem);
                transform: translateX(-0.5rem);
                background-color: #313244;
                height: 1px;
            }
        }
    }
</style>