import type { RichText } from "../data/attribute/richtext.svelte";
import type { Group } from "../data/database.svelte";
import { Project } from "../project.svelte";
import { assignedLater } from "../util/utils.svelte";
import type { View } from "./views.svelte";

export class Tab {
	private static tabID = 0;

	public readonly id = $state(assignedLater());

	public constructor() {
		this.id = Tab.tabID++;
	}
}

export class GroupTab extends Tab {
	public group = $state(assignedLater<Group>());
	public view: View = $state("hierarchy");

	public constructor(group: Group) {
		super();
		this.group = group;
	}
}

export class EditorTab extends Tab {
	public content: RichText = $state(assignedLater());

	public constructor(content: RichText) {
		super();
		this.content = content;
	}
}

export class TabList {
	public tabs: Tab[] = $state([new GroupTab(Project.get()!.database)]);

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
