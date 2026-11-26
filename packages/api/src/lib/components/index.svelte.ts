import App, { registerPopup } from "./App.svelte";
import Icon from "./Icon.svelte";
import ColorPicker from "./input/ColorPicker.svelte";
import IconPicker from "./input/IconPicker.svelte";
import Input from "./input/Input.svelte";
import LongTextInput from "./input/LongTextInput.svelte";
import MeasurementInput from "./input/MeasurementInput.svelte";
import NumberInput from "./input/NumberInput.svelte";
import Select from "./input/Select.svelte";
import ShortTextInput from "./input/ShortTextInput.svelte";
import Suggestions from "./input/Suggestions.svelte";
import InputHandler, { keyboard, mouse } from "./InputHandler.svelte";
import ContextMenu from "./menus/ContextMenu.svelte";
import Navbar from "./Navbar.svelte";
import NoProject from "./NoProject.svelte";
import Notification from "./Notification.svelte";
import Notifications from "./Notifications.svelte";
import CombinedPane from "./pane/CombinedPane.svelte";
import Pane from "./pane/Pane.svelte";
import SingularPane from "./pane/SingularPane.svelte";
import Tabline from "./pane/Tabline.svelte";
import AttributeSettingsPopup from "./popups/AttributeSettingsPopup.svelte";
import ConfirmationPopup from "./popups/ConfirmationPopup.svelte";
import NewProjectPopup from "./popups/NewProjectPopup.svelte";
import Popup from "./popups/Popup.svelte";
import PopupSidebar from "./popups/PopupSidebar.svelte";
import ProjectSettingsPopup from "./popups/ProjectSettingsPopup.svelte";
import SettingsPopup from "./popups/SettingsPopup.svelte";
import Sidebar from "./Sidebar.svelte";
import StatusBar from "./StatusBar.svelte";
import EditorView from "./views/EditorView.svelte";
import GraphView from "./views/GraphView.svelte";
import HierarchyView from "./views/HierarchyView.svelte";
import InfiniteCanvas from "./views/InfiniteCanvas.svelte";
import Node from "./views/node/Node.svelte";
import NodeEditor from "./views/node/NodeEditor.svelte";
import SpreadsheetView from "./views/SpreadsheetView.svelte";
import TimelineView from "./views/TimelineView.svelte";
import LittleButton from "./widgets/LittleButton.svelte";

let notificationId = 0;
let notifications: { title: string; text?: string; id: number }[] = $state([]);

export function notify(title: string, text?: string) {
	let id = notificationId++;
	notifications.push({ title, text, id });
	setTimeout(() => {
		notifications = notifications.filter(notification => notification.id !== id);
	}, 5000);
}

export function getNotifications() {
	return notifications;
}

export {
	App,
	AttributeSettingsPopup,
	ColorPicker,
	CombinedPane,
	ConfirmationPopup,
	ContextMenu,
	EditorView,
	GraphView,
	HierarchyView,
	Icon,
	IconPicker,
	InfiniteCanvas,
	Input,
	InputHandler,
	keyboard,
	LittleButton,
	LongTextInput,
	MeasurementInput,
	mouse,
	Navbar,
	NewProjectPopup,
	Node,
	NodeEditor,
	NoProject,
	Notification,
	Notifications,
	NumberInput,
	Pane,
	Popup,
	PopupSidebar,
	ProjectSettingsPopup,
	registerPopup,
	Select,
	SettingsPopup,
	ShortTextInput,
	Sidebar,
	SingularPane,
	SpreadsheetView,
	StatusBar,
	Suggestions,
	Tabline,
	TimelineView,
};
