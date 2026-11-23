import { TabList } from "@clara/api/ui";
import type { Cloneable, Serialize } from "@clara/api/utils";
import type { SerializedTabList } from "./tab.svelte.ts";

export type SerializedPaneLayout = SerializedSinglePane | SerializedMultiPane;

export abstract class PaneLayout implements Cloneable<PaneLayout>, Serialize<SerializedPaneLayout> {
	public sibling: PaneLayout | null = $state(null);
	public hasParent = $state(false);

	public abstract get split(): string;
	public abstract clone(): PaneLayout;
	public abstract serialize(): SerializedPaneLayout;

	public abstract isSingle(): this is SinglePane;

	public isMulti(): this is MultiPane {
		return !this.isSingle();
	}

	public static deserialize(layout: SerializedPaneLayout): PaneLayout {
		return layout.split === "none" ? SinglePane.deserialize(layout) : MultiPane.deserialize(layout);
	}
}

export type SerializedSinglePane = {
	split: "none";
	tabline: SerializedTabList;
	selectedTabID: number;
	hasParent: boolean;
};

export class SinglePane extends PaneLayout {
	public tabline: TabList;
	public selectedTabID: number;

	public constructor(hasParent: boolean, tabline?: TabList, selectedTabID?: number) {
		super();
		this.hasParent = hasParent;
		this.tabline = $state(tabline ?? new TabList([]));
		this.selectedTabID = $state(selectedTabID ?? this.tabline.tabs[0]?.id ?? 0);
	}

	public isSingle(): this is SinglePane {
		return true;
	}

	public get split(): "none" {
		return "none";
	}

	public serialize(): SerializedSinglePane {
		return {
			hasParent: this.hasParent,
			split: "none",
			tabline: this.tabline.serialize(),
			selectedTabID: this.selectedTabID,
		};
	}

	public clone(): SinglePane {
		return new SinglePane(this.hasParent, this.tabline.clone(), this.selectedTabID);
	}

	public static deserialize(pane: SerializedSinglePane): SinglePane {
		return new SinglePane(pane.hasParent, TabList.deserialize(pane.tabline), pane.selectedTabID);
	}
}

export type SerializedMultiPane = {
	split: "horizontal" | "vertical";
	percent: number;
	panes: [SerializedPaneLayout, SerializedPaneLayout];
	hasParent: boolean;
};

export class MultiPane extends PaneLayout {
	private split_: "horizontal" | "vertical";

	public panes: [PaneLayout, PaneLayout];
	public percent: number;

	public constructor(
		hasParent: boolean,
		split: "horizontal" | "vertical",
		first: PaneLayout,
		second: PaneLayout,
		percent: number,
	) {
		super();
		this.hasParent = hasParent;
		this.split_ = $state(split);
		this.panes = $state([first, second]);
		this.percent = $state(percent);

		first.sibling = second;
		second.sibling = first;
	}

	public get split(): "horizontal" | "vertical" {
		return this.split_;
	}

	public isSingle(): this is SinglePane {
		return false;
	}

	public serialize(): SerializedMultiPane {
		return {
			split: this.split_,
			percent: this.percent,
			panes: [this.panes[0].serialize(), this.panes[1].serialize()],
			hasParent: this.hasParent,
		};
	}

	public clone(): MultiPane {
		return new MultiPane(this.hasParent, this.split, this.panes[0].clone(), this.panes[1].clone(), this.percent);
	}

	public static deserialize(pane: SerializedMultiPane): MultiPane {
		return new MultiPane(
			pane.hasParent,
			pane.split,
			PaneLayout.deserialize(pane.panes[0]),
			PaneLayout.deserialize(pane.panes[1]),
			pane.percent,
		);
	}
}

let rootPane_: PaneLayout = $state(null!);
let focusedPane_: PaneLayout = $state(rootPane_);

export function rootPane() {
	if (!rootPane_) {
		rootPane_ = new SinglePane(false);
		focusedPane_ = rootPane_;
	}
	return rootPane_;
}

export function setRootPane(pane: PaneLayout) {
	rootPane_ = pane;
}

export function focusedPane() {
	if (!focusedPane_) {
		focusedPane_ = rootPane();
	}
	return focusedPane_;
}

export function focusPane(pane: PaneLayout) {
	focusedPane_ = pane;
}
