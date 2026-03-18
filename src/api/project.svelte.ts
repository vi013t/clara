import type { Icon } from "./components";
import { DataEntry, Dataset } from "./data/dataset";
import BookIcon from "../components/icons/BookIcon.svelte";
import PersonIcon from "../components/icons/PersonIcon.svelte";
import LocationIcon from "../components/icons/LocationIcon.svelte";
import ParagraphIcon from "../components/icons/ParagraphIcon.svelte";
import TheaterIcon from "../components/icons/TheaterIcon.svelte";
import BlankPageIcon from "../components/icons/BlankPageIcon.svelte";
import SwordIcon from "../components/icons/SwordIcon.svelte";
import CatIcon from "../components/icons/CatIcon.svelte";
import PyramidIcon from "../components/icons/PyramidIcon.svelte";
import WheelIcon from "../components/icons/WheelIcon.svelte";
import FichteanCurveIcon from "../components/icons/FichteanCurveIcon.svelte";
import SevenPointStructureIcon from "../components/icons/SevenPointStructureIcon.svelte";
import { type BackendDataset } from "./data/dataset";

export type Framework = {
	name: string;
	icon: Icon;
	description: string;
	datasets(): Dataset[];
};

export const frameworks = {
	basic: {
		name: "Basic",
		icon: BookIcon,
		description: "A basic, opinionated setup with minimal scaffolding.",
		datasets() {
			return [
				Dataset.create({
					name: "Plot Events",
					icon: BookIcon,
					description: "The events of this story. The actual scene prose exists here.",
					data: DataEntry.node("Plot Events"),
					fields: [
						{ name: "Name", type: "short text" },
						{ name: "Script", type: "long text" },
					],
				}),
				Dataset.create({
					name: "Characters",
					icon: PersonIcon,
					description: "The characters of this story.",
					data: DataEntry.node("Characters"),
					fields: [{ name: "Name", type: "short text" }],
				}),
				Dataset.create({
					name: "Locations",
					icon: LocationIcon,
					description: "The locations in this story.",
					data: DataEntry.node("Locations"),
					fields: [{ name: "Name", type: "short text" }],
				}),
				Dataset.generated({
					name: "Manuscript",
					icon: BookIcon,
					description: "The entire combined project manuscript.",
				}),
			];
		},
	},
	threeActStructure: {
		name: "Three Act Structure",
		icon: TheaterIcon,
		description: "A basic, opinionated setup with minimal scaffolding.",
		datasets() {
			return [
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
						{ name: "Name", type: "short text" },
						{ name: "Script", type: "long text" },
					],
				}),
				Dataset.create({
					name: "Characters",
					icon: PersonIcon,
					description: "The characters of this story.",
					data: DataEntry.node("Characters", [], false),
					fields: [
						{ name: "Name", type: "short text" },
						{ name: "Gender", type: "short text" },
						{ name: "Sexuality", type: "short text" },
						{ name: "Height", type: "length" },
						{ name: "Weight", type: "weight" },
						{ name: "Partner", type: "short text" },
					],
				}),
				Dataset.create({
					name: "Locations",
					icon: LocationIcon,
					description: "The locations in this story.",
					data: DataEntry.node("Locations"),
					fields: [{ name: "Name", type: "short text" }],
				}),
				Dataset.generated({
					name: "Manuscript",
					icon: BookIcon,
					description: "The entire combined project manuscript.",
				}),
			];
		},
	},
	herosJourney: {
		name: "Hero's Journey",
		icon: SwordIcon,
		description: "A book outlined with the Hero's Journey structure.",
		datasets() {
			return [];
		},
	},
	saveTheCat: {
		name: "Save the Cat",
		icon: CatIcon,
		description: "A book outlined with the Hero's Journey structure.",
		datasets() {
			return [];
		},
	},
	freytagsPyramid: {
		name: "Freytag's Pyramid",
		icon: PyramidIcon,
		description: "A book outlined with the Hero's Journey structure.",
		datasets() {
			return [];
		},
	},
	storyWheel: {
		name: "Story Wheel",
		icon: WheelIcon,
		description: "A book outlined with the Hero's Journey structure.",
		datasets() {
			return [];
		},
	},
	fichteanCurve: {
		name: "Fichtean Curve",
		icon: FichteanCurveIcon,
		description: "A book outlined with the Hero's Journey structure.",
		datasets() {
			return [];
		},
	},
	sevenPoint: {
		name: "Seven Point Story Structure",
		icon: SevenPointStructureIcon,
		description: "A book outlined with the Hero's Journey structure.",
		datasets() {
			return [];
		},
	},
	blank: {
		name: "Blank",
		icon: BlankPageIcon,
		description: "A blank project with no datasets. This is not recommended for first time users; Use Basic instead.",
		datasets() {
			return [];
		},
	},
} as const satisfies { [key: string]: Framework };

export class Project {
	name: string;
	location: string;
	framework: Framework;
	datasets: Dataset[];

	public constructor({
		name,
		location,
		framework,
		datasets,
	}: {
		name: string;
		location: string;
		framework: Framework;
		datasets: Dataset[];
	}) {
		this.name = name;
		this.location = location;
		this.framework = framework;
		this.datasets = datasets;
	}

	public static fromBackend(project: BackendProject): Project {
		return new Project({
			name: project.name,
			location: project.location,
			framework: Object.values(frameworks).find(framework => framework.name === project.framework)!,
			datasets: project.datasets.map(dataset => Dataset.fromBackend(dataset)),
		});
	}

	public static set(project: Project): void {
		currentProject = project;
		localStorage.setItem("project-location", project.location);
	}

	public static get(): Project {
		return currentProject;
	}
}

export type BackendProject = {
	name: string;
	location: string;
	framework: string;
	datasets: BackendDataset[];
};

let currentProject = $state(
	new Project({
		name: "Book Title",
		location: "/",
		framework: frameworks.threeActStructure,
		datasets: frameworks.threeActStructure.datasets(),
	}),
);
