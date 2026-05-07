<script lang="ts">
	import { GroupTab, views } from "@clara/api/ui";
	import { Project, type PaneLayout, type SinglePane } from "@clara/api/project";
	import { ContextMenu, Icon, LittleButton } from "@clara/api/components";
	import { Group } from "@clara/api/database";

	let { focusedPane = $bindable() }: { focusedPane: PaneLayout } = $props();

	let expanded = $state(false);
	let rightClickGroupMenu: ContextMenu;
	let rightClickViewMenu: ContextMenu;

	function rightClickGroup(event: MouseEvent, group: Group) {
		rightClickGroupMenu.openAtMouse(event);
		selectedGroup = group;
	}

	function rightClickView(event: MouseEvent) {
		rightClickViewMenu.openAtMouse(event);
	}

	function setView(name: string) {
		return function () {
			let pane = focusedPane as SinglePane;
			(pane.tabline.getTabByID(pane.selectedTabID) as GroupTab).view = name;
		};
	}

	function setGroup(group: Group) {
		return function () {
			let pane = focusedPane as SinglePane;
			(pane.tabline.getTabByID(pane.selectedTabID) as GroupTab).group = group;
		};
	}

	let selectedGroup: Group | null = $state(null);

	function unpin() {
		Project.get()!.pinnedGroups = Project.get()!.pinnedGroups.filter(group => group.id !== selectedGroup!.id);
		Project.autosave();
		rightClickGroupMenu.close();
	}
</script>

{#if Project.get()}
	<section style:align-items={expanded ? "flex-start" : "center"} style:width={expanded ? "12rem" : "2.5rem"}>
		{#if expanded}
			<div class="title">
				Sidebar
				<LittleButton style="margin-left: auto;" icon="ArrowLeftFromLine" onmousedown={() => (expanded = !expanded)} />
			</div>
		{:else}
			<LittleButton style="margin-left: auto;" icon="ArrowRightFromLine" onmousedown={() => (expanded = !expanded)} />
		{/if}

		<div>
			{#each Project.get()!.pinnedGroups as group}
				{#if expanded}
					<div style:width="100%">
						<button oncontextmenu={event => rightClickGroup(event, group)} onmousedown={setGroup(group)}>
							<Icon name={group.icon.name} />
							{group.name}
						</button>

						{#if Project.get()!.pinnedGroups.length > 1}
							<div class="handle">
								<Icon color="var(--foreground-dark)" name="GripHorizontal" />
							</div>
						{/if}
					</div>
				{:else}
					<div>
						<LittleButton
							icon={group.icon.name}
							oncontextmenu={event => rightClickGroup(event, group)}
							onmousedown={setGroup(group)}
						/>
					</div>
				{/if}
			{/each}
		</div>

		<div>
			{#each views as view}
				{#if expanded}
					<div style:width="100%">
						<button oncontextmenu={rightClickView} onmousedown={setView(view.name)}>
							<Icon name={view.icon} />
							{view.name}
						</button>
						<div class="handle">
							<Icon color="var(--foreground-dark)" name="GripHorizontal" />
						</div>
					</div>
				{:else}
					<div>
						<LittleButton icon={view.icon} oncontextmenu={rightClickView} onmousedown={setView(view.name)} />
					</div>
				{/if}
			{/each}
			{#if expanded}
				<div style:width="100%">
					<button>
						<Icon name="Pencil" />
						Editor
					</button>
				</div>
			{:else}
				<div>
					<LittleButton icon="Pencil" />
				</div>
			{/if}
		</div>
	</section>
{/if}

<ContextMenu bind:this={rightClickGroupMenu}>
	<button>
		<Icon name="Pin" onmousedown={unpin} />
		Unpin
	</button>
	<button>
		<Icon name="ScanEye" />
		Change default view
	</button>
</ContextMenu>

<ContextMenu bind:this={rightClickViewMenu}>
	<button>
		<Icon name="Pin" />
		Unpin
	</button>
</ContextMenu>

<style>
	.title {
		display: flex;
		flex-direction: row;
		color: var(--foreground);
		text-transform: uppercase;
		font-size: 0.8rem;
	}

	section {
		overflow: hidden;
		height: calc(100% - 2rem);
		background-color: var(--background-darker);
		color: var(--foreground);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		align-items: center;
		transition: width 0.1s;

		> div {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: flex-end;
			gap: 0.5rem;
			width: 100%;

			&:nth-child(2) {
				height: 50%;
			}

			&:nth-child(3) {
				flex-grow: 1;
			}

			> * {
				display: flex;
				gap: 0.5rem;
				font-size: 0.8rem;
				justify-content: space-between;
				align-items: center;
			}

			button {
				padding: 0.25rem;
				border-radius: 0.25rem;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				flex-grow: 1;
			}

			.handle {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				height: 100%;
				margin-right: 0.25rem;
				cursor: grab;
			}

			button:hover {
				background-color: var(--indigo);
				color: var(--background-darker);
			}
		}
	}
</style>
