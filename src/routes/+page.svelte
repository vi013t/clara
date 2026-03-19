<script>
	import Navbar from "../components/panels/Navbar.svelte";
	import Pane from "../components/pane/Pane.svelte";
	import StatusBar from "../components/StatusBar.svelte";
	import { pressHotkey } from "../api/userdata/action.svelte";
</script>

<svelte:document onkeydown={pressHotkey} />

<main>
	<Navbar />
	<div>
		<Pane background="#181825" />
		<StatusBar />
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		div {
			height: 100%;
		}
	}
</style>
