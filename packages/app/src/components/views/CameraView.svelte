<script lang="ts">
	import type { Snippet } from "svelte";
	import { Camera } from "@wallflower/api/camera";

	let {
		children,
		camera = $bindable(new Camera()),
		canPan = true,
	}: { children: Snippet; camera?: Camera; canPan?: boolean } = $props();

	let mouseDown = $state(false);

	function zoom(event: WheelEvent) {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const clientCursor = {
			x: event.clientX - (rect.left + rect.width / 2),
			y: event.clientY - (rect.top + rect.height / 2),
		};
		const worldPoint = camera.unproject(clientCursor);

		const factor = Math.exp(event.deltaY * 0.002);
		camera.scaleAround(worldPoint, factor);
	}

	let outer: HTMLElement;

	function pan(event: MouseEvent) {
		if (!canPan || !mouseDown) return;

		camera.shift([-event.movementX * camera.getScale().x, -event.movementY * camera.getScale().y]);
	}

	let cursor = $derived(mouseDown ? "grabbing" : "grab");
</script>

<svelte:document onmousedown={() => (mouseDown = true)} onmouseup={() => (mouseDown = false)} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section bind:this={outer} class="outer" onwheel={zoom} onmousemove={pan} style:cursor>
	<div class="inner" style:transform={camera.transformCSS}>
		{@render children()}
	</div>
</section>

<style>
	.outer {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		touch-action: none;
	}

	.inner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		overflow: visible;
	}
</style>
