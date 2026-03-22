<script lang="ts">
	import GearIcon from "../icons/GearIcon.svelte";
	import Popup from "./Popup.svelte";

	let popup: Popup;

	export function open() {
		popup.open();
	}

	let selectedTab = $state("general");

	function reset() {
		selectedTab = "general";
	}
</script>

<Popup {reset} bind:this={popup}>
	<div class="popup">
		<div class="sidebar">
			<button>
				<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
				<span>General</span>
			</button>
		</div>
	</div>
</Popup>

<style>
	.popup {
		width: 100%;
		height: 100%;
		display: flex;
		overflow-y: auto;

		.sidebar {
			height: 100%;
			width: 15rem;
			border-right: 1px solid #313244;
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 1rem;

			button {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.25rem;
				padding-left: 0.5rem;
				width: 100%;
				border-radius: 0.25rem;
				--stroke: #cdd6f4;

				&:hover {
					background-color: #b4befe;
					--stroke: #181825;
				}

				span {
					color: var(--stroke);
				}
			}
		}
	}
</style>
