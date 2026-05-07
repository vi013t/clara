<script lang="ts">
	import { GroupTab, views } from "@clara/api/ui";
	import { Project, type PaneLayout, type SinglePane } from "@clara/api/project";
	import { ContextMenu, Icon, LittleButton } from "@clara/api/components";
	import type { Group } from "@clara/api/database";

	let { focusedPane = $bindable() }: { focusedPane: PaneLayout } = $props();

	let expanded = $state(false);
	let rightClickGroupMenu: ContextMenu;
	let rightClickViewMenu: ContextMenu;

	function rightClickGroup(event: MouseEvent) {
		rightClickGroupMenu.openAtMouse(event);
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
</script>

{#if Project.get()}
	<section style:align-items={expanded ? "flex-start" : "center"}>
		<LittleButton
			style="margin-left: auto;"
			icon={expanded ? "ArrowLeftFromLine" : "ArrowRightFromLine"}
			onmousedown={() => (expanded = !expanded)}
		/>
		<div style:width={expanded ? "100%" : undefined}>
			{#each Project.get()!.pinnedGroups as group}
				{#if expanded}
					<button style:width="100%" oncontextmenu={rightClickGroup} onmousedown={setGroup(group)}>
						<Icon name={group.icon.name} />
						{group.name}
					</button>
				{:else}
					<div>
						<LittleButton icon={group.icon.name} oncontextmenu={rightClickGroup} onmousedown={setGroup(group)} />
					</div>
				{/if}
			{/each}
		</div>
		<div style:width={expanded ? "100%" : undefined}>
			{#each views as view}
				{#if expanded}
					<button style:width="100%" oncontextmenu={rightClickView} onmousedown={setView(view.name)}>
						<Icon name={view.icon} />
						{view.name}
					</button>
				{:else}
					<div>
						<LittleButton icon={view.icon} oncontextmenu={rightClickView} onmousedown={setView(view.name)} />
					</div>
				{/if}
			{/each}
		</div>
	</section>
{/if}

<ContextMenu bind:this={rightClickGroupMenu}>
	<button>
		<Icon name="Pin" />
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
	section {
		width: fit-content;
		height: 100%;
		background-color: var(--background-darker);
		color: var(--foreground);
		padding: 0.5rem;
		border-top: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		align-items: center;

		> div {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: flex-end;
			gap: 0.5rem;

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
				justify-content: flex-start;
				align-items: center;
			}

			button {
				padding: 0.25rem;
				border-radius: 0.25rem;
			}

			button:hover {
				background-color: var(--indigo);
				color: var(--background-darker);
			}
		}
	}
</style>
