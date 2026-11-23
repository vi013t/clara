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
import { addEditorControl, AttributeTab, editorControls, GroupTab, ItemTab, Tab, TabList } from "./tab.svelte.ts";
import {
	editorView,
	hierarchyView,
	nodeEditorView,
	registerGlobalView,
	spreadsheetView,
	view,
	views,
	type AttributeView,
	type GroupView,
	type ItemView,
	type View,
} from "./views.svelte";

export {
	addEditorControl,
	AttributeTab,
	editorView as editor,
	editorControls,
	focusedPane,
	focusPane,
	getIcon,
	GroupTab,
	hierarchyView as hierarchy,
	ItemTab,
	MultiPane,
	nodeEditorView as nodeEditor,
	PaneLayout,
	registerGlobalView,
	registerStatusBarButton,
	SinglePane,
	spreadsheetView as spreadsheet,
	statusBarButtons,
	Tab,
	TabList,
	view,
	views,
	type AttributeView,
	type GroupView,
	type ItemView,
	type StatusBarButton,
	type View,
};

export type { Icon, IconIdentifier, IconName, SerializedMultiPane, SerializedPaneLayout, SerializedSinglePane };
