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
			color: var(--foreground-bright);
			font-size: 1rem;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 0.5rem;
		}

		:global(p) {
			color: var(--foreground);
			font-size: 0.85rem;
			text-align: center;
		}
	}

	.buttons {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-top: 1rem;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			width: 8rem;
			transition: scale 0.1s;
			box-shadow: 0px 0px 0.25rem black;
			color: var(--background-darker);
			border-radius: 0.25rem;

			&:hover {
				scale: 105%;
			}

			&:first-child {
				background-image: linear-gradient(to bottom right, #eba0ac, var(--red));
			}

			&:last-child {
				background-image: linear-gradient(to bottom right, var(--teal), var(--green));
			}
		}
	}
</style>
