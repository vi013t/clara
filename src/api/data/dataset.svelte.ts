import { Project } from "../project.svelte";
import { getIconByName, getIconName, type IconComponent, type IconName } from "../ui/icons.svelte";
import { userData } from "../userdata/cache.svelte";
import { Template } from "../userdata/template.svelte";
import { Container, type Cloneable } from "../util/Clone.svelte";
import type { Serialize } from "../util/serialize.svelte";
import { empty, mapValues } from "../util/utils.svelte";
import {
	Attribute,
	attributeValueFromBackend,
	PrimitiveAttribute,
	type AttributeValue,
	type BackendAttribute,
	type BackendAttributeValue,
} from "./attribute.svelte";
import { TreeNode, type BackendTreeNode } from "./structure/tree.svelte";

type DatasetKind = "manual" | "generated";

export type BackendDataEntry = {
	data: { [key: string]: BackendAttributeValue };
};

export class DataEntry implements Cloneable<DataEntry>, Serialize<BackendDataEntry> {
	private data: { [key: string]: AttributeValue } = $state(empty());

	private static nextDataID = 0;
	private static entries: { [key: number]: DataEntry } = {};

	public constructor(name: string, values: { [key: string]: AttributeValue } = {}) {
		this.data = {
			...values,
			Name: new PrimitiveAttribute(name),
			id: new PrimitiveAttribute(DataEntry.nextID()),
		};
		DataEntry.entries[this.id] = this;
	}

	private static nextID() {
		while (DataEntry.fromID(this.nextDataID)) {
			this.nextDataID++;
		}
		return this.nextDataID;
	}

	toBackend(): BackendDataEntry {
		return {
			data: mapValues(this.data, value => value.toBackend()),
		};
	}

	public static fromBackend(entry: BackendDataEntry): DataEntry {
		return new DataEntry(
			entry.data.Name as string,
			mapValues(entry.data, value => attributeValueFromBackend(value)),
		);
	}

	clone(): DataEntry {
		return new DataEntry(
			this.name,
			mapValues(this.data, value => value.clone()),
		);
	}

	public static fromID(id: number): DataEntry | null {
		return DataEntry.entries[id] ?? null;
	}

	public get name(): string {
		return (this.data.Name as PrimitiveAttribute<string>).value;
	}

	public set name(name: string) {
		this.data.Name = new PrimitiveAttribute(name);
	}

	public get id(): number {
		return (this.data.id as PrimitiveAttribute<number>).value;
	}

	public get(key: string): AttributeValue | null {
		return this.data[key] ?? null;
	}

	public set(key: string, value: AttributeValue): void {
		this.data[key] = value;
	}

	public remove(key: string) {
		delete this.data[key];
	}

	public static node(
		name: string,
		children: TreeNode<DataEntry>[] = [],
		isLeaf: boolean | undefined = undefined,
	): TreeNode<DataEntry> {
		if (isLeaf === undefined) isLeaf = children.length === 0;
		return new TreeNode(new DataEntry(name), children, !isLeaf);
	}
}

export abstract class Dataset<Kind extends DatasetKind = DatasetKind> {
	public name: string = $state(empty());
	public icon: IconComponent = $state(empty());
	public description?: string = $state(empty());

	public readonly id: number = $state(empty());
	public readonly kind: Kind = $state(empty());

	private static datasetID = 0;

	protected constructor({
		kind,
		name,
		icon,
		description = undefined,
	}: {
		kind: Kind;
		name: string;
		icon: IconComponent;
		description?: string;
	}) {
		this.kind = kind;
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.id = Dataset.datasetID++;
	}

	public static create(data: {
		name: string;
		data: TreeNode<DataEntry>;
		icon: IconComponent;
		fields: Attribute[];
		description?: string;
	}): ManualDataset {
		return new ManualDataset(data);
	}

	public static generated(data: { name: string; icon: IconComponent; description?: string }): GeneratedDataset {
		return new GeneratedDataset(data);
	}

	public isGenerated(): this is GeneratedDataset {
		return this.kind === "generated";
	}

	public isManual(): this is ManualDataset {
		return this.kind === "manual";
	}

	public ifManual<Return>(callback: (set: ManualDataset) => Return): Return | null {
		if (this.isManual()) {
			return callback(this);
		}

		return null;
	}

	public ifGenerated<Return>(callback: (set: GeneratedDataset) => Return): Return | null {
		if (this.isGenerated()) {
			return callback(this);
		}

		return null;
	}

	public abstract toBackend(): BackendDataset<Kind>;
	public abstract clone(): Dataset<Kind>;

	public delete(): void {
		this.database().ref().deleteDataset(this);
	}

