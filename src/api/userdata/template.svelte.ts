import BookIcon from "../../components/icons/BookIcon.svelte";
import { Database, DataEntry, Dataset } from "../data/dataset.svelte";
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
import type { IconComponent } from "../ui/icons.svelte";
import { Container } from "../util/Clone.svelte";
import { empty } from "../util/utils.svelte";

export class ProjectBase {
	name: string = $state(empty());
	database: Container<Database> = $state(empty());
	description?: string = $state(empty());
	icon: IconComponent = $state(empty());
	id: number = $state(empty());

	private static projectID = 0;

	public constructor({
		name,
		database,
		description = undefined,
		icon = BookIcon,
	}: {
		name: string;
		database: Database;
		description?: string;
		icon?: IconComponent;
	}) {
		this.name = name;
		this.database = new Container(database);
		this.description = description;
		this.icon = icon;
		this.id = ProjectBase.projectID++;
	}
}

export class Template extends ProjectBase {
	private static all_: Template[] | null = null;

	public static get all(): Template[] {
		if (!Template.all_) {
			Template.all_ = [
				new Template({
					name: "Basic",
					icon: BookIcon,
					description: "A basic, opinionated setup with minimal scaffolding.",
					database: new Database(
						Dataset.create({
							name: "Plot Events",
							icon: BookIcon,
							description: "The events of this story. The actual scene prose exists here.",
							data: DataEntry.node("Plot Events"),
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
							data: DataEntry.node("Characters"),
							fields: [new Attribute("Name", "Short text")],
						}),
						Dataset.create({
							name: "Locations",
							icon: LocationIcon,
							description: "The locations in this story.",
							data: DataEntry.node("Locations"),
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
							data: DataEntry.node("Locations"),
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
			];
		}

		return Template.all_;
	}
}
