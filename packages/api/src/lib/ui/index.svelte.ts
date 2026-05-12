import { getIcon, type IconIdentifier, type IconName, type Icon } from "./icons.svelte.ts";
import { GroupTab, Tab, TabList, EditorTab } from "./tab.svelte.ts";
import { views } from "./views.svelte.ts";
import { NodeEditorTab, editorControls, addEditorControl, ItemTab, AttributeTab } from "./tab.svelte.ts";
import {
	PaneLayout,
	SinglePane,
	MultiPane,
	type SerializedMultiPane,
	type SerializedPaneLayout,
	type SerializedSinglePane,
} from "./pane.svelte.ts";

export {
	getIcon,
	GroupTab,
	Tab,
	TabList,
	EditorTab,
	views,
	NodeEditorTab,
	editorControls,
	addEditorControl,
	PaneLayout,
	SinglePane,
	MultiPane,
	ItemTab,
	AttributeTab,
};

export type { IconIdentifier, IconName, Icon, SerializedMultiPane, SerializedPaneLayout, SerializedSinglePane };
