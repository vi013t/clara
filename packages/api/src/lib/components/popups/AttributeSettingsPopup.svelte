<script lang="ts">
	import type { Group } from "@clara/api/database";
	import Input from "../input/Input.svelte";
	import Select from "../input/Select.svelte";
	import ConfirmationPopup from "./ConfirmationPopup.svelte";
	import Popup from "./Popup.svelte";
	import { AttributeType, type AttributeDefinition } from "@clara/api/attribute";
	import { Icon } from "@clara/api/components";

	let { owner, attribute = $bindable() }: { owner: Group; attribute: AttributeDefinition | null } = $props();

	function reset() {}

	let popup: Popup;

	let confirmDeletePopup: ConfirmationPopup;
	let confirmUnlockTypePopup: ConfirmationPopup;
	let unlockType = $state(() => {});

	export function open() {
		popup.open();
	}

	function onunlock(unlock: () => void) {
		unlockType = unlock;
		confirmUnlockTypePopup.open();
	}
</script>

<Popup {reset} bind:this={popup}>
	{#if attribute}
		<section>
			<div class="sidebar">
				<h1 class="title">
					<Icon name="Table2" />
					{attribute.name}
				</h1>
				<button>
					<Icon name="Settings" />
					<span>General</span>
				</button>
				<button>
					<Icon name="Italic" />
					<span>Formatting</span>
				</button>
				<button>
					<Icon name="ShieldCheck" />
					<span>Restrictions</span>
				</button>

				<button onmousedown={() => confirmDeletePopup.open()}>Delete field</button>
			</div>

			<div class="content">
				<h2>Name</h2>
				<input bind:value={attribute.name} />

				<h2>Type</h2>
				<div class="type">
					<Select {onunlock} locked width="100%" options={AttributeType.names()} bind:value={attribute.type.name} />
				</div>

				<h2>Default</h2>
				<Input
					context="settings"
					background="var(--background-dark)"
					type={attribute.type.name}
					value={null}
					openEditor={() => {}}
				/>
			</div>
		</section>
	{/if}
</Popup>

<ConfirmationPopup
	bind:this={confirmDeletePopup}
	title="Delete field?"
	onconfirm={() => {
		owner.deleteAttributeDefinition(attribute!);
		close();
	}}
>
	<p>All entries that have values in this field will have the value deleted.</p>
</ConfirmationPopup>

<ConfirmationPopup bind:this={confirmUnlockTypePopup} title="Change type?" onconfirm={unlockType}>
	<p>Changing the type of this attribute will delete all entries' data for this attribute.</p>
</ConfirmationPopup>

<style>
	.content {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.type {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin-right: 2.5rem;
	}

	.title {
		border-bottom: 1px solid var(--border);
		padding-bottom: 1rem;
		display: flex;
		gap: 1rem;
		margin-left: 0.5rem;
		font-size: 0.85rem;
		color: var(--foreground-bright);
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		font-weight: 700;
		color: var(--foreground);
	}

	section {
		display: grid;
		grid-template-columns: 1fr 3fr;
		height: 100%;
	}

	.sidebar {
		height: 100%;
		width: 15rem;
		border-right: 1px solid var(--border);
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
			--stroke: var(--foreground-bright);

			&:hover {
				background-color: var(--indigo);
				--stroke: var(--background-dark);
			}

			span {
				color: var(--stroke);
			}
		}

		> :last-child {
			margin-top: auto;
			background-image: linear-gradient(to bottom right, #eba0ac, var(--red));
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			transition: scale 0.1s;
			box-shadow: 0px 0px 0.25rem black;
			color: var(--background-darker);

			&:hover {
				scale: 105%;
			}
		}
	}

	input {
		width: 100%;
		border-radius: 0.25rem;
		padding: 0.5rem;
		padding-left: 0.5rem;
		background-color: var(--background-dark);
		border: 1px solid var(--border);
		color: var(--foreground-bright);
	}

	p {
		font-size: 0.85rem;
		color: var(--foreground);
	}

	h2 {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.85rem;
		color: var(--foreground);
		margin-left: 2px;

		&:not(:first-child) {
			margin-top: 1rem;
		}
	}
</style>
