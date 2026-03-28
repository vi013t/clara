<script lang="ts">
	import { ContextMenu } from "@clara/api/components";
	import type { Group } from "@clara/api/database";
	import {
		ArrowIcon,
		CloseIcon,
		EyeIcon,
		GearIcon,
		PencilIcon,
		PlusIcon,
		RenameIcon,
		ReticleIcon,
		SplitHorizontalIcon,
	} from "@clara/api/icons";
	import { EditorTab, GroupTab, Tab, TabList, views, type View } from "@clara/api/ui";
	import { onMount } from "svelte";
	import type { AnyPane, SinglePane } from "./Pane.svelte";
	let {
		background,
		subpane,
		pane,
		anyPane = $bindable(),
		onclose,
	}: {
		background: string;
		subpane: boolean;
		pane: SinglePane;
		anyPane: AnyPane;
		onclose: () => void;
	} = $props();

	let tabContextMenu: ContextMenu = $state(null!);
	let rightClickedTab = $state(0);
	let paneSettingsMenu: ContextMenu = $state(null!);
	let newTabButton: HTMLElement = $state(null!);

	function closePane() {
		// TODO
		onclose();
	}

	function createTab(group?: Group, view?: View) {
		let tab = new GroupTab(group ?? (currentTab() as GroupTab).group);
		if (view) tab.view = view;
		pane.tabline.appendTab(tab);
		pane.selectedTabID = tab.id;
	}

	function currentTab<T extends Tab>(): T {
		return pane.tabline.getTabByID(pane.selectedTabID) as T;
	}

	function clickTab(id: number) {
		return function (event: MouseEvent) {
			if (event.button !== 0) return;
			if (pane.tabline.tabExists(id)) pane.selectedTabID = id;
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
			if (pane.selectedTabID === id) {
				let index = pane.tabline.indexOfID(id);
				pane.selectedTabID = pane.tabline.getTabByIndex(index === 0 ? index + 1 : index - 1).id;
			}
			pane.tabline.deleteTab(id);
			if (pane.tabline.isEmpty()) {
				onclose();
			}
		};
	}

	function splitHorizontal() {
		let tabline = new TabList();
		anyPane = {
			split: "horizontal",
			percent: 0.5,
			panes: [pane, { split: "none", tabline, selectedTabID: tabline.tabs[0].id }],
		};

		paneSettingsMenu.close();
	}

	function splitVertical() {
		let tabline = new TabList();
		anyPane = {
			split: "vertical",
			percent: 0.5,
			panes: [pane, { split: "none", tabline, selectedTabID: tabline.tabs[0].id }],
		};

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
			pane.tabline.count()
		}px`;
	});

	function changeTabGroup(group: Group, view?: View) {
		return function () {
			group.thanksgivingDinner();
			group.emancipate();
			if (currentTab() instanceof GroupTab) {
				currentTab<GroupTab>().group = group;
			} else {
				let newTab = new GroupTab(group);
				pane.tabline.replace(currentTab().id, newTab);
				pane.selectedTabID = newTab.id;
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
	{#each pane.tabline.tabs as tab, index (tab.id)}
		{@const Icon = tab instanceof EditorTab ? PencilIcon : tab instanceof GroupTab ? tab.group.icon.component : undefined}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			style:left="calc(min(13rem, {tabWidth}) * {index} + 1rem)"
			style:width={tabWidth}
			style:background
			class={["tab", pane.selectedTabID === tab.id && "selected"]}
			onmousedown={clickTab(tab.id)}
			oncontextmenu={rightClickTab(tab.id)}
		>
			<span>
				<Icon scale={0.85} />
				{tab instanceof EditorTab ? "Editor" : tab instanceof GroupTab ? tab.group.name : "Empty"}
			</span>
			<button onmousedown={closeTab(tab.id)}>
				<CloseIcon stroke="var(--stroke)" scale={0.85} />
			</button>
		</div>
	{/each}
	<div class="new-tab-wrapper" bind:this={newTabContainer} style:left="calc(min({tabWidth}, 13rem) * {pane.tabline.count()})">
		<button class="new-tab" onmousedown={() => createTab()} bind:this={newTabButton}>
			<PlusIcon stroke="var(--stroke)" scale={0.85} />
		</button>
	</div>

	<div class="controls" bind:this={controls}>
		<button onmousedown={() => paneSettingsMenu.toggle()}>
			<GearIcon stroke="var(--stroke)" scale={0.85} />
		</button>
		{#if subpane || pane.split !== "none"}
			<button onmousedown={closePane}>
				<CloseIcon stroke="var(--stroke)" scale={0.85} />
			</button>
		{/if}
		<ContextMenu top="100%" right="0.25rem" bind:this={paneSettingsMenu}>
			<button onmousedown={splitHorizontal}>
				<SplitHorizontalIcon stroke="var(--foreground-bright)" scale={1.2} />
				<span>Split horizontally</span>
			</button>
			<button onmousedown={splitVertical}>
				<SplitHorizontalIcon stroke="var(--foreground-bright)" scale={1.2} style="rotate: 90deg;" />
				<span>Split vertically</span>
			</button>
			<hr />
			<button disabled={!subpane && pane.split === "none"} onmousedown={closePane}>
				<CloseIcon stroke={subpane || pane.split !== "none" ? "var(--red)" : "#6c7086"} scale={0.85} />
				<span style="color: {subpane || pane.split !== 'none' ? 'var(--red)' : '#6c7086'}">Close pane</span>
			</button>
		</ContextMenu>
	</div>
</div>

<ContextMenu bind:this={tabContextMenu}>
	<button>
		<EyeIcon stroke="var(--foreground-bright)" scale={0.85} style="margin-left: 0.15rem;" />
		<span>Switch view</span>
		<ContextMenu>
			{#each Object.entries(views) as [viewName, info]}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div onmousedown={setView(viewName as View)}>
					<info.icon stroke={"var(--foreground-bright)"} />
					<span style:text-transform="capitalize">{viewName}</span>

					<ArrowIcon stroke={"var(--foreground-bright)"} style="rotate: 90deg; margin-left: auto;" />
					<ContextMenu>
						<button>
							<ReticleIcon />
							<span>In this tab</span>
						</button>
						<button>
							<PlusIcon />
							<span>In new tab</span>
						</button>
						<button>
							<ArrowIcon style="rotate: 270deg;" />
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
							<SplitHorizontalIcon />
							<span>In split bottom</span>
						</button>
						<button>
							<SplitHorizontalIcon />
							<span>In split top</span>
						</button>
					</ContextMenu>
				</div>
			{/each}
		</ContextMenu>
	</button>
	<hr />
	<button>
		<RenameIcon stroke="var(--foreground-bright)" scale={1.2} />
		<span>Rename tab</span>
	</button>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={[!subpane && pane.split === "none" && "disabled"]} onmousedown={() => closeTab(rightClickedTab)}>
		<CloseIcon stroke={subpane || pane.split !== "none" ? "var(--red)" : "#6c7086"} scale={0.85} />
		<span style="color: {subpane || pane.split !== 'none' ? 'var(--red)' : '#6c7086'}">Close tab</span>
		<ContextMenu>
			<button>
				<CloseIcon scale={0.85} />
				<span>Close others</span>
			</button>
			<button>
				<CloseIcon scale={0.85} />
				<span>Close tabs to the left</span>
			</button>
			<button>
				<CloseIcon scale={0.85} />
				<span>Close tabs to the right</span>
			</button>
			<button>
				<CloseIcon scale={0.85} />
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
		background-color: var(--background-darker);
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
			--stroke: var(--foreground-bright);
			margin-top: auto;
			margin-bottom: auto;
			margin-right: 0.25rem;
			display: flex;
			align-items: center;
			justify-content: center;

			&:last-child:hover {
				--stroke: var(--background-dark);
				background-color: var(--red);
			}

			&:not(:last-child):hover {
				--stroke: var(--background-dark);
				background-color: var(--indigo);
			}
		}
	}

	.new-tab {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.5rem;
		--stroke: var(--foreground-bright);
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			--stroke: var(--background-dark);
			background-color: var(--indigo);
		}
	}

	.tab {
		position: absolute;
		top: 7px;
		max-width: 13rem;
		height: 85%;
		border-top-right-radius: 0.5rem;
		border-top-left-radius: 0.5rem;
		border: 1px solid var(--border);
		border-bottom: none;
		color: var(--foreground-bright);
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		justify-content: space-between;
		user-select: none;
		background-color: var(--background-dark);
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
			--stroke: var(--foreground-bright);
			padding: 0.25rem;
			border-radius: 0.25rem;

			&:hover {
				--stroke: var(--background-dark);
				background-color: var(--red);
			}
		}
	}
</style>
