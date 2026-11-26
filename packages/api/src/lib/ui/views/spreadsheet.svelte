<script lang="ts" module>
	import { SpreadsheetView } from "@clara/api/components";
	import type { Group, ItemType } from "@clara/api/database";
	import {
		AttributeTab,
		getIcon,
		GroupTab,
		GroupView,
		ItemTab,
		Tab,
		type SinglePane,
		type View,
		type ViewType,
	} from "@clara/api/ui";
	import type { ViewFactory } from "../views.svelte.ts";

	export const spreadsheetFactory: ViewFactory<"group"> = {
		identifier: "spreadsheet",
		icon: getIcon("Table2"),
		type: "group",
		createTab(tab: Tab<View<ViewType>, ViewType>): Tab<GroupView> {
			if (tab instanceof GroupTab) {
				const newTab = new GroupTab(tab.group.id);
				newTab.view = new Spreadsheet({ itemType: tab.group.defaultType, group: tab.group });
				return newTab;
			}

			if (tab instanceof ItemTab) {
				const newTab = new GroupTab(tab.item.parent!.id);
				newTab.view = new Spreadsheet({ itemType: tab.item.type, group: tab.item.parent! });
				return newTab;
			}

			if (tab instanceof AttributeTab) {
				const newTab = new GroupTab(tab.item.parent!.id);
				newTab.view = new Spreadsheet({ itemType: tab.item.type, group: tab.item.parent! });
				return newTab;
			}

			throw new Error("Unreachable: Attempted to open spreadsheet in unknown tab type.");
		},
	};

	export class Spreadsheet extends GroupView {
		public readonly identifier = "spreadsheet";
		public itemType: ItemType;
		public render = renderSpreadsheet;

		public constructor({ itemType, group }: { itemType: ItemType; group: Group }) {
			super(group.id);
			this.itemType = $state(itemType);
		}
	}
</script>

{#snippet renderSpreadsheet({ tab, pane }: { tab: GroupTab; pane: SinglePane })}
	<SpreadsheetView bind:spreadsheet={tab.view as Spreadsheet} {pane} />
{/snippet}
