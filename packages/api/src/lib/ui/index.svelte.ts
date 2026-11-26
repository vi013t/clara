import { getIcon, type Icon, type IconIdentifier, type IconName } from "./icons.svelte.ts";
import {
	focusedPane,
	focusPane,
	MultiPane,
	PaneLayout,
	SinglePane,
	type SerializedMultiPane,
	type SerializedPaneLayout,
	type SerializedSinglePane,
} from "./pane.svelte.ts";
import { registerStatusBarButton, statusBarButtons, type StatusBarButton } from "./statusbar.svelte.ts";
import { addEditorControl, AttributeTab, editorControls, GroupTab, ItemTab, Tab, TabList, TabRef } from "./tab.svelte.ts";
import {
	AttributeView,
	GroupView,
	ItemView,
	registerGlobalView,
	View,
	views,
	type ViewFactory,
	type ViewType,
} from "./views.svelte";
import { Editor, editorFactory } from "./views/editor.svelte";
import { Hierarchy, hierarchyFactory } from "./views/hierarchy.svelte";
import { Spreadsheet, spreadsheetFactory } from "./views/spreadsheet.svelte";

export {
	addEditorControl,
	AttributeTab,
	AttributeView,
	Editor,
	editorControls,
	editorFactory,
	focusedPane,
	focusPane,
	getIcon,
	GroupTab,
	GroupView,
	Hierarchy,
	hierarchyFactory,
	ItemTab,
	ItemView,
	MultiPane,
	PaneLayout,
	registerGlobalView,
	registerStatusBarButton,
	SinglePane,
	Spreadsheet,
	spreadsheetFactory,
	statusBarButtons,
	Tab,
	TabList,
	TabRef,
	View,
	views,
	type StatusBarButton,
	type ViewFactory,
};
export type { ViewType };

export type { Icon, IconIdentifier, IconName, SerializedMultiPane, SerializedPaneLayout, SerializedSinglePane };
