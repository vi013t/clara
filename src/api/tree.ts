import GraphIcon from "../components/icons/GraphIcon.svelte";
import SpreadsheetIcon from "../components/icons/SpreadsheetIcon.svelte";
import TreeIcon from "../components/icons/TreeIcon.svelte";
import type { Icon } from "./components";

export type TreeNode<T> = {
	parent?: TreeNode<T>;
	children: TreeNode<T>[];
	data: T;
};

export type Value = number | string;
export type ValueType = "number" | "text";
export type Field = { name: string; ValueType: ValueType };
export type DataRow = { [key: string]: Value };

export type Dataset = {
	name: string;
	icon: Icon;
	data: TreeNode<DataRow>;
	fields: Field[];
};

export function treeNode<TreeNodeData>(
	parent: TreeNodeData,
	...children: TreeNode<TreeNodeData>[]
): TreeNode<TreeNodeData> {
	let parentNode: TreeNode<TreeNodeData> = {
		children: [],
		data: parent,
	};

	children.forEach((child) => {
		child.parent = parentNode;
		parentNode.children.push(child);
	});

	return parentNode;
}

export const views = {
	hierarchy: {
		icon: TreeIcon
	},
	graph: {
		icon: GraphIcon
	},
	spreadsheet: {
		icon: SpreadsheetIcon
	}
} as const;

export type View = keyof typeof views;

export function bfsTree<Data>(start: TreeNode<Data>, visited: Data[] = []): Data[] {
	visited.push(start.data);
	start.children.forEach(child => {
		visited = [...visited, ...bfsTree(child)];
	});
	return visited;
}