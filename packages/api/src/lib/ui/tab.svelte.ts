import { AttributeRef, RichText, StringAttribute, type SerializedAttributeRef } from "@clara/api/attribute";
import { Item, type Group } from "@clara/api/database";
import { Project } from "@clara/api/project";
import { Editor, getIcon, Hierarchy, SinglePane, views, type Icon, type IconIdentifier, type IconName } from "@clara/api/ui";
import { uniqueId, unreachable, type Cloneable, type Id, type Serialize } from "@clara/api/utils";
import { AttributeView, GroupView, ItemView, type View, type ViewFactory, type ViewType } from "./views.svelte";

export type TabConstructor<V extends ViewType> = V extends "group"
	? { new (group: number, icon?: IconIdentifier): GroupTab }
	: V extends "item"
		? { new (item: Id, view: View<"item">, icon?: IconIdentifier): ItemTab }
		: V extends "attribute"
			? { new (attribute: AttributeRef, view: View<"attribute">, icon?: IconIdentifier): AttributeTab }
			: never;

export abstract class Tab<V extends View<T>, T extends ViewType = ViewType> implements Cloneable<Tab<V, T>>, Serialize<unknown> {
	private icon_: Icon;
	public view: V;

	public constructor(icon: IconIdentifier, view: V) {
		this.icon_ = $state(getIcon(icon));
		this.view = $state(view);
	}

	public abstract clone(): Tab<V, T>;
	public abstract serialize(): unknown;
	public abstract get title(): string;
	public abstract get possibleViews(): ViewFactory<T>[];

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
	group: number;
	icon: IconName;
};

export class GroupTab extends Tab<GroupView> implements Serialize<SerializedGroupTab>, Cloneable<GroupTab> {
	private groupID: number;

	public constructor(group: number, icon?: IconIdentifier) {
		super(
			icon ??
				Project.get()!
					.database.dfs()
					.find(node => node.id === group)!.icon,
			new Hierarchy(group),
		);
		this.groupID = $state(group);
	}

	public get group(): Group {
		return Project.get()!
			.database.dfs()
			.find(node => node.id === this.groupID)! as Group;
	}

	public get title(): string {
		return this.group?.name ?? "";
	}

	public clone(): GroupTab {
		return new GroupTab(this.groupID, this.icon);
	}

	public set group(group: Group) {
		this.groupID = group.id;
	}

	public get possibleViews(): ViewFactory<"group">[] {
		return views().filter(view => view.type === "group") as ViewFactory<"group">[];
	}

	public serialize(): SerializedGroupTab {
		return {
			type: "group",
			group: this.groupID,
			view: this.view.serialize(),
			icon: this.icon.name,
		};
	}

	public static deserialize(tab: SerializedGroupTab): GroupTab {
		const group = new GroupTab(tab.group, tab.icon);
		group.view = this.view.deserialize();
		return group;
	}
}

export type SerializedItemTab = {
	type: "item";
	id: Id;
	view: string;
	icon: IconName;
};

export class ItemTab extends Tab<ItemView> {
	private item_: Id;

	public constructor(item: Id, view: ItemView, icon?: IconIdentifier) {
		super(
			icon ??
				Project.get()!
					.database.dfsItems()
					.find(other => other.id === item)!.icon,
			view,
		);
		this.item_ = $state(item);
	}

	public clone(): Tab<ItemView> {
		return new ItemTab(this.item_, this.view, this.icon);
	}

	public serialize(): SerializedItemTab {
		return {
			type: "item",
			id: this.item_,
			view: this.view.serialize(),
			icon: this.icon.name,
		};
	}

	public static deserialize(tab: SerializedItemTab): ItemTab {
		return new ItemTab(tab.id, tab.view.deserialize(), tab.icon);
	}

	public get item(): Item {
		return Project.get()!
			.database.dfsItems()
			.find(item => item.id === this.item_)!;
	}

	public get title(): string {
		return (this.item.attributes.Name as StringAttribute).value;
	}

	public get possibleViews(): ViewFactory<"item">[] {
		return views().filter(view => view.type === "item") as ViewFactory<"item">[];
	}
}

type SerializedAttributeTab = {
	attribute: SerializedAttributeRef;
	type: "attribute";
	view: string;
	icon: IconName;
};

export class AttributeTab extends Tab<AttributeView> {
	public attribute: AttributeRef;

	public constructor(attribute: AttributeRef, view: AttributeView, icon?: IconIdentifier) {
		super(icon ?? attribute.item.type.icon, view);
		this.attribute = $state(attribute);
	}

