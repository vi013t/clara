<script lang="ts" module>
	import { HierarchyView } from "@clara/api/components";
	import type { Group } from "@clara/api/database";
	import { Project } from "@clara/api/project";
	import {
		AttributeTab,
		getIcon,
		GroupTab,
		GroupView,
		ItemTab,
		PaneLayout,
		SinglePane,
		Tab,
		type View,
		type ViewType,
	} from "@clara/api/ui";
	import { SvelteSet } from "svelte/reactivity";
	import type { ViewFactory } from "../views.svelte.ts";

	export const hierarchyFactory: ViewFactory<"group"> = {
		identifier: "hierarchy",
		icon: getIcon("FolderTree"),
		type: "group",
		createTab(tab: Tab<View<ViewType>, ViewType>): Tab<GroupView> {
			if (tab instanceof GroupTab) {
				const newTab = new GroupTab(tab.group.id);
				newTab.view = new Hierarchy(tab.group.id);
				return newTab;
			}

			if (tab instanceof ItemTab) {
				const newTab = new GroupTab(tab.item.parent!.id);
				newTab.view = new Hierarchy(tab.item.parent!.id);
				return newTab;
			}

			if (tab instanceof AttributeTab) {
				const newTab = new GroupTab(tab.item.parent!.id);
				newTab.view = new Hierarchy(tab.item.parent!.id);
				return newTab;
			}

			throw new Error("Unreachable: Attempted to open hierarchy in unknown tab type.");
		},
	};

	export class Hierarchy extends GroupView {
		public readonly identifier = "hierarchy";
		public render = renderHierarchy;
		private expanded = $state(new SvelteSet<Group>());

		public constructor(group: number) {
			super(group);
		}

		public isExpanded(group: Group): boolean {
			return this.expanded.has(group);
		}

		public toggleExpanded(group: Group): void {
			if (this.expanded.has(group)) {
				this.expanded.delete(group);
			} else {
				this.expanded.add(group);
			}
		}
	}
</script>

{#snippet renderHierarchy({ tab, pane, setPane }: { tab: GroupTab; pane: SinglePane; setPane: (pane: PaneLayout) => void })}
	<HierarchyView
		database={Project.get()!.database}
		bind:hierarchy={tab.view as Hierarchy}
		bind:entry={tab.group}
		{pane}
		{setPane}
	/>
{/snippet}
