<script lang="ts">
	import type { Snippet } from "svelte";
	import { Camera } from "../../api/ui/camera.svelte";

	let { children, camera = $bindable(new Camera()) }: { children: Snippet; camera?: Camera } = $props();

	let mouseDown = $state(false);

	function zoom(event: WheelEvent) {
		const rect = (event.target as HTMLElement).getBoundingClientRect();
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
		if (!mouseDown) return;

		camera.shift([-event.movementX * camera.getScale().x, -event.movementY * camera.getScale().y]);
	}

	function onmousedown(event: MouseEvent) {
		let element = event.target as HTMLElement;
		mouseDown = !element.closest(".node");
	}
</script>

<svelte:document {onmousedown} onmouseup={() => (mouseDown = false)} />

<section bind:this={outer} class="outer" onwheel={zoom} onmousemove={pan}>
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
		cursor: grab;
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
