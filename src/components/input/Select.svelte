<script lang="ts">
	import RightArrow from "../icons/ArrowIcon.svelte";
	import type { Icon } from "../../api/components";

	export type ComplexOption = { name: string; icon?: Icon; color?: string; style?: string };
	export type SelectOption = string | ComplexOption;

	let {
		options,
		onSelect = () => {},
		itemOverride,
		value = $bindable(),
		title = undefined,
		children,
		width = "20rem",
		height = "fit-content",
		locked,
		additionalButtonText,
		additionalButtonClick,
		isError,
		...rest
	}: {
		value?: SelectOption;
		width?: string;
		height?: string;
		itemOverride?: string;
		onSelect?: (value: string) => void;
		options: SelectOption[];
		title?: string;
		children?: () => any;
		locked?: boolean;
		additionalButtonText?: string;
		additionalButtonClick?: (event: MouseEvent) => void;
		isError?: boolean;
		[key: string]: unknown;
	} = $props();

	let optionsVisible = $state(false);

	function select(option: string) {
		return function () {
			optionsVisible = false;
			value = option;
			onSelect(option);
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
</script>

<svelte:document onmousedown={clickDocument} />

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div bind:this={element} class="select" {...rest} style:width>
	<!-- Select Button -->

	{#if children}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={onSelectClick} class="header" style:display="contents">
			{@render children()}
		</div>
	{:else}
		<button style:height onmousedown={onSelectClick} class="header" style:outline={isError ? "2px solid var(--red)" : "none"}>
			{#if title}
				{title}
			{:else if value}
				{@const option = options.find(
					option => typeof option !== "string" && option.name === (typeof value === "string" ? value : value!.name),
				) as ComplexOption | undefined}
				{#if option}
					{#if option.icon}
						<option.icon stroke={option.color ?? "#a6adc8"} style="width: 1rem; height: 1rem;" />
					{/if}
					<span style={option.style ?? ""}>{option.name}</span>
				{:else}
					{value}
				{/if}
			{:else}
				None Selected
			{/if}
			<RightArrow
				stroke="#b4befe"
				style="width: 1rem; height: 1rem; margin-left: auto; transform: rotate({optionsVisible
					? '180deg'
					: '90deg'}); transition: transform 0.1s;"
			/>
		</button>
	{/if}

	<!-- Options -->
	<div class="options" style:display={optionsVisible ? "flex" : "none"} style:width>
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
						<option.icon stroke={option.color ?? "#a6adc8"} style="width: 1rem; height: 1rem;" />
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
		cursor: pointer;
		border-radius: 0.25rem;
		padding: 0.25rem;
		position: relative;
		background-color: #181825;
		border: 1px solid #313244;
	}

	div,
	button {
		color: #a6adc8;
	}

	.header {
		align-items: center;
		display: flex;
		width: 100%;
		gap: 0.5rem;
		padding-left: 0.25rem;
	}

	.options {
		flex-direction: column;
		border-radius: 0.25rem;
		position: absolute;
		left: 0px;
		top: calc(100% + 0.25rem);
		background: #181825;
		border: 1px solid #313244;
		overflow: hidden;
		box-shadow: 0px 0px 0.5rem black;
		z-index: 9999;
		max-height: 10rem;
		overflow-y: auto;

		> * {
			padding: 0.5rem;
			padding-left: 0.5rem;
			color: #a6adc8;
			background-color: #181825;
			text-align: left;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.85rem;

			&:not(:last-child) {
				border-bottom: 1px solid #313244;
			}

			&:hover {
				background-color: #1e1e2e;
			}
		}
	}
</style>
