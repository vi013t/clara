import BlankPageIcon from "../../components/icons/BlankPageIcon.svelte";
import BookIcon from "../../components/icons/BookIcon.svelte";
import CatIcon from "../../components/icons/CatIcon.svelte";
import FichteanCurveIcon from "../../components/icons/FichteanCurveIcon.svelte";
import GearIcon from "../../components/icons/GearIcon.svelte";
import LocationIcon from "../../components/icons/LocationIcon.svelte";
import ParagraphIcon from "../../components/icons/ParagraphIcon.svelte";
import PersonIcon from "../../components/icons/PersonIcon.svelte";
import PyramidIcon from "../../components/icons/PyramidIcon.svelte";
import SevenPointStructureIcon from "../../components/icons/SevenPointStructureIcon.svelte";
import SwordIcon from "../../components/icons/SwordIcon.svelte";
import TheaterIcon from "../../components/icons/TheaterIcon.svelte";
import WheelIcon from "../../components/icons/WheelIcon.svelte";
import { AttributeDefinition } from "../data/attribute/attribute.svelte";
import { Group, Item, type Database } from "../data/database.svelte";

type UserData = { templates: Database[] };

let storedUserData: UserData | null = $state(null);

export function userData(): UserData {
	if (!storedUserData) {
		storedUserData = {
			templates: [
				new Group(
					{
						name: "Basic",
						icon: BookIcon,
						description: "A basic, opinionated setup with minimal scaffolding.",
					},
					new Group({
						name: "Plot Events",
						icon: BookIcon,
						description: "The events of this story. The actual scene prose exists here.",
					}),
					new Group({
						name: "Characters",
						icon: PersonIcon,
						description: "The characters of this story.",
					}),
					new Group({
						name: "Locations",
						icon: LocationIcon,
						description: "The locations in this story.",
						attributes: [AttributeDefinition.basic("Name", "Short text")],
					}),
				),
				new Group(
					{
						name: "Three Act Structure",
						icon: TheaterIcon,
						description: "A basic, opinionated setup with minimal scaffolding.",
					},
					new Group(
						{
							name: "Plot Events",
							icon: ParagraphIcon,
							description: "The events of this story. The actual scene prose exists here.",
							attributes: [
								AttributeDefinition.basic("Name", "Short text"),
								AttributeDefinition.basic("Script", "Long text"),
								AttributeDefinition.basic("Notes", "Long text"),
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
						new Group({
							name: "Characters",
							icon: PersonIcon,
							description: "The characters of this story.",
							attributes: [
								AttributeDefinition.basic("Name", "Short text"),
								AttributeDefinition.basic("Gender", "Short text"),
								AttributeDefinition.basic("Sexuality", "Short text"),
								AttributeDefinition.basic("Height", "Length"),
								AttributeDefinition.basic("Partner", "Item"),
							],
						}),
						new Group({
							name: "Locations",
							icon: LocationIcon,
							description: "The locations in this story.",
							attributes: [AttributeDefinition.basic("Name", "Short text")],
						}),
					),
				),
				new Group({
					name: "Hero's Journey",
					icon: SwordIcon,
					description: "A book outlined with the Hero's Journey structure.",
				}),
				new Group({
					name: "Save the Cat",
					icon: CatIcon,
					description: "A book outlined with the Hero's Journey structure.",
				}),
				new Group({
					name: "Freytag's Pyramid",
					icon: PyramidIcon,
					description: "A book outlined with the Hero's Journey structure.",
				}),
				new Group({
					name: "Story Wheel",
					icon: WheelIcon,
					description: "A book outlined with the Hero's Journey structure.",
				}),
				new Group({
					name: "Fichtean Curve",
					icon: FichteanCurveIcon,
					description: "A book outlined with the Hero's Journey structure.",
				}),
				new Group({
					name: "Seven Point Story Structure",
					icon: SevenPointStructureIcon,
					description: "A book outlined with the Hero's Journey structure.",
				}),
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
								AttributeDefinition.basic("Name", "Short text"),
								AttributeDefinition.basic("Script", "Long text"),
								AttributeDefinition.basic("Notes", "Long text"),
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
						new Group(
							{
								name: "Characters",
								icon: PersonIcon,
								description: "The characters of this story.",
								attributes: [
									AttributeDefinition.basic("Name", "Short text"),
									AttributeDefinition.basic("Gender", "Short text"),
									AttributeDefinition.basic("Sexuality", "Short text"),
									AttributeDefinition.basic("Height", "Length"),
									AttributeDefinition.basic("Partner", "Item"),
								],
							},
							new Group("Main Characters"),
							new Group("Main Characters"),
						),
						new Group({
							name: "Locations",
							icon: LocationIcon,
							description: "The locations in this story.",
							attributes: [AttributeDefinition.basic("Name", "Short text")],
						}),
					),
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
