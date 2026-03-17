<script>
	import Navbar from "../components/panels/Navbar.svelte";
	import Pane from "../components/panes/Pane.svelte";
	import StatusBar from "../components/StatusBar.svelte";
</script>

<main>
	<Navbar />
	<div>
		<Pane width="600" height="1080px" background="#181825" split="horizontal">
			<Pane subpane width="1200px" split="horizontal">
				<Pane subpane />
			</Pane>
		</Pane>
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
