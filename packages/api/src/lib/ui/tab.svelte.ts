import { AttributeRef, RichText, StringAttribute, Style, StyledText, type SerializedAttributeRef } from "@clara/api/attribute";
import { Item, type Group } from "@clara/api/database";
import { todo, uniqueId, unreachable, type Cloneable, type Id, type Serialize } from "@clara/api/utils";
import { type IconIdentifier, getIcon, type Icon, type IconName, SinglePane, views } from "@clara/api/ui";
import { Project } from "@clara/api/project";
import {
	type AttributeView,
	type GroupView,
	type ItemView,
	view,
	type View,
	type ViewInterface,
	viewIs,
	type ViewType,
	type ViewTypeOf,
} from "./views.svelte";

export type TabConstructor<V extends ViewType> = V extends "group"
	? { new (group: number, icon?: IconIdentifier): GroupTab }
	: V extends "item"
		? { new (item: Id, view: View<"item">, icon?: IconIdentifier): ItemTab }
		: V extends "attribute"
			? { new (attribute: AttributeRef, view: View<"attribute">, icon?: IconIdentifier): AttributeTab }
			: never;

export abstract class Tab<V extends View<T>, T extends ViewType = ViewTypeOf<V>>
	implements Cloneable<Tab<V, T>>, Serialize<unknown>
{
	public readonly id = $state(uniqueId());
	private icon_: Icon;
	public view: V;

	public constructor(icon: IconIdentifier, view: V) {
		this.icon_ = $state(getIcon(icon));
		this.view = $state(view);
	}

	public abstract clone(): Tab<V, T>;
	public abstract serialize(): unknown;
	public abstract get title(): string;
	public abstract get possibleViews(): V[];

	public get icon(): Icon {
		return this.icon_;
	}

	public set icon(icon: IconIdentifier) {
		this.icon_ = getIcon(icon);
	}

	public static fromView<T extends ViewType>(view: ViewInterface<T>): TabConstructor<T> {
		if (viewIs(view, "group")) {
			return GroupTab as unknown as TabConstructor<T>;
		}

		if (viewIs(view, "item")) {
			return ItemTab as unknown as TabConstructor<T>;
		}

		if (viewIs(view, "attribute")) {
			return AttributeTab as unknown as TabConstructor<T>;
		}

		unreachable();
	}
}

export type SerializedGroupTab = {
	type: "group";
	view: string;
	id: number;
	group: number;
	icon: IconName;
};

export class GroupTab extends Tab<GroupView> implements Serialize<SerializedGroupTab> {
	private groupID: number;

	public constructor(group: number, icon?: IconIdentifier) {
		super(
			icon ??
				Project.get()!
					.database.dfs()
					.find(node => node.id === group)!.icon,
			view("Hierarchy")!,
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

	public get possibleViews(): GroupView[] {
		return views().filter(view => view.type === "group") as View<"group">[];
	}

	public serialize(): SerializedGroupTab {
		return {
			type: "group",
			id: this.id,
			group: this.groupID,
			view: this.view.name,
			icon: this.icon.name,
		};
	}

	public static deserialize(tab: SerializedGroupTab): GroupTab {
		const group = new GroupTab(tab.group, tab.icon);
		group.view = view(tab.view)!;
		(group as any).id = tab.id;
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
		return { type: "item", id: this.item_, view: this.view.name, icon: this.icon.name };
	}

	public static deserialize(tab: SerializedItemTab): ItemTab {
		return new ItemTab(tab.id, view(tab.view)!, tab.icon);
	}

	public get item(): Item {
		return Project.get()!
			.database.dfsItems()
			.find(item => item.id === this.item_)!;
	}

	public get title(): string {
		return (this.item.attributes.Name as StringAttribute).value;
	}

	public get possibleViews(): ItemView[] {
		return views().filter(view => view.type === "item") as ItemView[];
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
		return { type: "attribute", attribute: this.attribute.serialize(), view: this.view.name, icon: this.icon.name };
	}

	public static deserialize(tab: SerializedAttributeTab): AttributeTab {
		return new AttributeTab(AttributeRef.deserialize(tab.attribute), view(tab.view)!, getIcon(tab.icon));
	}

	public get item(): Item {
		return this.attribute.item;
	}

	public get possibleViews(): AttributeView[] {
		return views().filter(view => view.type === "attribute") as AttributeView[];
	}

	public get title(): string {
		return `${this.attribute.item.name} > ${this.attribute.name}`;
	}
}

export class EditorTab extends AttributeTab {
	public cursor: { part: number; position: number };
	public element: HTMLElement = $state(null!);

	public constructor(attribute: AttributeRef) {
		super(attribute, view("Editor")!, "Pencil");
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

	public styleRange(start: number, end: number, style: Style, override?: true) {
		const cursor = this.saveCursor();
		this.attribute.valueAs<RichText>()!.styleRange(start, end, style, override);
		this.restoreCursor(cursor);
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
	public tabs: Tab<any>[] = $state([]);
	public owner: SinglePane = $state(null!);

	public constructor(tabs: Tab<any>[] = [new GroupTab(Project.get()!.database.id)!]) {
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
		list.tabs = tablist.tabs.map(tab => deserializeTab(tab));
		return list;
	}

	public appendTab(tab: Tab<any>) {
		this.tabs.push(tab);
	}

	public prependTab(tab: Tab<any>) {
		this.tabs.unshift(tab);
	}

	public insertTab(tab: Tab<any>, index: number) {
		this.tabs.splice(index, 0, tab);
	}

	public replace(id: number, newTab: Tab<any>) {
		this.tabs.splice(this.indexOfID(id), 1, newTab);
	}

	public tabExists(id: number) {
		return this.tabs.find(tab => tab.id === id);
	}

	public getTabByID(id: number): Tab<any> {
		return this.tabs.find(tab => tab.id === id)!;
	}

	public indexOfID(id: number): number {
		return this.tabs.map((tab, index) => [tab, index] as [Tab<any>, number]).find(([tab]) => tab.id === id)![1];
	}

	public getTabByIndex(index: number): Tab<any> {
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
