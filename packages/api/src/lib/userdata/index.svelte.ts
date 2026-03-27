import { AttributeDefinition } from "$lib/data/attribute/definition.svelte";
import { Group, Item, type Database } from "$lib/data/database.svelte";
import { BlankPageIcon, GearIcon, LocationIcon, ParagraphIcon, PersonIcon } from "$lib/ui/icons.svelte";

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
				new Group(
					{
						name: "Dev",
						icon: GearIcon,
						description: "dev testing",
					},
					new Group(
						{
							name: "Plot Events",
							icon: ParagraphIcon,
							description: "The events of this story. The actual scene prose exists here.",
							attributes: [
								AttributeDefinition.basic("Name", "shortText"),
								AttributeDefinition.basic("Script", "longText"),
								AttributeDefinition.basic("Notes", "longText"),
							],
						},
						new Group(
							{ name: "Act I" },
							new Group("Hook", new Group(new Group("Chapter 1", new Item("Scene 1")))),
							new Group("Inciting Incident"),
							new Group("First Plot Point"),
						),
						new Group({ name: "Act II" }, new Group("First Pinch Point"), new Group("Midpoint"), new Group("Second Pinch Point")),
						new Group({ name: "Act III" }, new Group("Third Plot Point"), new Group("Climax"), new Group("Resolution")),
					),
					new Group(
						{
							name: "Characters",
							icon: PersonIcon,
							description: "The characters of this story.",
							attributes: [
								AttributeDefinition.basic("Name", "shortText"),
								AttributeDefinition.basic("Gender", "shortText"),
								AttributeDefinition.basic("Sexuality", "shortText"),
								AttributeDefinition.basic("Height", "length"),
								AttributeDefinition.basic("Partner", "entries"),
							],
						},
						new Group("Main Characters"),
						new Group("Side Characters"),
					),
					new Group({
						name: "Locations",
						icon: LocationIcon,
						description: "The locations in this story.",
						attributes: [AttributeDefinition.basic("Name", "shortText")],
					}),
				),
			],
		};
	}

	return storedUserData;
}

export function saveUserData() {}

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
