<script lang="ts" module>
	import { HierarchyView } from "@clara/api/components";
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

		public constructor(group: number) {
			super(group);
		}

		public render = renderHierarchy;
	}
</script>

{#snippet renderHierarchy({ tab, pane, setPane }: { tab: GroupTab; pane: SinglePane; setPane: (pane: PaneLayout) => void })}
	<HierarchyView bind:entry={tab.group} {pane} {setPane} />
{/snippet}
