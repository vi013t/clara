<script lang="ts">
	import type { Snippet } from "svelte";
	import { Camera } from "../../api/ui/camera.svelte";

	let { children, camera = $bindable(new Camera()) }: { children: Snippet; camera?: Camera } = $props();

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
</script>

<section class="outer" onwheel={zoom}>
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
