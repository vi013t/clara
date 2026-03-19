<script lang="ts">
	import { onMount } from "svelte";
	import { views, type View } from "../../api/data/structure/views.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import SplitHorizontalIcon from "../icons/SplitHorizontalIcon.svelte";
	import type { Tab } from "./Pane.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import { Project } from "../../api/project.svelte";
	import type { Dataset } from "../../api/data/dataset.svelte";
	import BookIcon from "../icons/BookIcon.svelte";
	import PencilIcon from "../icons/PencilIcon.svelte";
	import { refs } from "../../api/util/Clone.svelte";

	let {
		tabs = $bindable(),
		background,
		subpane,
		split,
		onclose,
		isMasterPaneAlive = $bindable(),
		selectedTabID = $bindable(),
		tabID = $bindable(),
		view = $bindable(),
	}: {
		tabs: Tab[];
		background: string;
		subpane: boolean;
		split: "vertical" | "horizontal" | undefined;
		onclose: () => void;
		isMasterPaneAlive: boolean;
		selectedTabID: number;
		tabID: number;
		view: View;
	} = $props();

	let tabContextMenu: ContextMenu = $state(null!);
	let tabContextMenuLeft = $state("0px");
	let tabContextMenuTop = $state("0px");
	let rightClickedTab = $state(0);
	let newTabContextMenu: ContextMenu = $state(null!);
	let paneSettingsMenu: ContextMenu = $state(null!);
	let newTabButton: HTMLElement = $state(null!);

	function closePane() {
		isMasterPaneAlive = false;
		onclose();
	}

	function createTab(dataset: Dataset) {
		return function () {
			newTabContextMenu.close();
			tabs.push({ dataset, component: null!, id: tabID++ });
			selectedTabID = tabID - 1;
		};
	}

	function tabExists(id: number) {
		return !!tabs.find(tab => tab.id === id);
	}

	function currentTab() {
		return tabs.find(tab => tab.id === selectedTabID)!;
	}

	function clickTab(id: number) {
		return function (event: MouseEvent) {
			if (event.button !== 0) return;
			if (tabExists(id)) selectedTabID = id;
		};
	}

	function rightClickTab(id: number) {
		return function (event: MouseEvent) {
			event.preventDefault();
			rightClickedTab = id;
			const pane = tabline!.closest(".pane") as HTMLElement;
			const paneRect = pane.getBoundingClientRect();
			tabContextMenuLeft = `${event.clientX - paneRect.left}px`;
			tabContextMenuTop = `${event.clientY - paneRect.top}px`;
			tabContextMenu.open();
		};
	}

	function closeTab(id: number) {
		return function () {
			if (selectedTabID === id) {
				let index = tabs.map((tab, index) => [tab, index] as [Tab, number]).find(([tab]) => tab.id === id)![1];
				selectedTabID = tabs[index === 0 ? index + 1 : index - 1].id;
			}
			tabs = tabs.filter(tab => tab.id !== id);
			if (tabs.length === 0) {
				isMasterPaneAlive = false;
				onclose();
			}
		};
	}

	function splitHorizontal() {
		split = "horizontal";
		paneSettingsMenu.close();
	}

	function splitVertical() {
		split = "vertical";
		paneSettingsMenu.close();
	}

	function setView(name: View) {
		return function () {
			tabContextMenu.close();
			view = name;
		};
	}

	let tabline: HTMLElement | null = $state(null);
	let controls: HTMLElement | null = $state(null);
	let newTabContainer: HTMLElement | null = $state(null);
	let mounted = $state(false);

	let tabWidth = $derived.by(() => {
		mounted;
		if (!tabline || !controls || !newTabContainer) return "0px";
		return `${
			(tabline.getBoundingClientRect().width -
				controls.getBoundingClientRect().width -
				newTabContainer.getBoundingClientRect().width -
				16) /
			tabs.length
		}px`;
	});

	function changeDataset(dataset: Dataset) {
		return function () {
			currentTab().dataset = dataset;
			tabContextMenu.close();
		};
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="tabs" bind:this={tabline}>
	{#each tabs as tab, index (tab.id)}
		{@const Icon = tab.editorContent ? PencilIcon : tab.dataset?.icon}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			style:left="calc(min(13rem, {tabWidth}) * {index} + 1rem)"
			style:width={tabWidth}
			style:background
			class={["tab", selectedTabID === tab.id && "selected"]}
			onmousedown={clickTab(tab.id)}
			oncontextmenu={rightClickTab(tab.id)}
		>
			<span>
				<Icon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
				{tab.editorContent ? "Editor" : (tab.dataset?.name ?? "Empty")}
			</span>
			<button onmousedown={closeTab(tab.id)}>
				<CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
			</button>
		</div>
	{/each}
	<div class="new-tab-wrapper" bind:this={newTabContainer} style:left="calc(min({tabWidth}, 13rem) * {tabs.length})">
		<button class="new-tab" onmousedown={() => newTabContextMenu.toggle()} bind:this={newTabButton}>
			<PlusIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
		</button>
		<ContextMenu bind:this={newTabContextMenu} top="100%" left="0px">
			{#each refs(Project.get().database.ref().manual()) as dataset}
				<button onmousedown={createTab(dataset)}>
					<dataset.icon stroke="#cdd6f4" style="width: 0.9rem; height: 0.9rem;" />
					<span>{dataset.name}</span>
				</button>
			{/each}
			<hr />
			{#each refs(Project.get().database.ref().generated()) as dataset}
				<button onmousedown={createTab(dataset)}>
					<dataset.icon stroke="#cdd6f4" style="width: 0.9rem; height: 0.9rem;" />
					<span>{dataset.name}</span>
				</button>
			{/each}
			<hr />
			<button>
				<CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
				<span>New Dataset</span>
			</button>
		</ContextMenu>
	</div>

	<div class="controls" bind:this={controls}>
		<button onmousedown={() => paneSettingsMenu.toggle()}>
			<GearIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
		</button>
		{#if subpane || split}
			<button onmousedown={closePane}>
				<CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
			</button>
		{/if}
		<ContextMenu bind:this={paneSettingsMenu} top="100%" left="0px">
			<button onmousedown={splitHorizontal}>
				<SplitHorizontalIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
				<span>Split horizontally</span>
			</button>
			<button onmousedown={splitVertical}>
				<SplitHorizontalIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem; rotate: 90deg;" />
				<span>Split vertically</span>
			</button>
			<hr />
			<button disabled={!subpane && !split} onmousedown={closePane}>
				<CloseIcon stroke={subpane || split ? "#f38ba8" : "#6c7086"} style="width: 0.85rem; height: 0.85rem;" />
				<span style="color: {subpane || split ? '#f38ba8' : '#6c7086'}">Close pane</span>
			</button>
		</ContextMenu>
	</div>
</div>

<ContextMenu bind:this={tabContextMenu} top={tabContextMenuTop} left={tabContextMenuLeft}>
	{#each refs(Project.get().database.ref().manual()) as dataset}
		{@const disabled = dataset.name === currentTab().dataset?.name}
		<button onmousedown={changeDataset(dataset)} {disabled}>
			<dataset.icon stroke={disabled ? "#6c7086" : "#cdd6f4"} style="width: 0.9rem; height: 0.9rem;" />
			<span>{dataset.name}</span>
		</button>
	{/each}
	<hr />
	{#each refs(Project.get().database.ref().generated()) as dataset}
		{@const disabled = dataset.name === currentTab().dataset?.name}
		<button onmousedown={changeDataset(dataset)} {disabled}>
			<dataset.icon stroke={disabled ? "#6c7086" : "#cdd6f4"} style="width: 0.9rem; height: 0.9rem;" />
			<span>{dataset.name}</span>
		</button>
	{/each}
	<hr />
	{#if currentTab().dataset}
		{#each Object.entries(views) as [name, info]}
			<button disabled={view === name} onmousedown={setView(name as View)}>
				<info.icon stroke={view === name ? "#6c7086" : "#cdd6f4"} style="width: 1rem; height: 1rem;" />
				<span>View as {name}</span>
			</button>
		{/each}
		<hr />
	{/if}
	<button>
		<CircledPlusIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem; margin-left: 0.15rem;" />
		<span>New dataset</span>
	</button>
	<button>
		<RenameIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Rename tab</span>
	</button>
	<hr />
	<button>
		<CloseIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
		<span>Close others</span>
	</button>
	<button>
		<CloseIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
		<span>Close tabs to the left</span>
	</button>
	<button>
		<CloseIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
		<span>Close tabs to the right</span>
	</button>
	<button>
		<CloseIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem;" />
		<span>Close tabs to the left</span>
	</button>
	<hr />
	<button disabled={!subpane && !split} onmousedown={() => closeTab(rightClickedTab)}>
		<CloseIcon stroke={subpane || split ? "#f38ba8" : "#6c7086"} style="width: 0.85rem; height: 0.85rem;" />
		<span style="color: {subpane || split ? '#f38ba8' : '#6c7086'}">Close tab</span>
	</button>
</ContextMenu>

<style>
	.new-tab-wrapper {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.tabs {
		background-color: #11111b;
		width: 100%;
		height: 2.5rem;
		display: flex;
		align-items: flex-end;
		padding-left: 1rem;
		overflow-y: visible;
		position: relative;
	}

	.controls {
		position: relative;
		display: flex;
		margin-left: auto;
		height: 100%;
		align-items: center;
		padding-right: 0.25rem;

		> button {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 0.5rem;
			--stroke: #cdd6f4;
			margin-top: auto;
			margin-bottom: auto;
			margin-right: 0.25rem;
			display: flex;
			align-items: center;
			justify-content: center;

			&:last-child:hover {
				--stroke: #181825;
				background-color: #f38ba8;
			}

			&:not(:last-child):hover {
				--stroke: #181825;
				background-color: #b4befe;
			}
		}
	}

	.new-tab {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.5rem;
		--stroke: #cdd6f4;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			--stroke: #181825;
			background-color: #b4befe;
		}
	}

	.tab {
		position: absolute;
		top: 7px;
		max-width: 13rem;
		height: 85%;
		border-top-right-radius: 0.5rem;
		border-top-left-radius: 0.5rem;
		border: 1px solid #313244;
		border-bottom: none;
		color: #cdd6f4;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		justify-content: space-between;
		user-select: none;
		background-color: #181825;
		flex-shrink: 1;
		transition:
			left 0.1s,
			width 0.1s;

		&:not(.selected) {
			filter: brightness(70%);
			transform: initial;
			cursor: pointer;
		}

		> span {
			text-overflow: ellipsis;
			width: calc(100% - 3rem);
			white-space: nowrap;
			display: block;
			overflow: hidden;

			:global(> *:first-child) {
				margin-right: 0.5rem;
			}
		}

		> button {
			display: flex;
			align-items: center;
			justify-content: center;
			--stroke: #cdd6f4;
			padding: 0.25rem;
			border-radius: 0.25rem;

			&:hover {
				--stroke: #181825;
				background-color: #f38ba8;
			}
		}
	}
</style>
