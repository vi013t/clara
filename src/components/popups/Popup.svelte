<script module>
	let popupID = 0;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";

	let {
		children,
		reset,
		width = "70%",
		height = "85%",
	}: {
		reset: () => void | Promise<void>;
		children?: Snippet;
		width?: string;
		height?: string;
	} = $props();

	let visible = $state(false);
	let id = popupID++;

	export function open() {
		visible = true;
	}

	export function close() {
		visible = false;
		reset();
	}

	let popup: HTMLElement;

	function clickBackground(event: MouseEvent) {
		if (!event.composedPath().includes(popup)) {
			close();
		}
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && !popup.querySelector(".visible.popup")) {
			close();
		}
	}
</script>

<svelte:document {onkeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="background"
	onmousedown={clickBackground}
	style:background-color={visible ? "rgba(0, 0, 0, 50%)" : "rgba(0, 0, 0, 0%)"}
	style:pointer-events={visible ? "auto" : "none"}
	role="combobox"
	aria-expanded={visible}
	aria-controls="popup-{id}"
	tabindex="0"
>
	<section
		class={["popup", visible && "visible"]}
		bind:this={popup}
		style:scale={visible ? "100%" : "0%"}
		style:width
		style:height
		id="popup-{id}"
	>
		{@render children?.()}
		<button class="close-button" onmousedown={close}>
			<CloseIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
		</button>
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
		z-index: 99999999;
		transition: background-color 0.1s;
	}

	section {
		background-color: #1e1e2e;
		border: 1px solid #313244;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 0.5rem black;
		position: relative;
		transition: scale 0.1s;
	}

	.close-button {
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
		--stroke: #cdd6f4;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		padding: 0.25rem;

		&:hover {
			--stroke: #181825;
			background: #f38ba8;
		}
	}
</style>
