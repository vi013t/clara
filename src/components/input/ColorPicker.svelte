<script lang="ts">
	import namer from "color-namer";
	import { mouse } from "../util/InputHandler.svelte";
	import { Color, type ToColor } from "../../api/ui/color.svelte";

	let {
		palette = ["#f38ba8", "#eba0ac", "#fab387", "#f9e2af", "#a6e3a1", "#94e2d5", "#89dceb", "#74c7ec", "#89b4fa", "#b4befe"],
		value = $bindable(null),
	}: {
		palette?: ToColor[];
		value?: Color | null;
	} = $props();

	let visible = $state(false);
	let colors = $derived(palette.map(color => Color.from(color)));

	export function open() {
		visible = true;
	}

	export function hide() {
		visible = false;
	}

	let picker: HTMLElement;
	let pickIcon: HTMLElement;

	mouse().onClick(event => {
		if (!event.composedPath().includes(picker) && !event.composedPath().includes(pickIcon)) {
			hide();
		}
	});

	function onColorClick(color: Color) {
		return function () {
			value = color;
		};
	}

	let name = $derived(
		value
			? Object.values(namer(value.hex))
					.map(nameList => ({ name: nameList[0].name, distance: nameList[0].distance }))
					.toSorted((a, b) => a.distance - b.distance)[0].name
			: "",
	);

	let foreground = $derived(value?.constrastColor ?? "#000000");
</script>

<div class="colors">
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button class="picker" bind:this={pickIcon} style:background-color={`${value}`} style:color={`${foreground}`} onclick={open}>
		{name}
	</button>
	<div
		class="choose"
		bind:this={picker}
		style:top={mouse().absolute.y}
		style:left={mouse().absolute.x}
		style:display={visible ? "flex" : "none"}
	>
		<div class="preset">
			{#each colors as color}
				<div>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button onclick={onColorClick(color)} style:background-color={`${color}`}></button>
				</div>
			{/each}
			<label for="color-picker" class="custom"></label>
			<input type="color" id="color-picker" bind:value />
		</div>
		<button class="preview" style:background-color={`${value}`} style:color={`${foreground}`}>{name}</button>
	</div>
</div>

<style>
	.colors {
		width: 10rem;
	}

	.choose {
		background-color: var(--crust);
		width: fit-content;
		padding: 1rem;
		border-radius: 0.5rem;
		flex-direction: column;
		position: absolute;
		z-index: 9999;
	}

	.picker {
		height: 1.25rem;
		border-radius: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: capitalize;
	}

	.preset {
		display: flex;

		> div {
			display: flex;
			flex-direction: column;

			> button {
				width: 1rem;
				height: 1rem;
			}
		}
	}

	.custom {
		height: 5rem;
		margin-left: 1rem;
		width: 1rem;
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
	}

	.preview {
		width: 10rem;
		margin-top: 1rem;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: capitalize;
	}

	input {
		opacity: 0%;
		position: absolute;
		pointer-events: none;
	}
</style>
