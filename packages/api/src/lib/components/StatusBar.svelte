<script lang="ts">
</script>

<section>
	<div class="wrapper">
		<button>
			<span>Status Bar</span>
		</button>
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
			--stroke: var(--foreground-bright);
			padding: 0.25rem;
			border-radius: 0.25rem;
			color: var(--stroke);

			&:hover {
				--stroke: var(--background-dark);
				background-color: var(--indigo);
			}
		}
	}

	section {
		position: fixed;
		bottom: 0px;
		right: 0px;
		background-color: var(--background-darker);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
		border-top-left-radius: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
