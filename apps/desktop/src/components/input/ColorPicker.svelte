<script lang="ts">
	import { Color } from "../../api/data/attribute/color.svelte";
	import { clamp } from "../../api/math/arrays.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import TrashIcon from "../icons/TrashIcon.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import { mouse } from "../util/InputHandler.svelte";

	let {
		value = $bindable(null),
	}: {
		value?: Color | null;
	} = $props();

	let visible = $state(false);

	let popup: HTMLElement;
	let left = $state("0px");
	let top = $state("0px");
	let box: HTMLElement;
	let hueBox: HTMLElement;

	export function open() {
		let position = mouse().relativeTo(popup);
		left = `${position.x}px`;
		top = `${position.y}px`;
		visible = true;
	}

	export function hide() {
		value = previewColor;
		visible = false;
	}

	let mounted = $state(false);
	let picker: HTMLElement;
	let huePicker: HTMLElement = null!;
	let opener: HTMLElement;

	mouse().onClick(event => {
		if (!event.composedPath().includes(popup) && !event.composedPath().includes(opener)) {
			hide();
		}
	});

	function pick(color?: Color) {
		value = color ?? previewColor;
	}

	let previewColor = $state(value ?? Color.hex("#b4befe"));
	let boxX = $state(0);
	let boxY = $state(0);
	// svelte-ignore state_referenced_locally
	let sliderY = $state((208 * previewColor.hue) / 360);

	$effect(() => {
		sliderY = 208 * (previewColor.hue / 360);
	});

	function pickColor(event: MouseEvent) {
		const rect = picker.getBoundingClientRect();
		const boxRect = box.getBoundingClientRect();

		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;

		boxX = clamp(x, boxRect.width / 2, rect.width - boxRect.width / 2);
		boxY = clamp(y, boxRect.height / 2, rect.height - boxRect.height / 2);

		const s = clamp((100 * x) / rect.width, 0, 100);
		const v = clamp(100 - (100 * y) / rect.height, 0, 100);
		previewColor = Color.hsv(previewColor.hue, s, v);
	}

	function slideHue(event: MouseEvent) {
		const rect = huePicker.getBoundingClientRect();
		let y = event.clientY - rect.top;
		let hue = clamp((360 * y) / rect.height, 0, 360);
		previewColor = Color.hsv(hue, previewColor.saturation, previewColor.value);
	}

	let palette = $state([Color.black, Color.white]);

	function addToPalette(color: Color) {
		palette.unshift(color);
	}

	function clickPaletteColor(event: MouseEvent, color: Color) {
		if (event.button !== 0) return;
		previewColor = color;
	}

	function rightClickPaletteColor(event: MouseEvent) {
		event.preventDefault();
		paletteMenu.openAtMouse();
	}

	let paletteMenu: ContextMenu;
</script>

