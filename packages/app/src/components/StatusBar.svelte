<script lang="ts">
	import ContextMenu from "../../../api/src/lib/components/menus/ContextMenu.svelte";
	import { SaveIcon, CharacterCountIcon, WordCountIcon } from "@wallflower/api/icons";

	let wordCountMenu: ContextMenu;
</script>

<section>
	<div class="wrapper">
		<button onmousedown={() => wordCountMenu.toggle()}>
			<span>0 / 0 words</span>
		</button>
		<ContextMenu bind:this={wordCountMenu} bottom="120%" right="0.5rem">
			<button>
				<WordCountIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
				<span>Word Count</span>
			</button>
			<button>
				<CharacterCountIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
				<span>Character Count</span>
			</button>
			<button>
				<SaveIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
				<span>Chapter Count</span>
			</button>
		</ContextMenu>
	</div>
</section>

<style>
	.wrapper {
		position: relative;
		display: contents;

		> button {
			display: flex;
			align-items: center;
			justify-content: center;
			--stroke: #cdd6f4;
			padding: 0.25rem;
			border-radius: 0.25rem;
			color: var(--stroke);

			&:hover {
				--stroke: #181825;
				background-color: #b4befe;
			}
		}
	}

	section {
		position: fixed;
		bottom: 0px;
		right: 0px;
		background-color: #11111b;
		padding: 0.5rem;
		border-top: 1px solid #313244;
		border-left: 1px solid #313244;
		border-top-left-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
