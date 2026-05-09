import { cloneRecord, type Cloneable, type Serialize } from "@clara/api/utils";
import { Item } from "@clara/api/database";

export type SerializedGeneratedAttributeType = {
	name: string;
	id: number;
	generator: SerializedNodeGenerator;
	generated: true;
};

export class GeneratedAttribute implements Serialize<SerializedGeneratedAttributeType>, Cloneable<GeneratedAttribute> {
	public name;
	public generator: NodeGenerator;

	private id_;
	private static nextID = 0;

	public constructor({ name, generator, id }: { name: string; generator: NodeGenerator; id?: number }) {
		this.name = $state(name);
		this.id_ = id ?? GeneratedAttribute.nextID++;
		this.generator = $state(generator);
	}

	public fromItem(name: string, item: Item) {
		return new GeneratedAttribute({
			name,
			generator: new NodeGenerator([
				new NodeInstance({
					x: 0,
					y: 0,
					type: NodeType.fromName("Item")!,
					inputs: { item: new NodeArgument({ type: "value", value: { value: item, type: "item" } }) },
				}),
			]),
		});
	}

	public clone(): GeneratedAttribute {
		return new GeneratedAttribute({ name: this.name, generator: this.generator.clone() });
	}

	public serialize(): SerializedGeneratedAttributeType {
		return {
			name: this.name,
			id: this.id_,
			generator: this.generator.serialize(),
			generated: true,
		};
	}

	public static deserialize(attribute: SerializedGeneratedAttributeType): GeneratedAttribute {
		if (GeneratedAttribute.nextID <= attribute.id) GeneratedAttribute.nextID = attribute.id + 1;
		const definition = new GeneratedAttribute({
			name: attribute.name,
			generator: NodeGenerator.deserialize(attribute.generator),
		});
		return definition;
	}

	public get id() {
		return this.id_;
	}
}

export type SerializedNodeGenerator = {
	nodes: NodeInstance[];
};

export class NodeGenerator implements Serialize<SerializedNodeGenerator>, Cloneable<NodeGenerator> {
	nodes: NodeInstance[];

	public constructor(nodes: NodeInstance[]) {
		this.nodes = $state(nodes);
	}

	public clone(): NodeGenerator {
		return new NodeGenerator(this.nodes.map(node => node.clone()));
	}

	public static deserialize(generator: SerializedNodeGenerator): NodeGenerator {
		return new NodeGenerator(generator.nodes);
	}

	public serialize(): SerializedNodeGenerator {
		return {
			nodes: this.nodes,
		};
	}
}

export type SerializedNodeInstance = {
	type: NodeType;
	id: number;
	x: number;
	y: number;
	inputs: Record<string, NodeArgument>;
	outputs: Record<string, NodeArgument>;
};

export class NodeInstance implements Cloneable<NodeInstance>, Serialize<SerializedNodeInstance> {
	public readonly type: NodeType;
	public readonly id: number;

	public x: number;
	public y: number;
	public inputs: Record<string, NodeArgument>;
	public outputs: Record<string, NodeArgument>;

	private static nextID = 0;

	public constructor({
		x,
		y,
		type,
		inputs,
		outputs,
		id,
	}: {
		type: NodeType;
		x: number;
		y: number;
		inputs?: Record<string, NodeArgument>;
		outputs?: Record<string, NodeArgument>;
		id?: number;
	}) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.inputs = inputs ?? {};
		this.outputs = outputs ?? {};
		this.id = id ?? NodeInstance.nextID++;
	}

	public clone(): NodeInstance {
		return new NodeInstance({
			x: this.x,
			y: this.y,
			type: this.type.clone(),
			inputs: cloneRecord(this.inputs),
			outputs: cloneRecord(this.outputs),
		});
	}

	public static deserialize(node: SerializedNodeInstance): NodeInstance {
		return new NodeInstance({ x: node.x, y: node.y, type: node.type, inputs: node.inputs, outputs: node.outputs, id: node.id });
	}

	public serialize(): SerializedNodeInstance {
		return {
			x: this.x,
			y: this.y,
			type: this.type,
			inputs: this.inputs,
			outputs: this.outputs,
			id: this.id,
		};
	}
}

export type SerializedNodeArgument = {
	node: SerializedNodeNodeArgument | null;
	value: ValueArgument | null;
	type: "node" | "value";
};

export class NodeArgument implements Cloneable<NodeArgument>, Serialize<SerializedNodeArgument> {
	node: NodeNodeArgument | null;
	value: ValueArgument | null;
	type: "node" | "value";

	public constructor({ type, node, value }: { type: "node" | "value"; node?: NodeNodeArgument; value?: ValueArgument }) {
		this.type = $state(type);
		this.value = $state(value ?? null);
		this.node = $state(node ?? null);
	}

	public serialize(): SerializedNodeArgument {
		return {
			type: this.type,
			node: this.node ? { node: this.node.node.serialize(), outputName: this.node.outputName } : null,
			value: this.value ? this.value : null,
		};
	}

	public static deserialize(argument: SerializedNodeArgument): NodeArgument {
		return new NodeArgument({
			type: argument.type,
			value: argument.value ?? undefined,
			node: argument.node
				? { node: NodeInstance.deserialize(argument.node.node), outputName: argument.node.outputName }
				: undefined,
		});
	}

