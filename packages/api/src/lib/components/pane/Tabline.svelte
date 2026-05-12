<script lang="ts">
	import { ContextMenu, Icon, IconPicker, LittleButton } from "@clara/api/components";
	import type { Group } from "@clara/api/database";
	import { GroupTab, MultiPane, PaneLayout, SinglePane, Tab, TabList, views } from "@clara/api/ui";
	import { onMount } from "svelte";
	import { Project } from "@clara/api/project";

	let {
		background,
		subpane,
		pane = $bindable(),
		anyPane = $bindable(),
		onclose,
	}: {
		background: string;
		subpane: boolean;
		pane: SinglePane;
		anyPane: PaneLayout;
		onclose: () => void;
	} = $props();

	let tabContextMenu: ContextMenu = $state(null!);
	let rightClickedTab = $state(0);
	let paneSettingsMenu: ContextMenu = $state(null!);
	let newTabButton: HTMLButtonElement = $state(null!);

	function closePane() {
		// TODO
		onclose();
	}

	function createTab(group?: Group, view?: string) {
		let tabGroup = (group ?? currentTab() instanceof GroupTab) ? (currentTab() as GroupTab).group : Project.get()!.database;
		let tab = new GroupTab(tabGroup.id);
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
		anyPane = new MultiPane("horizontal", pane, new SinglePane(tabline), 0.5);
		tabline.owner = (anyPane as MultiPane).panes[1] as SinglePane;

		paneSettingsMenu.close();
	}

	function splitVertical() {
		let tabline = new TabList();
		anyPane = new MultiPane("vertical", pane, new SinglePane(tabline), 0.5);
		tabline.owner = (anyPane as MultiPane).panes[1] as SinglePane;

		paneSettingsMenu.close();
	}

	function setView(name: string) {
		return function () {
			tabContextMenu.close();
			currentTab<GroupTab>().view = name;
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
			pane.tabline.count()
		}px`;
	});

	onMount(() => {
		mounted = true;
	});

	let tabIconPicker: IconPicker | null = $state(null);
	let changeTabIconButton: HTMLButtonElement | undefined = $state(undefined);
</script>

<div class="tabs" bind:this={tabline}>
	{#each pane.tabline.tabs as tab, index (tab.id)}
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
			<IconPicker
				bind:this={tabIconPicker}
				bind:value={() => tab.icon.name, name => (tab.icon = name)}
				opener={changeTabIconButton ?? null}
			/>
			<span>
				<LittleButton bind:element={changeTabIconButton} icon={tab.icon} onmousedown={() => tabIconPicker?.open()} />
				{tab.title}
			</span>
			<LittleButton accent="var(--red)" icon="X" size={16} onmousedown={closeTab(tab.id)} />
		</div>
	{/each}
	<div class="new-tab-wrapper" bind:this={newTabContainer} style:left="calc(min({tabWidth}, 13rem) * {pane.tabline.count()})">
		<LittleButton
			icon="Plus"
			color="var(--foreground)"
			style="
				margin-top: auto;
				margin-bottom: auto;
				margin-left: 0.5rem;
				display: flex;
				align-items: center;
				justify-content: center;
			"
			size={16}
			onmousedown={() => createTab()}
			bind:element={newTabButton}
		/>
	</div>

	<div class="controls" bind:this={controls}>
		<button onmousedown={() => paneSettingsMenu.toggle()}>
			<LittleButton icon="Settings" size={16} color="var(--foreground)" />
		</button>
		<LittleButton accent="var(--red)" icon="X" size={16} onmousedown={closePane} color="var(--foreground)" />
		<ContextMenu top="100%" right="0.25rem" bind:this={paneSettingsMenu}>
			<button onmousedown={splitHorizontal}>
				<Icon name="Columns2" size={16} />
				<span>Split horizontally</span>
			</button>
			<button onmousedown={splitVertical}>
				<Icon name="Rows2" size={16} />
				<span>Split vertically</span>
			</button>
			<hr />
			<button disabled={!subpane && pane.split === "none"} onmousedown={closePane}>
				<Icon name="X" scale={18} />
				<span style="color: {subpane || pane.split !== 'none' ? 'var(--red)' : '#6c7086'}">Close pane</span>
			</button>
		</ContextMenu>
	</div>
</div>

<ContextMenu bind:this={tabContextMenu}>
	<button>
		<Icon name="ScanEye" size={16} style="margin-left: 0.15rem;" />
		<span>Switch view</span>
		<ContextMenu>
			{#each views as view}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div onmousedown={setView(view.name)}>
					<Icon name={view.icon} size={16} />
					<span style:text-transform="capitalize">{view.name}</span>

					<Icon name="ChevronRight" style="margin-left: auto;" />
					<ContextMenu>
						<button>
							<Icon name="Crosshair" size={16} />
							<span>In this tab</span>
						</button>
						<button>
							<Icon name="Plus" size={16} />
							<span>In new tab</span>
						</button>
						<button>
							<Icon name="ChevronLeft" size={16} />
							<span>In new tab to the left</span>
						</button>
						<hr />
						<button>
							<Icon name="Columns2" size={16} />
							<span>In split right</span>
						</button>
						<button>
							<Icon name="Columns2" size={16} />
							<span>In split left</span>
						</button>
						<button>
							<Icon name="Rows2" size={16} />
							<span>In split bottom</span>
						</button>
						<button>
							<Icon name="Rows2" size={16} />
							<span>In split top</span>
						</button>
					</ContextMenu>
				</div>
			{/each}
		</ContextMenu>
	</button>
	<hr />
	<button>
		<Icon name="TextCursorInput" size={16} />
		<span>Rename tab</span>
	</button>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={[!subpane && pane.split === "none" && "disabled"]} onmousedown={() => closeTab(rightClickedTab)}>
		<Icon name="X" size={16} />
		<span style="color: {subpane || pane.split !== 'none' ? 'var(--red)' : '#6c7086'}">Close tab</span>
		<ContextMenu>
			<button>
				<Icon name="X" size={16} />
				<span>Close others</span>
			</button>
			<button>
				<Icon name="X" size={16} />
				<span>Close tabs to the left</span>
			</button>
			<button>
				<Icon name="X" size={16} />
				<span>Close tabs to the right</span>
			</button>
			<button>
				<Icon name="X" size={16} />
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
			display: flex;
			overflow: hidden;

			:global(> *:first-child) {
				margin-right: 0.5rem;
			}
		}
	}
</style>
