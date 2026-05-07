import type { Group, SerializedGroup } from "../data/database.svelte";
import { Project } from "../project.svelte";
import { assignedLater, type Serialize } from "../util/index.svelte";
import { RichText, type SerializedRichText } from "../data/attribute/richtext.svelte";
import { getIcon, type Icon, type IconIdentifier, type IconName } from "./icons.svelte";

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

export class EditorTab extends Tab implements Serialize<SerializedEditorTab> {
	public content: RichText = $state(assignedLater());

	public constructor(content: RichText) {
		super("Pencil");
		this.content = content;
	}

	public serialize(): SerializedEditorTab {
		return {
			type: "editor",
			id: this.id,
			content: this.content.serialize(),
		};
	}

	public static deserialize(tab: SerializedEditorTab): EditorTab {
		const editor = new EditorTab(RichText.deserialize(tab.content));
		(editor as any).id = tab.id;
		return editor;
	}
}

export type SerializedEditorTab = {
	type: "editor";
	id: number;
	content: SerializedRichText;
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

	public constructor(tabs = [new GroupTab(Project.get()!.database.id)!]) {
		this.tabs = tabs;
	}

	public serialize(): SerializedTabList {
		return {
			tabs: this.tabs.map(tab => (tab as unknown as Serialize<any>).serialize()),
		};
	}

	public static deserialize(tablist: SerializedTabList): TabList {
		const list = new TabList([]);
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
