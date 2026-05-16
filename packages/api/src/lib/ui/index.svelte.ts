import { getIcon, type IconIdentifier, type IconName, type Icon } from "./icons.svelte.ts";
import { GroupTab, Tab, TabList } from "./tab.svelte.ts";
import {
	views,
	registerGlobalView,
	view,
	type ItemView,
	type View,
	type GroupView,
	type AttributeView,
	hierarchyView,
	spreadsheetView,
	nodeEditorView,
	editorView,
} from "./views.svelte";
import { editorControls, addEditorControl, ItemTab, AttributeTab } from "./tab.svelte.ts";
import {
	PaneLayout,
	SinglePane,
	MultiPane,
	type SerializedMultiPane,
	type SerializedPaneLayout,
	type SerializedSinglePane,
	focusedPane,
	focusPane,
} from "./pane.svelte.ts";
import { type StatusBarButton, registerStatusBarButton, statusBarButtons } from "./statusbar.svelte.ts";

export {
	getIcon,
	GroupTab,
	Tab,
	TabList,
	views,
	editorControls,
	addEditorControl,
	PaneLayout,
	SinglePane,
	MultiPane,
	ItemTab,
	AttributeTab,
	type StatusBarButton,
	registerStatusBarButton,
	statusBarButtons,
	focusedPane,
	focusPane,
	registerGlobalView,
	type AttributeView,
	type ItemView,
	type GroupView,
	view,
	type View,
	hierarchyView as hierarchy,
	spreadsheetView as spreadsheet,
	nodeEditorView as nodeEditor,
	editorView as editor,
};

export type { IconIdentifier, IconName, Icon, SerializedMultiPane, SerializedPaneLayout, SerializedSinglePane };
