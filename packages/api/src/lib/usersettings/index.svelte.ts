import { Group } from "../data/database.svelte.ts";
import { invoke } from "@tauri-apps/api/core";
import type { Theme } from "./theme.svelte.ts";
import { type Serialize } from "../util/index.svelte.ts";
import { type ClaraPlugin } from "../plugin/index.svelte.ts";
import { Template, type SerializedTemplate } from "@clara/api/project";
import { SinglePane, TabList } from "@clara/api/ui";
import { pressHotkey, runAction, type ActionName, type Keybinding, key } from "./action.svelte.ts";

export { pressHotkey, runAction, key };

export type { ActionName, Keybinding };

type SerializedUserSettings = { templates: SerializedTemplate[]; themes: Theme[]; selectedTheme: string };

class UserSettings implements Serialize<SerializedUserSettings> {
	private templates_: Template[];
	private themes_: Theme[];
	private selectedTheme_: string;

	private plugins_: ClaraPlugin<any>[] = $state([]);
	public disabledPlugins_: string[] = $state([]);
	public autosave = $state(true);

	public hotkeys: Record<string, Keybinding> = $state({
		"New Tab": key("n", "ctrl"),
		"Save Project": key("s", "ctrl"),
		"Open Command Palette": key("p", "ctrl"),
	});

	public constructor() {
		let tablist = new TabList([]);
		let database = new Group({
			name: "Blank",
			icon: "StickyNote",
			description: "A blank project with no datasets.",
		});
		this.templates_ = $state([
			new Template({
				database,
				layout: new SinglePane(tablist),
				pinnedGroups: [database],
				plugin_id: "clara",
				types: [],
			}),
		]);
		this.themes_ = $state([]);
		this.selectedTheme_ = $state("");
	}

	public disablePlugin(plugin: ClaraPlugin<any>) {
		this.disabledPlugins_.push(plugin.identifier);
	}

	public enabledPlugins() {
		return this.plugins.filter(plugin => this.isPluginEnabled(plugin));
	}

	public disabledPlugins() {
		return this.plugins.filter(plugin => !this.isPluginEnabled(plugin));
	}

	public enablePlugin(plugin: ClaraPlugin<any>) {
		this.disabledPlugins_ = this.disabledPlugins_.filter(identifier => identifier !== plugin.identifier);
	}

	public isPluginEnabled(plugin: ClaraPlugin<any>) {
		return !this.disabledPlugins_.includes(plugin.identifier);
	}

	public addTheme(theme: Theme): void {
		this.themes_.push(theme);
	}

	public addPlugin(plugin: ClaraPlugin<any>): void {
		this.plugins_.push(plugin);
	}

	public get themes(): readonly Theme[] {
		return this.themes_;
	}

	public get plugins(): ClaraPlugin<any>[] {
		return this.plugins_;
	}

	public get selectedTheme(): Theme {
		return this.themes.find(theme => theme.name === this.selectedTheme_)!;
	}

	public selectTheme(name: string): void {
		this.selectedTheme_ = name;
		if (!document) return;
		document.querySelector("[data-theme]")?.remove();

		let style = document.createElement("style");
		style.innerHTML = this.selectedTheme.css;
		document.head.appendChild(style);
	}

	public get templates(): readonly Template[] {
		return this.templates_;
	}

	public addTemplate(template: Template): void {
		this.templates_.push(template);
	}

	public serialize(): SerializedUserSettings {
		return {
			templates: this.templates_.map(template => template.serialize()),
			themes: this.themes_,
			selectedTheme: this.selectedTheme_,
		};
	}
}

export function registerHotkey(key: Keybinding, action: string) {
	userSettings().hotkeys[action] = key;
}

let storedUserData: UserSettings | null = $state(null);

export function userSettings(): UserSettings {
	if (!storedUserData) storedUserData = new UserSettings();
	return storedUserData;
}

export async function saveUserSettings() {
	await invoke("save_user_data", { data: userSettings().serialize() });
}

export type SessionData = {
	lastProjectPath: string | null;
	projectsDirPath: string | null;
};

let sessionData: SessionData = $state(loadSessionData());

function loadSessionData(): SessionData {
	return JSON.parse(
		localStorage.getItem("session-data") ??
			JSON.stringify({
				lastProjectPath: null,
				projectsDirPath: null,
			}),
	);
}

function saveSessionData() {
	localStorage.setItem("session-data", JSON.stringify(sessionData));
}

export function cache(values: Partial<SessionData>) {
	sessionData = { ...sessionData, ...values };
	saveSessionData();
}

export function getFromCache<Key extends keyof SessionData>(key: Key): SessionData[Key] {
	return sessionData[key];
}
