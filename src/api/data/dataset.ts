import type { Icon } from "../components";
import { getIconByName, getIconName } from "../icons.svelte";
import { TreeNode } from "./tree";

export type Value = number | string;
export type ValueType = "number" | "short text" | "long text";
export type Field = { name: string; type: ValueType };
export type DataValue<Name> = Name extends "id" ? number : Name extends "Name" ? string : Value;
type DatasetKind = "manual" | "generated";

export class DataEntry {
	private data: { id: number; Name: string } & { [key: string]: Value };
	private static nextDataID = 0;

	public constructor(name: string, values: { [key: string]: Value } = {}) {
		this.data = {
			...values,
			Name: name,
			id: DataEntry.nextDataID++,
		};
	}

	public get name(): string {
		return this.data.Name;
	}

	public get id(): number {
		return this.data.id;
	}

	public get<Name extends string>(key: Name): DataValue<Name> | null {
		return (this.data[key] as DataValue<Name> | undefined) ?? null;
	}

	public set<Name extends string>(key: Name, value: DataValue<Name>) {
		this.data[key] = value;
	}

	public remove(key: string) {
		delete this.data[key];
	}

	public static node(name: string, children: TreeNode<DataEntry>[] = [], isLeaf = false): TreeNode<DataEntry> {
		return new TreeNode(new DataEntry(name), children, !isLeaf);
	}
}

export type BackendManualDataset = {
	kind: "manual";
	name: string;
	iconName: string;
	data: TreeNode<DataEntry>;
	fields: Field[];
	description?: string;
};

export type BackendGeneratedDataset = {
	kind: "generated";
	name: string;
	iconName: string;
	description?: string;
};

export type BackendDataset<Kind extends DatasetKind = DatasetKind> = Kind extends "manual"
	? BackendManualDataset
	: BackendGeneratedDataset;

export abstract class Dataset<Kind extends DatasetKind = DatasetKind> {
	kind: Kind;
	name: string;
	icon: Icon;
	description?: string;

	protected constructor({
		kind,
		name,
		icon,
		description = undefined,
	}: {
		kind: Kind;
		name: string;
		icon: Icon;
		description?: string;
	}) {
		this.kind = kind;
		this.name = name;
		this.icon = icon;
		this.description = description;
	}

	public static create(data: {
		name: string;
		data: TreeNode<DataEntry>;
		icon: Icon;
		fields: Field[];
		description?: string;
	}): ManualDataset {
		return new ManualDataset(data);
	}

	public static generated(data: { name: string; icon: Icon; description?: string }): GeneratedDataset {
		return new GeneratedDataset(data);
	}

	public isGenerated(): this is GeneratedDataset {
		return this.kind === "generated";
	}

	public isManual(): this is ManualDataset {
		return this.kind === "manual";
	}

	public abstract toBackend(): BackendDataset<Kind>;

	public static fromBackend<Kind extends DatasetKind = DatasetKind>(dataset: BackendDataset<Kind>): Dataset<Kind> {
		if (dataset.kind === "manual") {
			return Dataset.create({
				name: dataset.name,
				icon: getIconByName(dataset.iconName)!,
				description: dataset.description,
				fields: dataset.fields,
				data: dataset.data,
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
	fields: Field[];
	data: TreeNode<DataEntry>;

	public constructor({
		name,
		icon,
		data,
		fields,
		description = undefined,
	}: {
		name: string;
		data: TreeNode<DataEntry>;
		fields: Field[];
		icon: Icon;
		description?: string;
	}) {
		super({ kind: "manual", name, icon, description });
		this.data = data;
		this.fields = fields;
	}

	public toBackend(): BackendManualDataset {
		return {
			kind: "manual",
			name: this.name,
			iconName: getIconName(this.icon),
			description: this.description,
			fields: this.fields,
			data: this.data,
		};
	}
}

export class GeneratedDataset extends Dataset<"generated"> {
	public constructor({ name, icon, description = undefined }: { name: string; icon: Icon; description?: string }) {
		super({ kind: "generated", name, icon, description });
	}

	public toBackend(): BackendGeneratedDataset {
		return {
			kind: "generated",
			name: this.name,
			iconName: getIconName(this.icon),
			description: this.description,
		};
	}
}
