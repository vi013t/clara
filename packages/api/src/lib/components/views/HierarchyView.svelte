<script lang="ts">
	import { Project } from "@clara/api/project";
	import { Group, Item, ItemType, type Node } from "@clara/api/database";
	import { ContextMenu, Icon, HierarchyView, IconPicker } from "@clara/api/components";

	let {
		entry = Project.get() ? Project.get()!.database : null!,
		hideRoot = false,
		subtree = false,
		demo = false,
	}: {
		entry?: Node;
		hideRoot?: boolean;
		subtree?: boolean;
		demo?: boolean;
	} = $props();

	let expanded = $derived(hideRoot || demo);

	function toggle(event: MouseEvent) {
		if (event.button !== 0) return;
		if (
			event.composedPath().some(element => "classList" in element! && (element as HTMLElement).classList.contains("node-name"))
		) {
			return;
		}
		expanded = !expanded;
	}

	function onNameKeypress(event: KeyboardEvent) {
		if (event.key === "Enter") {
			(event.target as HTMLElement).blur();
		}
	}

	let menuTop: string = $state("");
	let menuLeft: string = $state("");
	let rightClickMenu: ContextMenu | null = $state(null);
	let nodeElement: HTMLElement;
	let clickedNode = $state(false);

	function onRightClick(event: MouseEvent) {
		clickedNode = true;
		rightClickMenu!.openAtMouse(event);
	}

	function newGroup() {
		(entry as Group).addChild(new Group("New Group"));
		rightClickMenu?.close();
		expanded = true;
	}

	function newItem(itemType?: ItemType) {
		return function () {
			(entry as Group).addChild(new Item(itemType ?? (entry as Group).defaultType, "New Item"));
			rightClickMenu?.close();
			expanded = true;
		};
	}

	let name: HTMLSpanElement | null = $state(null);

	function rename() {
		rightClickMenu?.close();
		if (!name) return;

		name.focus();
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(name);
		range.collapse(false);
		selection?.removeAllRanges();
		selection?.addRange(range);
	}

	function deleteEntry() {
		entry!.delete();
	}

	function pin(group: Group) {
		Project.get()!.pinnedGroups.push(group);
		rightClickMenu?.close();
		Project.autosave();
	}

	let iconPicker: IconPicker | null = $state(null);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section bind:this={nodeElement}>
	{#if !hideRoot || subtree}
		<button oncontextmenu={onRightClick} class={["node", clickedNode && "active"]} onmousedown={toggle}>
			<Icon name={entry.icon} />
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span
				class="node-name"
				contenteditable
				bind:textContent={() => entry.name, name => entry.setName(name)}
				onkeypress={onNameKeypress}
				spellcheck="false"
				bind:this={name}
			></span>
			{#if entry.isBranch()}
				<Icon name="ChevronRight" style="color: var(--arrow); transition: rotate 0.1s; rotate: {expanded ? '90deg' : '0deg'};" />
			{/if}
		</button>
	{/if}

	{#if entry.children.length !== 0}
		<ul class={{ expanded }}>
			{#each entry.sortedChildren as child (child.id)}
				<li style:padding-left={hideRoot && entry.isRoot ? "0px" : "1.25rem"}>
					<HierarchyView {demo} {hideRoot} entry={child} subtree />
				</li>
			{/each}
		</ul>
	{/if}

	<IconPicker bind:this={iconPicker} bind:value={() => entry.icon.name, name => (entry.icon = name)} />

	<ContextMenu onclose={() => (clickedNode = false)} left={menuLeft} top={menuTop} bind:this={rightClickMenu}>
		{#if entry.isBranch()}
			<div>
				<Icon name="CirclePlus" />
				Create
				<Icon name="ChevronRight" style="margin-left: auto;" />
				<ContextMenu>
					{#if Project.get()}
						{#each Project.get()!.types as itemType}
							<button onmousedown={newItem(itemType)}>
								<Icon name={itemType.icon.name} />
								{itemType.name}
							</button>
						{/each}
					{/if}
					<hr />
					<button onmousedown={newGroup}>
						<Icon name="PackagePlus" />
						Group
					</button>
				</ContextMenu>
			</div>
			<button onmousedown={() => pin(entry)}>
				<Icon name="Pin" />
				Pin to sidebar
			</button>
			{#if !entry.isRoot}
				<hr />
			{/if}
		{/if}
		{#if !entry.isRoot}
			<button onmousedown={rename}>
				<Icon name="TextCursorInput" />
				<span>Rename</span>
			</button>
			<button onmousedown={() => iconPicker?.open()}>
				<Icon name="Component" />
				<span>Change Icon</span>
			</button>
			<button onmousedown={deleteEntry}>
				<Icon name="Trash2" color="var(--red)" />
				<span style="color: var(--red);">Delete</span>
			</button>
		{/if}
	</ContextMenu>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	ul {
		list-style-type: none;
		flex-direction: column;
		position: relative;

		&::before {
			content: "";
			height: 90%;
			width: 1px;
			background-color: var(--border-bright);
			position: absolute;
			left: 0.85rem;
			top: 5%;
		}

		&:not(.expanded) {
			display: none;
		}

		&.expanded {
			display: flex;
		}
	}

	.node {
		font-size: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		padding: 0.25rem;
		padding-left: 0.5rem;
		border-radius: 0.25rem;
		width: 100%;
		color: var(--foreground-bright);
		--arrow: var(--border-bright);

		span {
			border-radius: 0.25rem;
			padding-left: 0.25rem;
			padding-right: 0.25rem;
			width: fit-content;
			cursor: text;

			&:not(:focus, :active) {
				user-select: none;
			}

			&:hover,
			&:focus {
				background-color: rgba(0, 0, 0, 20%);
			}
		}

		&:hover,
		&.active {
			color: var(--background-dark);
			background-color: var(--indigo);
			--arrow: var(--background-dark);
		}
	}
</style>
