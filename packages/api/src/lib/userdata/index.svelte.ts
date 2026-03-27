import { AttributeDefinition } from "$lib/data/attribute/definition.svelte";
import { Group, Item, type Database, type SerializedDatabase } from "$lib/data/database.svelte";
import { BlankPageIcon, GearIcon, LocationIcon, ParagraphIcon, PersonIcon } from "$lib/ui/icons.svelte";
import { invoke } from "@tauri-apps/api/core";

type UserData = { templates: Database[] };

let storedUserData: UserData | null = $state(null);

export function userData(): UserData {
	if (!storedUserData) {
		storedUserData = {
			templates: [
				new Group({
					name: "Blank",
					icon: BlankPageIcon,
					description: "A blank project with no datasets. This is not recommended for first time users; Use Basic instead.",
				}),
			],
		};
	}

	return storedUserData;
}

type SerializedUserData = { templates: SerializedDatabase[] };

function serializeUserData(): SerializedUserData {
	return {
		templates: userData().templates.map(template => template.serialize()),
	};
}

export async function saveUserData() {
	await invoke("save_user_data", { data: serializeUserData() });
}

export type SessionData = {
	lastProjectPath: string | null;
};

let sessionData: SessionData = $state(loadSessionData());

function loadSessionData(): SessionData {
	return JSON.parse(
		localStorage.getItem("session-data") ??
			JSON.stringify({
				lastProjectPath: null,
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
