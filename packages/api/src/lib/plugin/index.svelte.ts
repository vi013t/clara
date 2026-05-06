import type { IconIdentifier } from "../ui/icons.svelte.ts";
import defaultThemes from "./themes/themes.svelte.ts";

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