<div
	style:color={`${previewColor.constrastColor}`}
	class="popup"
	style:--hue={previewColor.hue}
	style:left
	style:top
	style:scale={visible ? "100%" : "0%"}
	bind:this={popup}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="top">
		<div class="picker" onmousedown={pickColor} bind:this={picker}>
			<div
				bind:this={box}
				style:border-color={`${previewColor.constrastColor}`}
				class="box"
				style:left="{boxX}px"
				style:top="{boxY}px"
			></div>
		</div>
		<div class="hue-picker" onmousedown={slideHue} bind:this={huePicker}>
			<div class="hue-slider" bind:this={hueBox} style:left="0px" style:top="{sliderY}px"></div>
		</div>
	</div>
	<div class="preview" style:background={`${previewColor}`}>{previewColor.name}</div>
	<div class="bottom">
		<input bind:value={() => previewColor.hex, hex => (previewColor = Color.tryHex(hex) ?? previewColor)} />
		<!-- svelte-ignore a11y_consider_explicit_label -->
		{#each palette as color}
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<button
				oncontextmenu={rightClickPaletteColor}
				onmousedown={event => clickPaletteColor(event, color)}
				style:background={`${color}`}
				class="palette-color"
			></button>
		{/each}
		<button class="new palette-color" onmousedown={() => addToPalette(previewColor)}>
			<PlusIcon stroke="#cdd6f4" style="height: 100%; aspect-ratio: 1;" />
		</button>
	</div>
	<button onmousedown={hide} class="set-color">Select</button>
</div>
<button
	bind:this={opener}
	onmousedown={open}
	class="preview"
	style:background-color={`${value ?? Color.white}`}
	style:color={`${(value ?? Color.white).constrastColor}`}
>
	{value?.name ?? "None"}
</button>

<ContextMenu bind:this={paletteMenu}>
	<button>
		<TrashIcon stroke="#f38ba8" style="width: 1.2rem; height: 1.2rem;" />
		<span style:color="#f37ba8">Remove from palette</span>
	</button>
</ContextMenu>

<style>
	.set-color {
		border-radius: 0.25rem;
		width: 100%;
		padding: 0.5rem;
		color: #181825;
		box-shadow: 0px 0px 0.25rem black;
		font-size: 0.85rem;
		transition: scale 0.1s;
		background-image: linear-gradient(to bottom right, #94e2d5, #a6e3a1);

		&:hover {
			scale: 103%;
		}
	}

	.popup {
		height: 25rem;
		width: 18rem;
		box-shadow: 0px 0px 0.5rem black;
		position: absolute;
		background-color: #11111b;
		border: 1px solid #313244;
		border-radius: 0.25rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: scale 0.05s;
		transform-origin: 0px 0px;
	}

	.box {
		position: absolute;
		width: 1rem;
		height: 1rem;
		border: 2px solid white;
		border-radius: 2px;
		transform: translate(-50%, -50%);
	}

	.bottom {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.palette-color {
		height: 100%;
		aspect-ratio: 1;
		border: 1px solid #313244;
		border-radius: 0.25rem;

		&.new {
			background-color: #1e1e2e;
			padding: 0.25rem;
		}
	}

	.hue-slider {
		position: absolute;
		width: 100%;
		height: 1rem;
		border: 2px solid white;
		border-radius: 2px;
		transform: translateY(-50%);
		z-index: 999999999;
	}

	input {
		background-color: #1e1e2e;
		color: #a6adc8;
		width: 4rem;
		padding: 0.25rem;
		border-radius: 0.25rem;
		height: 100%;
		border: 1px solid #313244;
		margin-right: auto;
	}

	.top {
		width: 100%;
		display: grid;
		grid-template-columns: 7fr 1fr;
		gap: 1rem;
		aspect-ratio: 1.12;
	}

	.hue-picker {
		background: linear-gradient(
			180deg,
			rgba(255, 0, 0, 1) 0%,
			rgba(255, 154, 0, 1) 10%,
			rgba(208, 222, 33, 1) 20%,
			rgba(79, 220, 74, 1) 30%,
			rgba(63, 218, 216, 1) 40%,
			rgba(47, 201, 226, 1) 50%,
			rgba(28, 127, 238, 1) 60%,
			rgba(95, 21, 242, 1) 70%,
			rgba(186, 12, 248, 1) 80%,
			rgba(251, 7, 217, 1) 90%,
			rgba(255, 0, 0, 1) 100%
		);
		height: 100%;
		border-radius: 0.25rem;
		width: 100%;
		cursor: crosshair;
		position: relative;
	}

	.preview {
		width: 100%;
		height: 2rem;
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.85rem;
		text-transform: capitalize;
		outline: 1px solid #313244;
	}

	.picker {
		border-radius: 0.25rem;
		background:
			linear-gradient(to bottom, transparent 0%, #000 100%), linear-gradient(to right, #fff 0%, transparent 100%),
			hsl(var(--hue), 100%, 50%);
		width: 100%;
		height: 100%;
		cursor: crosshair;
		position: relative;
	}
</style>
