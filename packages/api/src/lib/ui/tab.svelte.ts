import {
	AttributeRef,
	NodeInstance,
	RichText,
	Style,
	StyledText,
	type GeneratedAttribute,
	type SerializedAttributeRef,
} from "@clara/api/attribute";
import { Item, type Group } from "@clara/api/database";
import { uniqueId, type Cloneable, type Id, type Serialize } from "@clara/api/utils";
import { type IconIdentifier, getIcon, type Icon, type IconName, SinglePane, views } from "@clara/api/ui";
import { Project } from "@clara/api/project";
import { type GroupView, type ItemView, view, type View } from "./views.svelte";

export abstract class Tab<V extends View = View> implements Cloneable<Tab<V>>, Serialize<unknown> {
	public readonly id = $state(uniqueId());
	private icon_: Icon;
	public view: View;

	public constructor(icon: IconIdentifier, view: View) {
		this.icon_ = $state(getIcon(icon));
		this.view = $state(view);
	}

	public abstract clone(): Tab<V>;
	public abstract serialize(): unknown;
	public abstract get title(): string;
	public abstract get possibleViews(): View[];

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

export class GroupTab extends Tab<GroupView> implements Serialize<SerializedGroupTab> {
	private groupID: number;

	public constructor(group: number, icon?: IconIdentifier) {
		super(
			icon ??
				Project.get()!
					.database.dfs()
					.find(node => node.id === group)!.icon,
			views().find(view => view.name === "Hierarchy")!,
		);
		this.groupID = $state(group);
	}

	public get group(): Group {
		return Project.get()!
			.database.dfs()
			.find(node => node.id === this.groupID)! as Group;
	}

	public get title(): string {
		return this.group.name;
	}

	public clone(): GroupTab {
		return new GroupTab(this.groupID, this.icon);
	}

	public set group(group: Group) {
		this.groupID = group.id;
	}

	public get possibleViews(): View[] {
		return views().filter(view => view.type === "group");
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

export abstract class ItemTab extends Tab<ItemView> {
	protected item_: Id;

	protected constructor(item: Id, icon: IconIdentifier, view: View) {
		super(icon, view);
		this.item_ = $state(item);
	}
}

export abstract class AttributeTab extends ItemTab {
	public attribute: AttributeRef;

	public constructor(attribute: AttributeRef, view: View, icon?: IconIdentifier) {
		super(attribute.item.id, icon ?? attribute.item.type.icon, view);
		this.attribute = $state(attribute);
	}

	public get item(): Item {
		return this.attribute.item;
	}

	public get possibleViews(): View[] {
		return views().filter(view => view.type === "attribute");
	}

	public get title(): string {
		return `${this.attribute.item.name} > ${this.attribute.name}`;
	}
}

export type SerializedNodeEditorTab = {
	id: number;
	type: "node";
	attribute: SerializedAttributeRef;
};

export class NodeEditorTab extends AttributeTab {
	public constructor(attribute: AttributeRef) {
		super(attribute, view("Node Editor")!, "GitCompare");
	}

	public get nodes(): NodeInstance[] {
		return (this.attribute.value as GeneratedAttribute).generator.nodes;
	}

	public clone(): NodeEditorTab {
		return new NodeEditorTab(this.attribute);
	}

	public override serialize(): SerializedNodeEditorTab {
		return {
			type: "node",
			id: this.id,
			attribute: this.attribute.serialize(),
		};
	}

	public static deserialize(tab: SerializedNodeEditorTab): NodeEditorTab {
		const nodeEditorTab = new NodeEditorTab(AttributeRef.deserialize(tab.attribute));
		(nodeEditorTab as any).id = tab.id;
		return nodeEditorTab;
	}

	public static fromItem(item: Item): NodeEditorTab {
		return new NodeEditorTab(
			item.attribute(
				Object.keys(item.attributes).find(
					name => item.type.attributes.find(def => def.name === name)!.typeName === "generated",
				)![0],
			),
		);
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

	public override serialize(): SerializedEditorTab {
		return {
			type: "editor",
			id: this.id,
			attribute: this.attribute.serialize(),
		};
	}

	public clone(): EditorTab {
		return new EditorTab(this.attribute);
	}

	public get content(): RichText {
		return this.attribute.value as RichText;
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

	public static deserialize(tab: SerializedEditorTab): EditorTab {
		const editor = new EditorTab(AttributeRef.deserialize(tab.attribute));
		(editor as any).id = tab.id;
		return editor;
	}

	public styleRange(start: number, end: number, style: Style, override?: true) {
		const cursor = this.saveCursor();
		this.attribute.valueAs<RichText>()!.styleRange(start, end, style, override);
		this.restoreCursor(cursor);
	}
}

export type SerializedEditorTab = {
	attribute: SerializedAttributeRef;
	type: "editor";
	id: number;
};

export type SerializedTab = SerializedEditorTab | SerializedGroupTab | SerializedNodeEditorTab;

function deserializeTab(tab: SerializedTab): Tab<any> {
	if (tab.type === "editor") return EditorTab.deserialize(tab);
	if (tab.type === "node") return NodeEditorTab.deserialize(tab);
	return GroupTab.deserialize(tab);
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
