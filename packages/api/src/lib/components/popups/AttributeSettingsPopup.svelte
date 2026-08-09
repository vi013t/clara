<script lang="ts">
	import { AttributeType, BasicAttributeBox, type AttributeDefinition, type AttributeTypeName } from "@clara/api/attribute";
	import { ConfirmationPopup, Input, Popup, PopupSidebar, Select } from "@clara/api/components";
	import type { ItemType } from "@clara/api/database";
	import { getIcon } from "@clara/api/icons";
	import { Project } from "@clara/api/project";

	let { owner, attribute = $bindable() }: { owner: ItemType; attribute: AttributeDefinition | null } = $props();

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

	let view = $state("General");
	let randomizerOutput: HTMLElement | null = $state(null);
</script>

<Popup {reset} bind:this={popup}>
	{#if attribute}
		<section>
			<PopupSidebar
				bind:view
				title={{ text: attribute.name, icon: getIcon("Table2").component }}
				sections={{
					General: [
						["General", "Settings"],
						["Formatting", "Italic"],
						["Randomizers", "Dice6"],
						["Restrictions", "ShieldCheck"],
					],
				}}
			/>

			<div class="content">
				{#if view === "General"}
					<h2>Name</h2>
					<input bind:value={attribute.name} />

					<h2>Type</h2>
					<div class="type">
						<Select
							{onunlock}
							locked
							width="100%"
							options={AttributeType.names()}
							bind:value={
								() => AttributeType.readableName(attribute.type),
								type => (attribute.type = AttributeType.fromName(type as AttributeTypeName))
							}
						/>
					</div>

					<!-- <h2>Default Value</h2>
					<Input context="settings" background="var(--background-dark)" type={attribute.type.name} /> -->
				{:else if view === "Randomizers"}
					<h2>Randomizer</h2>
					<Select
						width="100%"
						options={Project.get()!.randomizers.map(randomizer => randomizer.name)}
						bind:value={
							() => attribute.randomizer?.randomizer.name,
							randomizerName => {
								let randomizer = Project.get()!.randomizers.find(other => other.name === randomizerName)!;
								attribute.randomizer = {
									randomizer: randomizer,
									arguments: Object.fromEntries(
										Object.entries(randomizer.defaultArguments()).map(([name, value]) => [name, new BasicAttributeBox(value)]),
									) as any,
								};
							}
						}
					/>

					<h2>Default Parameters</h2>

					{#each Object.entries(attribute.randomizer?.randomizer.parameters() ?? {}) as [name, type]}
						<div class="randomizer-parameter">
							<span>{name}:</span>
							<Input
								attribute={attribute.randomizer!.arguments[name]}
								context="settings"
								background="var(--background-dark)"
								type={type as AttributeTypeName}
							/>
						</div>
					{/each}
				{/if}
			</div>
		</section>
	{/if}
</Popup>

<ConfirmationPopup
	bind:this={confirmDeletePopup}
	title="Delete field?"
	onconfirm={() => {
		owner.attributes = owner.attributes.filter(a => a !== attribute!);
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

	.randomizer-parameter {
		display: flex;
		gap: 0.5rem;
		align-items: center;

		> span {
			text-transform: capitalize;
			color: var(--foreground);
		}
	}

	.type {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin-right: 2.5rem;
	}

	section {
		display: grid;
		grid-template-columns: 1fr 3fr;
		height: 100%;
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
