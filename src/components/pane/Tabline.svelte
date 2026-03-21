<script lang="ts">
	import { onMount } from "svelte";
	import type { Group } from "../../api/data/database.svelte";
	import { Project } from "../../api/project.svelte";
	import { EditorTab, GroupTab, Tab, type TabList } from "../../api/ui/tab.svelte";
	import { views, type View } from "../../api/ui/views.svelte";
	import ArrowIcon from "../icons/ArrowIcon.svelte";
	import CircledPlusIcon from "../icons/CircledPlusIcon.svelte";
	import CloseIcon from "../icons/CloseIcon.svelte";
	import EyeIcon from "../icons/EyeIcon.svelte";
	import GearIcon from "../icons/GearIcon.svelte";
	import PencilIcon from "../icons/PencilIcon.svelte";
	import PlusIcon from "../icons/PlusIcon.svelte";
	import RenameIcon from "../icons/RenameIcon.svelte";
	import SplitHorizontalIcon from "../icons/SplitHorizontalIcon.svelte";
	import SpreadsheetIcon from "../icons/SpreadsheetIcon.svelte";
	import ContextMenu from "../menus/ContextMenu.svelte";

	let {
		tabs = $bindable(),
		background,
		subpane,
		split,
		onclose,
		isMasterPaneAlive = $bindable(),
		selectedTabID = $bindable(),
	}: {
		tabs: TabList;
		background: string;
		subpane: boolean;
		split: "vertical" | "horizontal" | undefined;
		onclose: () => void;
		isMasterPaneAlive: boolean;
		selectedTabID: number;
	} = $props();

	let tabContextMenu: ContextMenu = $state(null!);
	let rightClickedTab = $state(0);
	let newTabContextMenu: ContextMenu = $state(null!);
	let paneSettingsMenu: ContextMenu = $state(null!);
	let newTabButton: HTMLElement = $state(null!);

	function closePane() {
		isMasterPaneAlive = false;
		onclose();
	}

	function createTab(group: Group, view?: View) {
		return function () {
			newTabContextMenu.close();
			let tab = new GroupTab(group);
			tabs.appendTab(tab);
			selectedTabID = tab.id;
		};
	}

	function currentTab<T extends Tab>(): T {
		return tabs.getTabByID(selectedTabID) as T;
	}

	function clickTab(id: number) {
		return function (event: MouseEvent) {
			if (event.button !== 0) return;
			if (tabs.tabExists(id)) selectedTabID = id;
		};
	}

	function rightClickTab(id: number) {
		return function (event: MouseEvent) {
			event.preventDefault();
			rightClickedTab = id;
			tabContextMenu.openAtMouse(event);
		};
	}

	function closeTab(id: number) {
		return function () {
			if (selectedTabID === id) {
				let index = tabs.indexOfID(id);
				selectedTabID = tabs.getTabByIndex(index === 0 ? index + 1 : index - 1).id;
			}
			tabs.deleteTab(id);
			if (tabs.isEmpty()) {
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
			currentTab<GroupTab>().view = name;
		};
	}

	function currentView(): View {
		return currentTab<GroupTab>().view;
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
			tabs.count()
		}px`;
	});

	function changeTabGroup(group: Group, view?: View) {
		return function () {
			group.thanksgivingDinner();
			group.cutOff();
			if (currentTab() instanceof GroupTab) {
				currentTab<GroupTab>().group = group;
			} else {
				let newTab = new GroupTab(group);
				tabs.replace(currentTab().id, newTab);
				selectedTabID = newTab.id;
			}

			if (view) setView(view)();
			tabContextMenu.close();
		};
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="tabs" bind:this={tabline}>
	{#each tabs.tabs as tab, index (tab.id)}
		{@const Icon = tab instanceof EditorTab ? PencilIcon : tab instanceof GroupTab ? tab.group.icon.component : undefined}
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
				{tab instanceof EditorTab ? "Editor" : tab instanceof GroupTab ? tab.group.name : "Empty"}
			</span>
			<button onmousedown={closeTab(tab.id)}>
				<CloseIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
			</button>
		</div>
	{/each}
	<div class="new-tab-wrapper" bind:this={newTabContainer} style:left="calc(min({tabWidth}, 13rem) * {tabs.count()})">
		<button class="new-tab" onmousedown={() => newTabContextMenu.toggle()} bind:this={newTabButton}>
			<PlusIcon stroke="var(--stroke)" style="width: 0.85rem; height: 0.85rem;" />
		</button>
		<ContextMenu bind:this={newTabContextMenu} top="100%" left="0px">
			{#each Project.get()!.database.children.filter(child => child.isBranch()) as group}
				<button onmousedown={createTab(group)}>
					<group.icon.component stroke="#cdd6f4" style="width: 0.9rem; height: 0.9rem;" />
					<span>{group.name}</span>
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
		<ContextMenu top="100%" right="0.25rem" bind:this={paneSettingsMenu}>
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

<ContextMenu bind:this={tabContextMenu}>
	<button>
		<SpreadsheetIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem; margin-left: 0.15rem;" />
		<span>Open dataset</span>

		<ContextMenu>
			{#each Project.get()!.database.children.filter(child => child.isBranch()) as group}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div onmousedown={changeTabGroup(group)}>
					<group.icon.component stroke={"#cdd6f4"} style="width: 0.9rem; height: 0.9rem;" />
					<span>{group.name}</span>

					<ContextMenu>
						{#each Object.entries(views) as [viewName, info]}
							<div onmousedown={changeTabGroup(group, viewName as View)}>
								<info.icon stroke={"#cdd6f4"} style="width: 1rem; height: 1rem;" />
								<span>As {viewName}</span>

								<ArrowIcon style="width: 1rem; height: 1rem; rotate: 90deg; margin-left: auto;" />
								<ContextMenu>
									<button>
										<EyeIcon />
										<span>In this tab</span>
									</button>
									<button>
										<PlusIcon />
										<span>In new tab</span>
									</button>
									<button>
										<PlusIcon />
										<span>In new tab to the left</span>
									</button>
									<hr />
									<button>
										<SplitHorizontalIcon />
										<span>In split right</span>
									</button>
									<button>
										<SplitHorizontalIcon />
										<span>In split left</span>
									</button>
									<button>
										<SplitHorizontalIcon style="rotate: 90deg;" />
										<span>In split bottom</span>
									</button>
									<button>
										<SplitHorizontalIcon style="rotate: 90deg;" />
										<span>In split top</span>
									</button>
								</ContextMenu>
							</div>
						{/each}
					</ContextMenu>
				</div>
			{/each}
		</ContextMenu>
	</button>
	<button>
		<EyeIcon stroke="#cdd6f4" style="width: 0.85rem; height: 0.85rem; margin-left: 0.15rem;" />
		<span>Open view</span>
		<ContextMenu>
			{#each Object.entries(views) as [viewName, info]}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div onmousedown={setView(viewName as View)}>
					<info.icon stroke={"#cdd6f4"} style="width: 1rem; height: 1rem;" />
					<span style:text-transform="capitalize">{viewName}</span>

					<ArrowIcon stroke={"#cdd6f4"} style="width: 1rem; height: 1rem; rotate: 90deg; margin-left: auto;" />
					<ContextMenu>
						<button>
							<EyeIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
							<span>In this tab</span>
						</button>
						<button>
							<PlusIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
							<span>In new tab</span>
						</button>
						<button>
							<PlusIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
							<span>In new tab to the left</span>
						</button>
						<hr />
						<button>
							<SplitHorizontalIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
							<span>In split right</span>
						</button>
						<button>
							<SplitHorizontalIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem;" />
							<span>In split left</span>
						</button>
						<button>
							<SplitHorizontalIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem; rotate: 90deg;" />
							<span>In split bottom</span>
						</button>
						<button>
							<SplitHorizontalIcon stroke="#cdd6f4" style="width: 1rem; height: 1rem; rotate: 90deg;" />
							<span>In split top</span>
						</button>
					</ContextMenu>
				</div>
			{/each}
		</ContextMenu>
	</button>
	<hr />
	<button>
		<RenameIcon stroke="#cdd6f4" style="width: 1.2rem; height: 1.2rem;" />
		<span>Rename tab</span>
	</button>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={[!subpane && !split && "disabled"]} onmousedown={() => closeTab(rightClickedTab)}>
		<CloseIcon stroke={subpane || split ? "#f38ba8" : "#6c7086"} style="width: 0.85rem; height: 0.85rem;" />
		<span style="color: {subpane || split ? '#f38ba8' : '#6c7086'}">Close tab</span>
		<ContextMenu>
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
		</ContextMenu>
	</div>
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
