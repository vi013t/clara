<script lang="ts">
	import { Project } from "../api/project.svelte";
	import ManualPopup from "./popups/ManualPopup.svelte";
	import NewProjectPopup from "./popups/NewProjectPopup.svelte";

	let manualPopup: ManualPopup;
	let newProjectPopup: NewProjectPopup;
</script>

<section>
	<p>No project opened. Create a new one now or open an existing one.</p>
	<div>
		<button onmousedown={() => Project.open()}>Open project</button>
		<button onmousedown={() => newProjectPopup.open()}>Create project</button>
	</div>
	<button onmousedown={() => manualPopup.open()}>Where am I?</button>
</section>

<ManualPopup bind:this={manualPopup} />
<NewProjectPopup bind:this={newProjectPopup} />

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		gap: 2rem;
		flex-direction: column;
		background-color: #11111b;

		p {
			color: #a6adb8;
			font-size: 0.85rem;
		}

		> button {
			color: #89b4fa;
			font-style: italic;
			font-size: 0.85rem;

			&:hover {
				text-decoration: underline;
			}
		}

		div {
			display: flex;
			gap: 2rem;

			> button {
				border-radius: 0.25rem;
				width: 10rem;
				padding: 0.5rem;
				color: #181825;
				background-image: linear-gradient(to bottom right, #b4befe, #89b4fa);
				box-shadow: 0px 0px 0.25rem black;
				font-size: 0.85rem;
				transition: scale 0.1s;

				&:last-child {
					background-image: linear-gradient(to bottom right, #94e2d5, #a6e3a1);
				}

				&:hover {
					scale: 105%;
				}
			}
		}
	}
</style>
