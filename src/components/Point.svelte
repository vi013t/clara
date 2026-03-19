<script lang="ts">
	import type { Camera } from "../api/ui/camera.svelte";

	let { x, y, camera }: { x: number; y: number; camera: Camera } = $props();
</script>
