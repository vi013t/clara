<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import { mouse } from "@clara/api/components";
	import { clamp } from "@clara/api/math";
	import Pane, { type MultiPane } from "./Pane.svelte";

	let {
		subpane = false,
		pane = $bindable(),
	}: {
		subpane?: boolean;
		pane: MultiPane;
	} = $props();

	let dragging = $state(false);
	let wrapper: HTMLElement | null = $state(null);

	mouse().onRelease(() => {
		dragging = false;
	});

	mouse().onMove(event => {
		if (!wrapper || !dragging) return;

		if (pane.split === "horizontal") {
			const combinedWidth = wrapper.getBoundingClientRect().width;
			const paneWidth = combinedWidth * pane.percent;
			const newWidth = paneWidth + event.movementX;
			const newPercent = newWidth / combinedWidth;
			pane.percent = clamp(newPercent, 0.05, 0.95);
		} else if (pane.split === "vertical") {
			const combinedHeight = wrapper.getBoundingClientRect().height;
			const paneHeight = combinedHeight * pane.percent;
			const newHeight = paneHeight + event.movementY;
			const newPercent = newHeight / combinedHeight;
			pane.percent = clamp(newPercent, 0.05, 0.95);
		}
	});
</script>

<section
	class={{ "pane-wrapper": true }}
	style:flex-grow={subpane ? "1" : undefined}
	style:grid-template-columns={pane.split === "horizontal" ? `${pane.percent}fr ${1 - pane.percent}fr` : undefined}
	style:grid-template-rows={pane.split === "vertical" ? `${pane.percent}fr ${1 - pane.percent}fr` : undefined}
	bind:this={wrapper}
>
	<Pane bind:pane={pane.panes[0]} />

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		style:left={pane.split === "vertical" || !wrapper ? "0px" : `${wrapper.getBoundingClientRect().width * pane.percent}px`}
		style:top={pane.split === "horizontal" || !wrapper ? "0px" : `${wrapper.getBoundingClientRect().height * pane.percent}px`}
		onmousedown={() => (dragging = true)}
		class={{ drag: true, [pane.split]: true, dragging }}
	></div>

	<Pane bind:pane={pane.panes[1]} />
</section>

<style>
	.pane-wrapper {
		height: 100%;
		display: grid;
		position: relative;
	}

	.drag {
		position: absolute;
		z-index: 99;

		&:hover:not(.dragging) {
			background-color: #313244;
		}

		&.dragging {
			background-color: #b4befe;
		}

		&.vertical {
			width: 100%;
			height: 2px;
			cursor: ns-resize;
		}

		&.horizontal {
			height: 100%;
			width: 2px;
			cursor: ew-resize;
		}
	}
</style>
