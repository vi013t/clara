<script lang="ts" module>
	import BookIcon from "../components/icons/BookIcon.svelte";
	import PersonIcon from "../components/icons/PersonIcon.svelte";
	import LocationIcon from "../components/icons/LocationIcon.svelte";
	import SpreadsheetIcon from "../components/icons/SpreadsheetIcon.svelte";
	import GraphIcon from "../components/icons/GraphIcon.svelte";
	import TreeIcon from "../components/icons/TreeIcon.svelte";
	import type { Snippet } from "svelte";
	import type { Icon } from "./components";
	import ParagraphIcon from "../components/icons/ParagraphIcon.svelte";
	import NumberSignIcon from "../components/icons/NumberSignIcon.svelte";
	import TextIcon from "../components/icons/TextIcon.svelte";
	import { encode, decode } from "@msgpack/msgpack";
	import TheaterIcon from "../components/icons/TheaterIcon.svelte";
	import BlankPageIcon from "../components/icons/BlankPageIcon.svelte";
	import SwordIcon from "../components/icons/SwordIcon.svelte";
	import CatIcon from "../components/icons/CatIcon.svelte";
	import PyramidIcon from "../components/icons/PyramidIcon.svelte";
	import WheelIcon from "../components/icons/WheelIcon.svelte";
	import FichteanCurveIcon from "../components/icons/FichteanCurveIcon.svelte";
	import SevenPointStructureIcon from "../components/icons/SevenPointStructureIcon.svelte";

	export function serializeProject(project: Project) {
		return encode(project);
	}

	export function deserializeProject(buffer: Uint8Array<ArrayBuffer>): Project {
		return decode(buffer) as Project;
	}

	export type TreeNode<T> = {
		parent?: TreeNode<T>;
		children: TreeNode<T>[];
		data: T;
		isGroup: boolean;
	};

	export type Value = number | string;
	export type ValueType = "number" | "short text" | "long text";
	export type Field = { name: string; ValueType: ValueType };
	export type DataRow = { id: number; Name: string } & { [key: string]: Value };

	let dataID = 0;

	export function dataEntry(parent: Omit<DataRow, "id">, children: TreeNode<DataRow>[] = [], leaf?: boolean) {
		let parentEntry: DataRow = { ...parent, id: dataID++ } as DataRow;
		return treeNode<DataRow>(parentEntry, children, leaf);
	}

	export function valueTypeIcon(type: ValueType): Icon {
		return {
			number: NumberSignIcon,
			"long text": ParagraphIcon,
			"short text": TextIcon,
		}[type];
	}

	export function treeNode<TreeNodeData>(
		parent: TreeNodeData,
		children: TreeNode<TreeNodeData>[] = [],
		leaf?: boolean,
	): TreeNode<TreeNodeData> {
		if (leaf === undefined) leaf = children.length === 0;

		let parentNode: TreeNode<TreeNodeData> = {
			children: [],
			data: parent,
			isGroup: !leaf,
		};

		children.forEach(child => {
			child.parent = parentNode;
			parentNode.children.push(child);
		});

		return parentNode;
	}

	export const views = {
		hierarchy: {
			icon: TreeIcon,
		},
		graph: {
			icon: GraphIcon,
		},
		spreadsheet: {
			icon: SpreadsheetIcon,
		},
	} as const;

	export type View = keyof typeof views;

	export function bfsTree<Data>(start: TreeNode<Data>, visited: Data[] = []): Data[] {
		visited.push(start.data);
		start.children.forEach(child => {
			visited = [...visited, ...bfsTree(child)];
		});
		return visited;
	}

	export function bfsTreeLeaves<Data>(start: TreeNode<Data>, visited: Data[] = []): Data[] {
		if (!start.isGroup) visited.push(start.data);
		start.children.forEach(child => {
			visited = [...visited, ...bfsTreeLeaves(child)];
		});
		return visited;
	}

	export type ManualDataset = {
		name: string;
		icon: Icon;
		data: TreeNode<DataRow>;
		fields: Field[];
		description?: string;
	};

	export type GeneratedDataset = {
		name: string;
		icon: Icon;
		description?: string;
		content: Snippet;
	};

	export type Dataset = ManualDataset | GeneratedDataset;

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
					{
						name: "Plot Events",
						icon: BookIcon,
						description: "The events of this story. The actual scene prose exists here.",
						data: dataEntry({ Name: "Plot Events" }),
						fields: [
							{ name: "Name", ValueType: "short text" },
							{ name: "Script", ValueType: "long text" },
						],
					},
					{
						name: "Characters",
						icon: PersonIcon,
						description: "The characters of this story.",
						data: dataEntry({ Name: "Characters" }),
						fields: [{ name: "Name", ValueType: "short text" }],
					},
					{
						name: "Locations",
						icon: LocationIcon,
						description: "The locations in this story.",
						data: dataEntry({ Name: "Locations" }),
						fields: [{ name: "Name", ValueType: "short text" }],
					},
					{
						name: "Manuscript",
						icon: BookIcon,
						description: "The entire combined project manuscript.",
						content: manuscript,
					},
				];
			},
		},
		threeActStructure: {
			name: "Three Act Structure",
			icon: TheaterIcon,
			description: "A basic, opinionated setup with minimal scaffolding.",
			datasets() {
				return [
					{
						name: "Plot Events",
						icon: ParagraphIcon,
						description: "The events of this story. The actual scene prose exists here.",
						data: dataEntry({ Name: "Plot Events" }, [
							dataEntry({ Name: "Act I" }, [
								dataEntry({ Name: "Hook" }, [dataEntry({ Name: "Chapter 1" }, [dataEntry({ Name: "Scene 1" })])]),
								dataEntry({ Name: "Inciting Incident" }, [], false),
								dataEntry({ Name: "First Plot Point" }, [], false),
							]),
							dataEntry({ Name: "Act II" }, [
								dataEntry({ Name: "First Pinch Point" }, [], false),
								dataEntry({ Name: "Midpoint" }, [], false),
								dataEntry({ Name: "Second Pinch Point" }, [], false),
							]),
							dataEntry({ Name: "Act III" }, [
								dataEntry({ Name: "Third Plot Point" }, [], false),
								dataEntry({ Name: "Climax" }, [], false),
								dataEntry({ Name: "Resolution" }, [], false),
							]),
						]),
						fields: [
							{ name: "Name", ValueType: "short text" },
							{ name: "Script", ValueType: "long text" },
						],
					},
					{
						name: "Characters",
						icon: PersonIcon,
						description: "The characters of this story.",
						data: dataEntry({ Name: "Characters" }),
						fields: [{ name: "Name", ValueType: "short text" }],
					},
					{
						name: "Locations",
						icon: LocationIcon,
						description: "The locations in this story.",
						data: dataEntry({ Name: "Locations" }),
						fields: [{ name: "Name", ValueType: "short text" }],
					},
					{
						name: "Manuscript",
						icon: BookIcon,
						description: "The entire combined project manuscript.",
						content: manuscript,
					},
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

	type Project = {
		name: string;
		datasets: Dataset[];
	};

	let currentProject: Project = $state({
		name: "Book Title",
		datasets: frameworks.threeActStructure.datasets(),
	});

	export function project() {
		return currentProject;
	}

	export function isGenerated(dataset: Dataset): boolean {
		return "content" in dataset;
	}
</script>

{#snippet manuscript()}
	{#each bfsTree((project().datasets.find(dataset => dataset.name === "Plot Events") as ManualDataset).data) as entry}
		<span contenteditable bind:textContent={entry.content as string}></span>
	{/each}
{/snippet}