	public clone(): AttributeTab {
		return new AttributeTab(this.attribute.clone(), this.view, this.icon);
	}

	public serialize(): SerializedAttributeTab {
		return {
			type: "attribute",
			attribute: this.attribute.serialize(),
			view: this.view.serialize(),
			icon: this.icon.name,
		};
	}

	public static deserialize(tab: SerializedAttributeTab): AttributeTab {
		return new AttributeTab(AttributeRef.deserialize(tab.attribute), tab.view, getIcon(tab.icon));
	}

	public get item(): Item {
		return this.attribute.item;
	}

	public get possibleViews(): ViewFactory<"attribute">[] {
		return views().filter(view => view.type === "attribute") as ViewFactory<"attribute">[];
	}

	public get title(): string {
		if (this.item.type.name === "Document" && this.attribute.name === "Content") return this.attribute.item.name;
		return `${this.attribute.item.name} > ${this.attribute.name}`;
	}
}

export class EditorTab extends AttributeTab {
	public cursor: { part: number; position: number };
	public element: HTMLElement = $state(null!);

	public constructor(attribute: AttributeRef) {
		super(attribute, new Editor(attribute), "Pencil");
		if (!this.attribute.value) this.attribute.value = new RichText();
		this.cursor = $state({ part: 0, position: 0 });
	}

	public static fromItem(item: Item): EditorTab {
		return new EditorTab(item.attribute(item.type.attributes.find(def => def.typeName === "longText")!.name));
	}

	public set content(document: RichText) {
		this.attribute.value = document;
	}

	public override get title(): string {
		if (this.attribute.item.type.name === "Document") return this.attribute.item.name;
		return `${this.attribute.item.name} > ${this.attribute.name}`;
	}
}

export type SerializedTab = SerializedItemTab | SerializedGroupTab | SerializedAttributeTab;

function deserializeTab(tab: SerializedTab): Tab<any> {
	if (tab.type === "item") return ItemTab.deserialize(tab);
	if (tab.type === "group") return GroupTab.deserialize(tab);
	if (tab.type === "attribute") return AttributeTab.deserialize(tab);
	unreachable();
}

export type SerializedTabList = {
	tabs: SerializedTab[];
};

export class TabList implements Cloneable<TabList>, Serialize<SerializedTabList> {
	public tabs: TabRef[] = $state([]);
	public owner: SinglePane = $state(null!);

	public constructor(tabs: TabRef[] = [new TabRef(new GroupTab(Project.get()!.database.id))!]) {
		this.tabs = tabs;
	}

	public clone() {
		const tablist = new TabList(this.tabs.map(tab => tab.clone()));
		tablist.owner = this.owner;
		return tablist;
	}

	public serialize(): SerializedTabList {
		return {
			tabs: this.tabs.map(tab => (tab as unknown as Serialize<any>).serialize()),
		};
	}

	public static deserialize(tablist: SerializedTabList): TabList {
		const list = new TabList([]);
		list.tabs = tablist.tabs.map(tab => new TabRef(deserializeTab(tab)));
		return list;
	}

	public appendTab(tab: TabRef) {
		this.tabs.push(tab);
	}

	public insertTab(tab: Tab<any>, index: number) {
		this.tabs.splice(index, 0, new TabRef(tab));
	}

	public replace(id: number, newTab: Tab<any>) {
		this.tabs.splice(this.indexOfID(id), 1, new TabRef(newTab));
	}

	public tabExists(id: number) {
		return this.tabs.find(tab => tab.id === id);
	}

	public getTabByID(id: number): Tab<any> {
		return this.tabs.find(tab => tab.id === id)!.tab;
	}

	public getTabRefByID(id: number): TabRef {
		return this.tabs.find(tab => tab.id === id)!;
	}

	public indexOfID(id: number): number {
		return this.tabs.map((tab, index) => [tab, index] as [TabRef, number]).find(([tab]) => tab.id === id)![1];
	}

	public getTabByIndex(index: number): Tab<any> {
		return this.tabs[index].tab;
	}

	public getTabRefByIndex(index: number): TabRef {
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

export class TabRef implements Cloneable<TabRef> {
	public tab: Tab<View<ViewType>>;
	public readonly id = $state(uniqueId());

	public constructor(tab: Tab<View<ViewType>>) {
		this.tab = $state(tab);
	}

	public clone(): TabRef {
		return new TabRef(this.tab.clone());
	}
}