	public database(): Container<Database> {
		let project = Project.get();
		if (project) {
			for (let dataset of project.database.ref().datasets.ref()) {
				if (dataset.ref().id === this.id) {
					return project.database;
				}
			}
		}
		for (let database of userData().templates.map(template => template.database)) {
			for (let dataset of database.ref().datasets.ref()) {
				if (dataset.ref().id === this.id) {
					return database;
				}
			}
		}

		throw `Internal Error: Dataset "${this.name}" does not belong to a database.`;
	}

	public static fromBackend<Kind extends DatasetKind = DatasetKind>(dataset: BackendDataset<Kind>): Dataset<Kind> {
		if (dataset.kind === "manual") {
			return Dataset.create({
				name: dataset.name,
				icon: getIconByName(dataset.iconName)!,
				description: dataset.description,
				fields: dataset.fields.map(field => Attribute.fromBackend(field)),
				data: TreeNode.fromBackend(dataset.data, data => DataEntry.fromBackend(data)),
			}) as unknown as Dataset<Kind>;
		}

		return Dataset.generated({
			name: dataset.name,
			icon: getIconByName(dataset.iconName)!,
			description: dataset.description,
		}) as unknown as Dataset<Kind>;
	}
}

export class ManualDataset extends Dataset<"manual"> {
	public fields: Container<Attribute[]> = $state(empty());
	public data: Container<TreeNode<DataEntry>> = $state(empty());

	public constructor({
		name,
		icon,
		data,
		fields,
		description = undefined,
	}: {
		name: string;
		data: TreeNode<DataEntry>;
		fields: Attribute[];
		icon: IconComponent;
		description?: string;
	}) {
		super({ kind: "manual", name, icon, description });
		this.data = new Container(data);
		this.fields = new Container(fields);
	}

	public toBackend(): BackendManualDataset {
		return {
			kind: "manual",
			name: this.name,
			iconName: getIconName(this.icon),
			description: this.description ?? "",
			fields: this.fields.ref().map(field => field.toBackend()),
			data: this.data.ref().toBackend(),
		};
	}

	public deleteField(id: number) {
		this.fields.overwrite(this.fields.ref().filter(other => other.id !== id));
	}

	public clone(): ManualDataset {
		return new ManualDataset({
			name: this.name,
			icon: this.icon,
			fields: this.fields.clone(),
			data: this.data.clone(),
		});
	}
}

export class GeneratedDataset extends Dataset<"generated"> {
	public constructor({ name, icon, description = undefined }: { name: string; icon: IconComponent; description?: string }) {
		super({ kind: "generated", name, icon, description });
	}

	public clone(): GeneratedDataset {
		return new GeneratedDataset({ name: this.name, icon: this.icon, description: this.description });
	}

	public toBackend(): BackendGeneratedDataset {
		return {
			kind: "generated",
			name: this.name,
			iconName: getIconName(this.icon),
			description: this.description ?? "",
		};
	}
}

export class Database implements Cloneable<Database> {
	public readonly datasets: Container<Container<Dataset>[]> = $state(empty());
	public readonly id = $state(empty());

	private static databaseID = 0;

	public constructor(...datasets: Dataset[]) {
		this.datasets = new Container(datasets.map(dataset => new Container(dataset)));
		this.id = Database.databaseID++;
	}

	public clone(): Database {
		return new Database(...this.datasets.clone().map(dataset => dataset.clone()));
	}

	public manual(): Container<ManualDataset>[] {
		return this.datasets.ref().filter(dataset => dataset.ref().isManual()) as unknown as Container<ManualDataset>[];
	}

	public generated(): Container<GeneratedDataset>[] {
		return this.datasets.ref().filter(dataset => dataset.ref().isGenerated()) as unknown as Container<GeneratedDataset>[];
	}

	public deleteDataset(dataset: Dataset): void {
		this.datasets.overwrite(this.datasets.ref().filter(other => other.ref().id !== dataset.id));
	}

	public toBackend(): BackendDatabase {
		return this.datasets.ref().map(dataset => dataset.ref().toBackend());
	}

	public static fromBackend(database: BackendDatabase): Database {
		return new Database(...database.map(dataset => Dataset.fromBackend(dataset)));
	}
}

export type BackendDatabase = BackendDataset[];

export type BackendManualDataset = {
	kind: "manual";
	name: string;
	iconName: IconName;
	data: BackendTreeNode<BackendDataEntry>;
	fields: BackendAttribute[];
	description: string;
};

export type BackendGeneratedDataset = {
	kind: "generated";
	name: string;
	iconName: IconName;
	description: string;
};

export type BackendDataset<Kind extends DatasetKind = DatasetKind> = Kind extends "manual"
	? BackendManualDataset
	: BackendGeneratedDataset;
