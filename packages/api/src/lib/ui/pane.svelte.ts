import type { Cloneable, Serialize } from "@clara/api/utils";
import { TabList } from "./index.svelte.js";
import type { SerializedTabList } from "./tab.svelte.ts";

export type SerializedPaneLayout = SerializedSinglePane | SerializedMultiPane;

export abstract class PaneLayout implements Cloneable<PaneLayout>, Serialize<SerializedPaneLayout> {
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
};

export class SinglePane extends PaneLayout {
	public tabline: TabList;
	public selectedTabID: number;

	public constructor(tabline?: TabList, selectedTabID?: number) {
		super();
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
			split: "none",
			tabline: this.tabline.serialize(),
			selectedTabID: this.selectedTabID,
		};
	}

	public clone(): SinglePane {
		return new SinglePane(this.tabline.clone(), this.selectedTabID);
	}

	public static deserialize(pane: SerializedSinglePane): SinglePane {
		return new SinglePane(TabList.deserialize(pane.tabline), pane.selectedTabID);
	}
}

export type SerializedMultiPane = {
	split: "horizontal" | "vertical";
	percent: number;
	panes: [SerializedPaneLayout, SerializedPaneLayout];
};

export class MultiPane extends PaneLayout {
	private split_: "horizontal" | "vertical";

	public panes: [PaneLayout, PaneLayout];
	public percent: number;

	public constructor(split: "horizontal" | "vertical", first: PaneLayout, second: PaneLayout, percent: number) {
		super();
		this.split_ = $state(split);
		this.panes = $state([first, second]);
		this.percent = $state(percent);
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
		};
	}

	public clone(): MultiPane {
		return new MultiPane(this.split, this.panes[0].clone(), this.panes[1].clone(), this.percent);
	}

	public static deserialize(pane: SerializedMultiPane): MultiPane {
		return new MultiPane(pane.split, PaneLayout.deserialize(pane.panes[0]), PaneLayout.deserialize(pane.panes[1]), pane.percent);
	}
}
