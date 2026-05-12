import {
	AttributeRef,
	NodeInstance,
	RichText,
	StyledText,
	type GeneratedAttribute,
	type SerializedAttributeRef,
	type SerializedRichText,
} from "@clara/api/attribute";
import { Item, type Group, type SerializedItem } from "@clara/api/database";
import { assignedLater, type Serialize } from "@clara/api/utils";
import { type IconIdentifier, getIcon, type Icon, type IconName } from "@clara/api/ui";
import { Project, type SinglePane } from "@clara/api/project";

export class Tab {
	private static tabID = 0;

	public readonly id = $state(assignedLater());
	private icon_ = $state(assignedLater<Icon>());

	public constructor(icon: IconIdentifier) {
		this.id = Tab.tabID++;
		this.icon_ = getIcon(icon);
	}

	public get icon(): Icon {
		return this.icon_;
	}

	public set icon(icon: IconIdentifier) {
		this.icon_ = getIcon(icon);
	}
}

export type SerializedGroupTab = {
	type: "group";
	view: string;
	id: number;
	group: number;
	icon: IconName;
};

export class GroupTab extends Tab implements Serialize<SerializedGroupTab> {
	private groupID = $state(assignedLater<number>());
	public view: string = $state("Hierarchy");

	public constructor(group: number, icon?: IconIdentifier) {
		super(
			icon ??
				Project.get()!
					.database.dfs()
					.find(node => node.id === group)!.icon,
		);
		this.groupID = group;
		console.log(this.view);
	}

	public get group(): Group {
		return Project.get()!
			.database.dfs()
			.find(node => node.id === this.groupID)! as Group;
	}

	public set group(group: Group) {
		this.groupID = group.id;
	}

	public serialize(): SerializedGroupTab {
		return {
			type: "group",
			id: this.id,
			group: this.groupID,
			view: this.view,
			icon: this.icon.name,
		};
	}

	public static deserialize(tab: SerializedGroupTab): GroupTab {
		const group = new GroupTab(tab.group, tab.icon);
		group.view = tab.view;
		(group as any).id = tab.id;
		return group;
	}
}

export abstract class AttributeTab extends Tab {
	public attribute: AttributeRef;

	public constructor(attribute: AttributeRef) {
		super(attribute.item.type.icon);
		this.attribute = $state(attribute);
	}

	public get item(): Item {
		return this.attribute.item;
	}
}

export class NodeEditorTab extends AttributeTab {
	public constructor(attribute: AttributeRef) {
		super(attribute);
	}

	public get nodes(): NodeInstance[] {
		return (this.attribute.value as GeneratedAttribute).generator.nodes;
	}
}

export class EditorTab extends AttributeTab implements Serialize<SerializedEditorTab> {
	public cursor: { part: number; position: number };

	public constructor(attribute: AttributeRef) {
		super(attribute);
		if (!this.attribute.value) this.attribute.value = new RichText();
		this.cursor = $state({ part: 0, position: 0 });
	}

	public serialize(): SerializedEditorTab {
		return {
			type: "editor",
			id: this.id,
			attribute: this.attribute.serialize(),
		};
	}

	public get content(): RichText {
		return this.attribute.value as RichText;
	}

	public set content(document: RichText) {
		this.attribute.value = document;
	}

	public saveCursor(): { part: StyledText; position: number } {
		return { part: this.content.partAtIndex(this.cursor.part), position: this.cursor.position };
	}

	public restoreCursor(cursor: { part: StyledText; position: number }): void {
		this.cursor.position = cursor.position;
		this.content.parts.some((part, partIndex) => {
			if ($state.snapshot(part) === $state.snapshot(cursor.part)) {
				this.cursor.part = partIndex;
				return true;
			}

			return false;
		});
	}

	public moveCursorToEnd(): void {
		this.cursor.part = this.content.parts.length - 1;
		this.cursor.position = this.content.parts[this.cursor.part].text.length;
	}

	public static deserialize(tab: SerializedEditorTab): EditorTab {
		const editor = new EditorTab(AttributeRef.deserialize(tab.attribute));
		(editor as any).id = tab.id;
		return editor;
	}
}

export type SerializedEditorTab = {
	attribute: SerializedAttributeRef;
	type: "editor";
	id: number;
};

export type SerializedTab = SerializedEditorTab | SerializedGroupTab;

function deserializeTab(tab: SerializedTab): Tab {
	if (tab.type === "editor") return EditorTab.deserialize(tab);
	return GroupTab.deserialize(tab);
}

export type SerializedTabList = {
	tabs: SerializedTab[];
};

export class TabList implements Serialize<SerializedTabList> {
	public tabs: Tab[] = $state([]);
	public owner: SinglePane = $state(null!);

	public constructor(tabs: Tab[] = [new GroupTab(Project.get()!.database.id)!]) {
		this.tabs = tabs;
	}

	public serialize(): SerializedTabList {
		return {
			tabs: this.tabs.map(tab => (tab as unknown as Serialize<any>).serialize()),
		};
	}

	public static deserialize(tablist: SerializedTabList): TabList {
		const list = new TabList([new Tab(getIcon("StickyNote"))]);
		list.tabs = tablist.tabs.map(tab => deserializeTab(tab));
		return list;
	}

	public appendTab(tab: Tab) {
		this.tabs.push(tab);
	}

	public prependTab(tab: Tab) {
		this.tabs.unshift(tab);
	}

	public insertTab(tab: Tab, index: number) {
		this.tabs.splice(index, 0, tab);
	}

	public replace(id: number, newTab: Tab) {
		this.tabs.splice(this.indexOfID(id), 1, newTab);
	}

	public tabExists(id: number) {
		return this.tabs.find(tab => tab.id === id);
	}

	public getTabByID(id: number): Tab {
		return this.tabs.find(tab => tab.id === id)!;
	}

	public indexOfID(id: number): number {
		return this.tabs.map((tab, index) => [tab, index] as [Tab, number]).find(([tab]) => tab.id === id)![1];
	}

	public getTabByIndex(index: number): Tab {
		return this.tabs[index];
	}

	public deleteTab(id: number) {
		this.tabs = this.tabs.filter(tab => tab.id !== id);
	}

	public isEmpty() {
		return this.tabs.length === 0;
	}

	public count() {
		return this.tabs.length;
	}
}

let customEditorControls: { icon: IconIdentifier; onClick: ({ tab }: { tab: EditorTab }) => void }[] = $state([]);

export function addEditorControl({ icon, onClick }: { icon: IconIdentifier; onClick: ({ tab }: { tab: EditorTab }) => void }) {
	customEditorControls.push({ icon, onClick });
}

export function editorControls() {
	return customEditorControls;
}