	public clone(): NodeArgument {
		// TODO: value cloning
		return new NodeArgument({
			type: this.type,
			value: this.value ? { value: this.value.value, type: this.value.type } : undefined,
			node: this.node ? { node: this.node.node.clone(), outputName: this.node.outputName } : undefined,
		});
	}
}

export type SerializedNodeType = {
	name: string;
	inputs: Record<string, NodeParameter>;
	outputs: Record<string, NodeParameter>;
	categories: NodeCategory[];
};

export class NodeType implements Cloneable<NodeType>, Serialize<SerializedNodeType> {
	name: string;
	inputs: Record<string, NodeParameter>;
	outputs: Record<string, NodeParameter>;
	categories: NodeCategory[];

	public constructor({
		name,
		inputs,
		outputs,
		categories,
	}: {
		name: string;
		inputs: Record<string, NodeParameter>;
		outputs: Record<string, NodeParameter>;
		categories: NodeCategory[];
	}) {
		this.name = $state(name);
		this.inputs = $state(inputs);
		this.outputs = $state(outputs);
		this.categories = $state(categories);
	}

	public static fromName(name: string): NodeType | null {
		return nodeTypes.find(type => type.name === name) ?? null;
	}

	public serialize(): SerializedNodeType {
		return {
			name: this.name,
			inputs: this.inputs,
			outputs: this.outputs,
			categories: this.categories,
		};
	}

	public static deserialize(type: SerializedNodeType): NodeType {
		return new NodeType({ name: type.name, inputs: type.inputs, outputs: type.outputs, categories: type.categories });
	}

	public clone(): NodeType {
		return new NodeType({
			name: this.name,
			inputs: cloneRecord(this.inputs),
			outputs: cloneRecord(this.outputs),
			categories: [...this.categories],
		});
	}
}

export type SerializedNodeParameter = {
	type: Type;
	subtype: Type | null;
	required: boolean;
};

export class NodeParameter implements Cloneable<NodeParameter>, Serialize<SerializedNodeParameter> {
	public type: Type;
	public subtype: Type | null;
	public required: boolean;

	public constructor({ type, subtype, required }: { type: Type; subtype?: Type; required?: true }) {
		this.required = $state(required ?? false);
		this.subtype = $state(subtype ?? null);
		this.type = $state(type);
	}

	public serialize(): SerializedNodeParameter {
		return {
			type: this.type,
			subtype: this.subtype,
			required: this.required,
		};
	}

	public static deserialize(nodeParameter: SerializedNodeParameter): NodeParameter {
		return new NodeParameter({
			type: nodeParameter.type,
			subtype: nodeParameter.subtype ?? undefined,
			required: nodeParameter.required || undefined,
		});
	}

	public clone(): NodeParameter {
		return new NodeParameter({ type: this.type, subtype: this.subtype ?? undefined, required: this.required || undefined });
	}
}

export type Type = "number" | "string" | "boolean" | "item" | "any" | "group" | "list";
export type NodeNodeArgument = { node: NodeInstance; outputName: string };
export type SerializedNodeNodeArgument = { node: SerializedNodeInstance; outputName: string };
export type ValueArgument = { value: any; type: Type };
export type NodeCategory = "value" | "operation" | "data";

export const nodeCategoryColors = {
	value: "var(--green)",
	operation: "var(--indigo)",
	data: "var(--yellow)",
};

let nodeTypes = $state([
	new NodeType({
		name: "Create Item",
		inputs: { name: new NodeParameter({ type: "string", required: true }), attributes: new NodeParameter({ type: "list" }) },
		outputs: { item: new NodeParameter({ type: "item" }) },
		categories: ["data"],
	}),
	new NodeType({
		name: "Store",
		inputs: { entry: new NodeParameter({ type: "any" }), location: new NodeParameter({ type: "group" }) },
		outputs: {},
		categories: ["data"],
	}),
	new NodeType({
		name: "Group",
		inputs: { group: new NodeParameter({ type: "group" }) },
		outputs: { group: new NodeParameter({ type: "group" }) },
		categories: ["value"],
	}),
	new NodeType({
		name: "Create Attribute",
		inputs: {
			name: new NodeParameter({ type: "string", required: true }),
			value: new NodeParameter({ type: "any", required: true }),
		},
		outputs: { attribute: new NodeParameter({ type: "any" }) },
		categories: ["data"],
	}),
	new NodeType({
		name: "Input",
		inputs: {
			name: new NodeParameter({ type: "string", required: true }),
			type: new NodeParameter({ type: "any" }),
			value: new NodeParameter({ type: "any" }),
		},
		outputs: { attribute: new NodeParameter({ type: "any" }) },
		categories: ["value"],
	}),
	new NodeType({
		name: "Concatenate",
		inputs: {
			left: new NodeParameter({ type: "string", required: true }),
			right: new NodeParameter({ type: "string", required: true }),
		},
		outputs: { result: new NodeParameter({ type: "string" }) },
		categories: ["operation"],
	}),
	new NodeType({
		name: "Text",
		inputs: { text: new NodeParameter({ type: "string" }) },
		outputs: { text: new NodeParameter({ type: "string" }) },
		categories: ["value"],
	}),
] as NodeType[]);

export function nodes() {
	return nodeTypes;
}

export const nodeTypeColors: { [Key in Type]: string } = {
	string: "var(--green)",
	number: "var(--orange)",
	boolean: "var(--purple)",
	item: "var(--purple)",
	any: "var(--indigo)",
	group: "var(--pink)",
	list: "var(--teal)",
};
