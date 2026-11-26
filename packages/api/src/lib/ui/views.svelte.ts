import type { AttributeRef } from "@clara/api/attribute";
import type { Group, Item } from "@clara/api/database";
import { AttributeTab, GroupTab, ItemTab, PaneLayout, SinglePane, Tab, type Icon } from "@clara/api/ui";
import type { Snippet } from "svelte";
import { Project } from "../project.svelte.ts";

export type ViewType = "group" | "attribute" | "item";

export abstract class View<T extends ViewType, const I extends string = string> {
	abstract readonly identifier: I;
	abstract readonly render: ViewRenderer<T>;
}

export type ViewRenderer<T extends ViewType> = T extends "group"
	? Snippet<[{ pane: SinglePane; tab: GroupTab; setPane: (pane: PaneLayout) => void }]>
	: T extends "item"
		? Snippet<[{ pane: SinglePane; tab: ItemTab; setPane: (pane: PaneLayout) => void }]>
		: Snippet<[{ pane: SinglePane; tab: AttributeTab; setPane: (pane: PaneLayout) => void }]>;

export abstract class GroupView<const I extends string = string> extends View<"group", I> {
	public group_: number;

	public constructor(group: number) {
		super();
		this.group_ = $state(group);
	}
	public get group(): Group {
		return Project.get()!
			.database.dfs()
			.find(node => node.id === this.group_)! as Group;
	}
}

export abstract class ItemView<const I extends string = string> extends View<"item", I> {
	public item_: number;

	public constructor(item: number) {
		super();
		this.item_ = $state(item);
	}
	public get item(): Item {
		return Project.get()!
			.database.dfs()
			.find(node => node.id === this.item_)! as Item;
	}
}

export abstract class AttributeView<const I extends string = string> extends View<"attribute", I> {
	public attribute: AttributeRef;

	public constructor(attribute: AttributeRef) {
		super();
		this.attribute = $state(attribute);
	}
}

export type ViewFactory<T extends ViewType, I extends string = string> = {
	identifier: I;
	icon: Icon;
	type: T;
	createTab(tab: Tab<View<ViewType, string>, ViewType>): Tab<View<T, I>>;
};

let allViews: ViewFactory<ViewType, string>[] = $state([]);

export function views(): ViewFactory<ViewType, string>[] {
	return allViews;
}

export function registerGlobalView<T extends ViewType, const I extends string>(view: ViewFactory<T, I>) {
	allViews.push(view);
}
