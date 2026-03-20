import { Database } from "../data/dataset.svelte";
import BookIcon from "../../components/icons/BookIcon.svelte";
import { DataEntry, Dataset } from "../data/dataset.svelte";
import PersonIcon from "../../components/icons/PersonIcon.svelte";
import LocationIcon from "../../components/icons/LocationIcon.svelte";
import TheaterIcon from "../../components/icons/TheaterIcon.svelte";
import ParagraphIcon from "../../components/icons/ParagraphIcon.svelte";
import SwordIcon from "../../components/icons/SwordIcon.svelte";
import CatIcon from "../../components/icons/CatIcon.svelte";
import PyramidIcon from "../../components/icons/PyramidIcon.svelte";
import WheelIcon from "../../components/icons/WheelIcon.svelte";
import FichteanCurveIcon from "../../components/icons/FichteanCurveIcon.svelte";
import SevenPointStructureIcon from "../../components/icons/SevenPointStructureIcon.svelte";
import BlankPageIcon from "../../components/icons/BlankPageIcon.svelte";
import { Attribute } from "../data/attribute.svelte";
import { Template } from "./template.svelte";

type UserData = { templates: Template[] };

let storedUserData: UserData | null = $state(null);

export function userData(): UserData {
	if (!storedUserData) {
		storedUserData = {
			templates: [
				new Template({
					name: "Basic",
					icon: BookIcon,
					description: "A basic, opinionated setup with minimal scaffolding.",
					database: new Database(
						Dataset.create({
							name: "Plot Events",
							icon: BookIcon,
							description: "The events of this story. The actual scene prose exists here.",
							data: DataEntry.node("Plot Events", [], false),
							fields: [
								new Attribute("Name", "Short text"),
								new Attribute("Script", "Long text"),
								new Attribute("Notes", "Long text"),
							],
						}),
						Dataset.create({
							name: "Characters",
							icon: PersonIcon,
							description: "The characters of this story.",
							data: DataEntry.node("Characters", [], false),
							fields: [new Attribute("Name", "Short text")],
						}),
						Dataset.create({
							name: "Locations",
							icon: LocationIcon,
							description: "The locations in this story.",
							data: DataEntry.node("Locations", [], false),
							fields: [new Attribute("Name", "Short text")],
						}),
						Dataset.generated({
							name: "Manuscript",
							icon: BookIcon,
							description: "The entire combined project manuscript.",
						}),
					),
				}),
				new Template({
					name: "Three Act Structure",
					icon: TheaterIcon,
					description: "A basic, opinionated setup with minimal scaffolding.",
					database: new Database(
						Dataset.create({
							name: "Plot Events",
							icon: ParagraphIcon,
							description: "The events of this story. The actual scene prose exists here.",
							data: DataEntry.node("Plot Events", [
								DataEntry.node("Act I", [
									DataEntry.node("Hook", [DataEntry.node("Chapter 1", [DataEntry.node("Scene 1")])]),
									DataEntry.node("Inciting Incident", [], false),
									DataEntry.node("First Plot Point", [], false),
								]),
								DataEntry.node("Act II", [
									DataEntry.node("First Pinch Point", [], false),
									DataEntry.node("Midpoint", [], false),
									DataEntry.node("Second Pinch Point", [], false),
								]),
								DataEntry.node("Act III", [
									DataEntry.node("Third Plot Point", [], false),
									DataEntry.node("Climax", [], false),
									DataEntry.node("Resolution", [], false),
								]),
							]),
							fields: [
								new Attribute("Name", "Short text"),
								new Attribute("Script", "Long text"),
								new Attribute("Notes", "Long text"),
							],
						}),
						Dataset.create({
							name: "Characters",
							icon: PersonIcon,
							description: "The characters of this story.",
							data: DataEntry.node("Characters", [], false),
							fields: [
								new Attribute("Name", "Short text"),
								new Attribute("Gender", "Short text"),
								new Attribute("Sexuality", "Short text"),
								new Attribute("Height", "Length"),
								new Attribute("Weight", "Weight"),
								new Attribute("Partner", "Short text"),
							],
						}),
						Dataset.create({
							name: "Locations",
							icon: LocationIcon,
							description: "The locations in this story.",
							data: DataEntry.node("Locations", [], false),
							fields: [new Attribute("Name", "Short text")],
						}),
						Dataset.generated({
							name: "Manuscript",
							icon: BookIcon,
							description: "The entire combined project manuscript.",
						}),
					),
				}),
				new Template({
					name: "Hero's Journey",
					icon: SwordIcon,
					description: "A book outlined with the Hero's Journey structure.",
					database: new Database(),
				}),
				new Template({
					name: "Save the Cat",
					icon: CatIcon,
					description: "A book outlined with the Hero's Journey structure.",
					database: new Database(),
				}),
				new Template({
					name: "Freytag's Pyramid",
					icon: PyramidIcon,
					description: "A book outlined with the Hero's Journey structure.",
					database: new Database(),
				}),
				new Template({
					name: "Story Wheel",
					icon: WheelIcon,
					description: "A book outlined with the Hero's Journey structure.",
					database: new Database(),
				}),
				new Template({
					name: "Fichtean Curve",
					icon: FichteanCurveIcon,
					description: "A book outlined with the Hero's Journey structure.",
					database: new Database(),
				}),
				new Template({
					name: "Seven Point Story Structure",
					icon: SevenPointStructureIcon,
					description: "A book outlined with the Hero's Journey structure.",
					database: new Database(),
				}),
				new Template({
					name: "Blank",
					icon: BlankPageIcon,
					description: "A blank project with no datasets. This is not recommended for first time users; Use Basic instead.",
					database: new Database(),
				}),
				new Template({
					name: "Test",
					icon: BookIcon,
					description: "Dev testing",
					database: new Database(
						Dataset.create({
							name: "Plot Events",
							icon: ParagraphIcon,
							description: "The events of this story. The actual scene prose exists here.",
							data: DataEntry.node("Plot Events", [
								DataEntry.node("Act I", [
									DataEntry.node("Hook", [DataEntry.node("Chapter 1", [DataEntry.node("Scene 1")])]),
									DataEntry.node("Inciting Incident", [], false),
									DataEntry.node("First Plot Point", [], false),
								]),
								DataEntry.node("Act II", [
									DataEntry.node("First Pinch Point", [], false),
									DataEntry.node("Midpoint", [], false),
									DataEntry.node("Second Pinch Point", [], false),
								]),
								DataEntry.node("Act III", [
									DataEntry.node("Third Plot Point", [], false),
									DataEntry.node("Climax", [], false),
									DataEntry.node("Resolution", [], false),
								]),
							]),
							fields: [
								new Attribute("Name", "Short text"),
								new Attribute("Script", "Long text"),
								new Attribute("Notes", "Long text"),
							],
						}),
						Dataset.create({
							name: "Characters",
							icon: PersonIcon,
							description: "The characters of this story.",
							data: DataEntry.node(
								"Characters",
								[
									DataEntry.node("Main Characters", [DataEntry.node("Harry"), DataEntry.node("Hermione"), DataEntry.node("Ron")]),
									DataEntry.node("Side Characters", [
										DataEntry.node("Professors", [
											DataEntry.node("Snape"),
											DataEntry.node("Dumbledore"),
											DataEntry.node("Quirrel"),
											DataEntry.node("Remus"),
										]),
										DataEntry.node("Students", [
											DataEntry.node("Neville"),
											DataEntry.node("Seamus"),
											DataEntry.node("Ginny"),
											DataEntry.node("Fred"),
											DataEntry.node("George"),
										]),
										DataEntry.node("Villains", [
											DataEntry.node("Voldemort"),
											DataEntry.node("Lucius"),
											DataEntry.node("Dementors"),
										]),
									]),
								],
								false,
							),
							fields: [
								new Attribute("Name", "Short text"),
								new Attribute("Gender", "Short text"),
								new Attribute("Sexuality", "Short text"),
								new Attribute("Height", "Length"),
								new Attribute("Weight", "Weight"),
								new Attribute("Partner", "Short text"),
							],
						}),
						Dataset.create({
							name: "Locations",
							icon: LocationIcon,
							description: "The locations in this story.",
							data: DataEntry.node("Locations", [], false),
							fields: [new Attribute("Name", "Short text")],
						}),
						Dataset.generated({
							name: "Manuscript",
							icon: BookIcon,
							description: "The entire combined project manuscript.",
						}),
					),
				}),
			],
		};
	}

	return storedUserData;
}

export function saveUserData() {}

let sessionData = $state();
