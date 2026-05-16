import { userSettings } from "@clara/api/usersettings";
import type { Project, Template } from "../project.svelte.ts";
import type { IconIdentifier } from "../ui/icons.svelte.ts";
import defaultThemes from "./themes/themes.svelte.ts";
import type { Tab } from "@clara/api/ui";
import { extraViewsPlugin } from "./views/index.svelte";
import type { View, ViewType } from "../ui/views.svelte";
import { breadcrumbsPlugin } from "./breadcrumbs/breadcrumbs.svelte";
import { manualPlugin } from "./manual/manual.svelte";

export const corePlugins = [
	defaultThemes,
	extraViewsPlugin,
	breadcrumbsPlugin,
	manualPlugin,
] as const satisfies ClaraPlugin<any>[];

type Setting<Name extends string> = {
	name: Name;
};

type Settings<Names extends string> = {
	get(name: Names): Setting<Names>;
};

export type ClaraPlugin<SettingNames extends string> = {
	name: string;
	identifier: string;
	description: string;
	icon: IconIdentifier;
	settings?: Setting<SettingNames>[];
	onLoad?(info: PluginInfo<SettingNames>): void;
	onInstall?(info: PluginInfo<SettingNames>): void;
};

type PluginInfo<SettingNames extends string> = {
	settings: Settings<SettingNames>;
};

export function plugin<const SettingNames extends string>(plugin: ClaraPlugin<SettingNames>): ClaraPlugin<SettingNames> {
	return plugin;
}

export function registerTemplate(template: Template) {
	userSettings().addTemplate(template);
}

type ListenableEvent = {
	keydown: KeyboardEvent;
	keyup: KeyboardEvent;
	mousedown: MouseEvent;
	mousemove: MouseEvent;
	contextmenu: MouseEvent;
};

export type EventName = keyof ListenableEvent;
export type EventType<Name extends EventName> = ListenableEvent[Name];

export type Listener<T extends ViewType, Name extends EventName> = {
	on: Name;
	inside: string;
	run: ({ event, tab, project }: { event: EventType<Name>; tab: Tab<View<T>>; project: Project }) => void;
};

let listeners: Listener<ViewType, EventName>[] = $state([]);

export function getListeners({ inside, on }: { inside: string; on: string }): Listener<ViewType, EventName>[] {
	return listeners.filter(listener => on === listener.on && inside === listener.inside);
}

export function listen<T extends ViewType, Name extends EventName>(listener: Listener<T, Name>) {
	listeners.push(listener as unknown as Listener<ViewType, EventName>);
}
