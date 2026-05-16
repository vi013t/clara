<script lang="ts">
	import { userSettings } from "@clara/api/usersettings";
	import { actions, key, onActionRequested } from "../../usersettings/action.svelte.ts";
	import { Icon, Popup } from "@clara/api/components";

	function reset() {}

	let searchText = $state("");
	let matchedActions = $derived(actions().filter(action => action.name.toLowerCase().startsWith(searchText.toLowerCase())));

	let visible = $state(false);
	let input: HTMLElement;

	onActionRequested("Open Command Palette", () => {
		visible = true;
		input.focus();
	});
</script>

<Popup {reset} bind:visible width="40rem" height="20rem">
	<div class="popup">
		<input bind:this={input} bind:value={searchText} placeholder="Run action..." />
		{#each matchedActions as action}
			<button class="action">
				<Icon name={action.icon} />
				{action.name}
				<div class="hotkeys">
					{#each Object.entries(userSettings().hotkeys).filter(([other, key]) => other === action.name) as [_, key]}
						<div class="hotkey">
							{key.modifiers.map(modifier => `${modifier} + `) + key.key}
						</div>
					{/each}
				</div>
			</button>
		{/each}
	</div>
</Popup>

<style>
	.popup {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	input {
		background: var(--background-dark);
		color: var(--foreground-bright);
		padding: 1rem;

		&::placeholder {
			color: var(--foreground-dark);
			font-style: ialic;
		}
	}

	.action {
		color: var(--foreground);
		width: 100%;
		display: flex;
		padding: 0.5rem;
		padding-left: 1rem;
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		gap: 0.5rem;

		&:nth-child(2) {
			background: var(--indigo);
			color: var(--background-dark);
		}
	}

	input {
		color: var(--foreground-bright);
	}

	.hotkeys {
		display: flex;
		gap: 0.5rem;
		margin-left: auto;
	}

	.hotkey {
		text-transform: capitalize;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0.5rem;
	}
</style>
