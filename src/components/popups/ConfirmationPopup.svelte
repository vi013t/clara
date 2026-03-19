<script lang="ts">
	import type { Snippet } from "svelte";
	import Popup from "./Popup.svelte";

	let {
		confirmText = "Confirm",
		cancelText = "Cancel",
		onconfirm = () => {},
		title,
		children,
	}: { confirmText?: string; cancelText?: string; onconfirm?: () => void; title: string; children: Snippet } = $props();

	let popup: Popup;

	export function open() {
		popup.open();
	}

	function reset() {}

	function confirm() {
		popup.close();
		onconfirm();
	}
</script>

<Popup bind:this={popup} {reset} width="20rem" height="fit-content">
	<section>
		<h1>{title}</h1>
		{@render children()}
		<div class="buttons">
			<button onmousedown={() => popup.close()}>{cancelText}</button>
			<button onmousedown={confirm}>{confirmText}</button>
		</div>
	</section>
</Popup>

<style>
	section {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h1 {
			color: #cdd6f4;
			font-size: 1rem;
			margin-left: auto;
			margin-right: auto;
		}
	}

	.buttons {
		display: flex;
		width: 100%;
		justify-content: space-between;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			width: 8rem;
			transition: scale 0.1s;
			box-shadow: 0px 0px 0.25rem black;
			color: #11111b;
			border-radius: 0.25rem;

			&:hover {
				scale: 105%;
			}

			&:first-child {
				background-image: linear-gradient(to bottom right, #eba0ac, #f38ba8);
			}

			&:last-child {
				background-image: linear-gradient(to bottom right, #94e2d5, #a6e3a1);
			}
		}
	}
</style>
