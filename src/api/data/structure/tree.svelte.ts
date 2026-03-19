import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";

export type BackendTreeNode<Bytes> = {
	children: BackendTreeNode<Bytes>[];
	isBranch: boolean;
	data: Bytes;
};

export class TreeNode<T extends Cloneable<T> & Serialize<Bytes>, Bytes = any>
	implements Cloneable<TreeNode<T, Bytes>>, Serialize<BackendTreeNode<Bytes>>
{
	private parent?: TreeNode<T, Bytes> = $state(assignedLater());
	private children_: TreeNode<T>[] = $state(assignedLater());
	private isBranch_: boolean = $state(assignedLater());

	data: T;

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children_ = children;
		this.ref_children.forEach(child => (child.parent = this));
		this.isBranch_ = isGroup;
	}

	public clone(): TreeNode<T> {
		return new TreeNode(
			this.data.clone(),
			this.ref_children.map(child => child.clone()),
			this.isBranch_,
		);
	}

	public dfs(): T[] {
		let visited: T[] = [];
		visited.push(this.data);
		this.ref_children.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(): T[] {
		let visited: T[] = [];
		if (!this.isBranch) visited.push(this.data);
		this.ref_children.forEach(child => {
			let childLeaves = child.dfsLeaves();
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public addChild(node: TreeNode<T>): void {
		this.ref_children.push(node);
		node.parent = this;
	}

	public find(predicate: (data: T) => boolean): T | null {
		if (predicate(this.data)) return this.data;
		for (let child of this.ref_children) {
			let found = child.find(predicate);
			if (found) return found;
		}

		return null;
	}

	public filter(predicate: (data: T) => boolean): void {
		this.children_ = this.ref_children.filter(child => predicate(child.data));
	}

	public get isBranch() {
		return this.isBranch_;
	}

	public get ref_children(): TreeNode<T>[] {
		return this.children_;
	}

	public toBackend(): BackendTreeNode<Bytes> {
		return {
			data: this.data.toBackend(),
			children: this.ref_children.map(child => child.toBackend()),
			isBranch: this.isBranch,
		};
	}

	public static fromBackend<T extends Serialize<Bytes> & Cloneable<T>, Bytes>(
		node: BackendTreeNode<Bytes>,
		fromBackend: (bytes: Bytes) => T,
	): TreeNode<T> {
		return new TreeNode(
			fromBackend(node.data),
			node.children.map(child => TreeNode.fromBackend(child, fromBackend)),
			node.isBranch,
		);
	}
}
