<script lang="ts">
	import { fieldValueTypes, type AttributeDefinition } from "../../api/data/attribute/attribute.svelte";
	import type { Group } from "../../api/data/database.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import ItalicIcon from "../icons/ItalicIcon.svelte";
	import PrivacyIcon from "../icons/PrivacyIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import Input from "../input/Input.svelte";
	import Select from "../input/Select.svelte";
	import ConfirmationPopup from "./ConfirmationPopup.svelte";
	import Popup from "./Popup.svelte";

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
					<SpreadsheetIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
					{attribute.name}
				</h1>
				<button>
					<GearIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
					<span>General</span>
				</button>
				<button>
					<ItalicIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
					<span>Formatting</span>
				</button>
				<button>
					<PrivacyIcon stroke="var(--stroke)" style="width: 1rem; height: 1rem;" />
					<span>Restrictions</span>
				</button>

				<button onmousedown={() => confirmDeletePopup.open()}>Delete field</button>
			</div>

			<div class="content">
				<h2>Name</h2>
				<input bind:value={attribute.name} />

				<h2>Type</h2>
				<div class="type">
					<Select {onunlock} locked width="100%" options={fieldValueTypes} bind:value={attribute.type} />
				</div>

				<h2>Default</h2>
				<Input context="settings" background="#181825" type={attribute.type} value={null} openEditor={() => {}} />
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
		border-bottom: 1px solid #313244;
		padding-bottom: 1rem;
		display: flex;
		gap: 1rem;
		margin-left: 0.5rem;
		font-size: 0.85rem;
		color: #cdd6f4;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		font-weight: 700;
		color: #a6adc8;
	}

	section {
		display: grid;
		grid-template-columns: 1fr 3fr;
		height: 100%;
	}

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

		> :last-child {
			margin-top: auto;
			background-image: linear-gradient(to bottom right, #eba0ac, #f38ba8);
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			transition: scale 0.1s;
			box-shadow: 0px 0px 0.25rem black;
			color: #11111b;

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
		background-color: #181825;
		border: 1px solid #313244;
		color: #cdd6f4;
	}

	p {
		font-size: 0.85rem;
		color: #a6adc8;
	}

	h2 {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.85rem;
		color: #a6adc8;
		margin-left: 2px;

		&:not(:first-child) {
			margin-top: 1rem;
		}
	}
</style>
