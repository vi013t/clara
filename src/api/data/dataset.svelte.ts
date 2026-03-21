import { Project } from "../project.svelte";
import { getIconByName, getIconName, type IconComponent, type IconName } from "../ui/icons.svelte";
import { userData } from "../userdata/cache.svelte";
import { Container, type Cloneable } from "../util/Clone.svelte";
import type { Serialize } from "../util/serialize.svelte";
import { assignedLater, mapValues } from "../util/utils.svelte";
import {
	Attribute,
	attributeValueFromBackend,
	PrimitiveArrayAttribute,
	PrimitiveAttribute,
	type AttributeValue,
	type BackendAttribute,
	type BackendAttributeValue,
} from "./attribute.svelte";
import { TreeNode, type BackendTreeNode } from "./graph/tree.svelte";

export type BackendDataEntry = {
	data: { [key: string]: BackendAttributeValue };
};

export class DataEntry implements Cloneable<DataEntry>, Serialize<BackendDataEntry> {
	private data: { [key: string]: AttributeValue } = $state(assignedLater());

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

	public get<T extends AttributeValue | null>(key: string): T {
		return (this.data[key] ?? null) as T;
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

export class Dataset {
	public fields: Container<Attribute[]> = $state(assignedLater());
	public data: Container<TreeNode<DataEntry>> = $state(assignedLater());
	public name: string = $state(assignedLater());
	public icon: IconComponent = $state(assignedLater());
	public description?: string = $state(assignedLater());

	public readonly id: number = $state(assignedLater());

	private static datasetID = 0;

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
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.data = new Container(data);
		this.fields = new Container(fields);
		this.id = Dataset.datasetID++;
	}

	public attributes<T extends AttributeValue>(attribute: Attribute): T[] {
		return this.data
			.ref()
			.dfsLeaves()
			.map(entry => entry.get(attribute.name));
	}

	public toBackend(): BackendDataset {
		return {
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

	public clone(): Dataset {
		return new Dataset({
			name: this.name,
			icon: this.icon,
			fields: this.fields.clone(),
			data: this.data.clone(),
		});
	}

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

	public static fromBackend(dataset: BackendDataset): Dataset {
		return new Dataset({
			name: dataset.name,
			icon: getIconByName(dataset.iconName)!,
			description: dataset.description,
			fields: dataset.fields.map(field => Attribute.fromBackend(field)),
			data: TreeNode.fromBackend(dataset.data, data => DataEntry.fromBackend(data)),
		});
	}
}

export class Database implements Cloneable<Database> {
	public readonly datasets: Container<Container<Dataset>[]> = $state(assignedLater());
	public readonly id = $state(assignedLater());

	private static databaseID = 0;

	public constructor(...datasets: Dataset[]) {
		this.datasets = new Container(datasets.map(dataset => new Container(dataset)));
		this.id = Database.databaseID++;
	}

	public clone(): Database {
		return new Database(...this.datasets.clone().map(dataset => dataset.clone()));
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

	public relations(): { from: number; to: number; type: string }[] {
		let edges = [];
		for (let dataset of this.datasets.ref()) {
			let ref = dataset.ref() as Dataset;

			let fieldNames = [];
			for (let field of ref.fields.ref()) {
				if (field.type === "Entry") {
					fieldNames.push(field.name);
				}
			}

			for (let entry of ref.data.ref().dfsLeaves()) {
				for (let fieldName of fieldNames) {
					let targets = entry.get<PrimitiveArrayAttribute<number>>(fieldName).values;
					for (let id of targets) {
						edges.push({ from: entry.id, to: id, type: fieldName });
					}
				}
			}
		}

		return edges;
	}

	public asTree(): TreeNode<DataEntry> {
		return DataEntry.node(
			"Root",
			this.datasets.ref().map(dataset => (dataset.ref() as Dataset).data.ref()),
		);
	}
}

export type BackendDatabase = BackendDataset[];

export type BackendDataset = {
	name: string;
	iconName: IconName;
	data: BackendTreeNode<BackendDataEntry>;
	fields: BackendAttribute[];
	description: string;
};
