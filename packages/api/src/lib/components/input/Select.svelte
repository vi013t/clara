<script lang="ts">
	import { Icon } from "@clara/api/components";
	import LittleButton from "../widgets/LittleButton.svelte";
	import { getIcon, type IconIdentifier } from "@clara/api/icons";

	export type ComplexOption = { name: string; icon?: IconIdentifier; color?: string; style?: string };
	export type SelectOption = string | ComplexOption;

	let {
		options,
		locked = false,
		lockable = undefined,
		onunlock = (unlock: () => void) => {
			unlock();
		},
		itemOverride,
		value = $bindable(),
		title = undefined,
		children,
		width = "20rem",
		height = "fit-content",
		additionalButtonText,
		additionalButtonClick,
		isError,
		emptyText = "None Selected",
		noarrow = false,
		...rest
	}: {
		value?: SelectOption;
		width?: string;
		height?: string;
		lockable?: boolean;
		itemOverride?: string;
		emptyText?: string;
		options: SelectOption[];
		title?: string;
		children?: () => any;
		noarrow?: boolean;
		locked?: boolean;
		onunlock?: (unlock: () => void) => void;
		additionalButtonText?: string;
		additionalButtonClick?: (event: MouseEvent) => void;
		isError?: boolean;
		[key: string]: unknown;
	} = $props();

	// svelte-ignore state_referenced_locally
	if (lockable === undefined) lockable = locked;

	let optionsVisible = $state(false);

	function select(option: string) {
		return function () {
			optionsVisible = false;
			value = option;
		};
	}

	let element: HTMLElement;

	function onSelectClick(event: MouseEvent) {
		if (locked) return;
		optionsVisible = !optionsVisible;
	}

	function clickDocument(event: MouseEvent) {
		if (!event.composedPath().includes(element)) {
			optionsVisible = false;
		}
	}

	function unlock() {
		locked = false;
	}

	function toggleLocked() {
		console.log("toggle", locked);
		if (!locked) {
			locked = true;
			return;
		}

		console.log("calling onunlock");
		onunlock(unlock);
	}
</script>

<svelte:document onmousedown={clickDocument} />

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div style:cursor={locked ? "not-allowed" : "pointer"} bind:this={element} class="select" {...rest} style:width>
	<div class="input">
		{#if children}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div style:cursor={locked ? "not-allowed" : "pointer"} onmousedown={onSelectClick} class="header" style:display="contents">
				{@render children()}
			</div>
		{:else}
			<button
				style:height
				onmousedown={onSelectClick}
				class="header"
				style:cursor={locked ? "not-allowed" : "pointer"}
				style:outline={isError ? "2px solid var(--red)" : "none"}
			>
				{#if title}
					{title}
				{:else if value}
					{@const option = options.find(
						option => typeof option !== "string" && option.name === (typeof value === "string" ? value : value!.name),
					) as ComplexOption | undefined}
					{#if option}
						{#if option.icon}
							{@const OptionIcon = getIcon(option.icon).component}
							<OptionIcon size={16} stroke={option.color ?? "var(--foreground)"} />
						{/if}
						<span style={option.style ?? ""}>{option.name}</span>
					{:else}
						{value}
					{/if}
				{:else}
					{emptyText}
				{/if}
				{#if !noarrow}
					<Icon
						size={16}
						name="ChevronRight"
						style="margin-left: auto; transform: rotate({optionsVisible ? '90deg' : '0'}); transition: transform 0.1s;"
					/>
				{/if}
			</button>
		{/if}
		{#if lockable}
			<LittleButton
				onmousedown={toggleLocked}
				size={16}
				style="border: 1px solid var(--border);"
				icon={locked ? "Lock" : "LockOpen"}
			/>
		{/if}
	</div>

	<!-- Options -->
	<div class={["options", optionsVisible && "visible"]}>
		{#each options as option}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				onmousedown={select(typeof option === "string" ? option : option.name)}
				style={typeof option !== "string" && option.style ? option.style : ""}
			>
				{#if typeof option === "string"}
					{option}
				{:else}
					{#if option.icon}
						{@const OptionIcon = getIcon(option.icon).component}
						<OptionIcon size={16} stroke={option.color ?? "var(--foreground)"} style="width: 1rem; height: 1rem;" />
					{/if}
					{#if itemOverride}
						{itemOverride}
					{:else}
						{option.name}
					{/if}
				{/if}
			</div>
		{/each}

		{#if additionalButtonText}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div onmousedown={additionalButtonClick}>
				{additionalButtonText}
			</div>
		{/if}
	</div>
</div>

<style>
	.select {
		position: relative;
		background-color: var(--background-dark);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
	}

	.input {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	div,
	button {
		color: var(--foreground);
	}

	.header {
		align-items: center;
		display: flex;
		width: 100%;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.options {
		flex-direction: column;
		border-radius: 0.25rem;
		position: absolute;
		left: 0px;
		top: calc(100% + 0.25rem);
		background: var(--background-darker);
		border: 1px solid var(--border);
		overflow: hidden;
		box-shadow: 0px 0px 0.5rem black;
		z-index: 9999;
		height: 10rem;
		overflow-y: auto;
		display: flex;
		width: 100%;
		max-height: 0rem;
		opacity: 0%;
		transition:
			max-height 0.1s,
			opacity 0.1s step-end;
		padding: 0.25rem;
		gap: 0.25rem;

		&.visible {
			max-height: 10rem;
			opacity: 100%;
			transition:
				max-height 0.1s,
				opacity 0.1s step-start;
		}

		> * {
			padding: 0.25rem;
			padding-left: 0.5rem;
			color: var(--foreground);
			background: var(--background-darker);
			text-align: left;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.85rem;
			user-select: none;
			border-radius: 0.25rem;

			&:hover {
				background-color: #252634;
			}
		}
	}
</style>
