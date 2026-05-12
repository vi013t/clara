import { userSettings } from "@clara/api/usersettings";
import type { Project, Template } from "../project.svelte.ts";
import type { IconIdentifier } from "../ui/icons.svelte.ts";
import defaultThemes from "./themes/themes.svelte.ts";
import type { EditorTab } from "@clara/api/ui";

export const corePlugins = [defaultThemes] as const satisfies ClaraPlugin<any>[];

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

export type EventName = "keydown";
export type EventContext = "editor";
export type EventHandler<Name extends EventName, Context extends EventContext> = {
	editor: {
		keydown: ({ event, tab, project }: { event: KeyboardEvent; tab: EditorTab; project: Project }) => void;
	};
}[Context][Name];

export type Listener<Name extends EventName, Context extends EventContext> = {
	on: Name;
	inside: Context;
	run: EventHandler<Name, Context>;
};

let listeners: Listener<EventName, EventContext>[] = $state([]);

export function getListeners<Name extends EventName, Context extends EventContext>({
	inside,
	on,
}: {
	inside: Context;
	on: Name;
}): Listener<Name, Context>[] {
	return listeners.filter(listener => on === listener.on && inside === listener.inside) as Listener<Name, Context>[];
}

export function listen<Name extends EventName, Context extends EventContext>(listener: Listener<Name, Context>) {
	listeners.push(listener);
}
