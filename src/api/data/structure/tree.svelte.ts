import { max } from "../../math/arrays.svelte";
import { Point2D } from "../../math/matrix.svelte";
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
	private isGroup_: boolean = $state(assignedLater());

	private size_ = $state(assignedLater<Point2D>());
	private center_ = $state(assignedLater<Point2D>());

	public data: T = $state(assignedLater());
	private static readonly padding = 50;

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children_ = children;
		this.ref_children.forEach(child => (child.parent = this));
		this.isGroup_ = isGroup;
	}

	public findChildOrThis(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		if (predicate(this)) return this;
		return this.ref_children.find(child => child.findChildOrThis(predicate)) ?? null;
	}

	public find(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		return this.root().findChildOrThis(predicate);
	}

	public index(): number | null {
		if (!this.parent) return null;
		return this.parent.children_.indexOf(this);
	}

	private generateSizes(): void {
		const leafSize = 100;

		if (this.isLeaf) {
			this.size_ = new Point2D(leafSize, leafSize);
			return;
		}

		this.ref_children.forEach(child => child.generateSizes());
		let maxChildHeight = max(...this.ref_children.map(child => child.size_.y));
		this.size_ = Point2D.sum(...this.ref_children.map(child => new Point2D(child.size_.x, 0))).plus([
			TreeNode.padding * (this.ref_children.length + 1),
			maxChildHeight + 2 * TreeNode.padding,
		]);
	}

	private generatePositions(): void {
		if (!this.size_) this.root().generateSizes();

		let point;

		// root
		if (!this.parent) {
			point = new Point2D(0, 0);
		}

		// first child
		else if (this.index() === 0) {
			point = this.parent.center_.minus([this.parent.size.x / 2, 0]).plus([TreeNode.padding + this.size_.x / 2, 0]);
		}

		// nth child
		else {
			let previous = this.parent.ref_children[this.index()! - 1];
			point = previous.center_.plus([previous.size_.x / 2, 0]).plus([TreeNode.padding + this.size_.x / 2, 0]);
		}

		this.center_ = point;
		this.ref_children.forEach(child => child.generatePositions());
	}

	public get center() {
		if (!this.center_) this.root().generatePositions();
		return this.center_;
	}

	public get position(): Point2D {
		return this.center.minus(this.size.dividedBy(2));
	}

	public get size() {
		if (!this.size_) this.root().generateSizes();
		return this.size_;
	}

	public root() {
		let root: TreeNode<T> = this;
		while (root.parent) root = root.parent;
		return root;
	}

	public get isRoot() {
		return !this.parent;
	}

	public get height(): number {
		return 1 + this.ref_children.map(child => child.height).reduce((max, height) => Math.max(max, height), 0);
	}

	public map<Output extends Cloneable<Output> & Serialize<any>>(mapper: (node: TreeNode<T>) => Output): TreeNode<Output> {
		const tree = new TreeNode(mapper(this), []);
		this.ref_children.forEach(child => tree.addChild(child.map(mapper)));
		return tree;
	}

	public clone(): TreeNode<T> {
		return new TreeNode(
			this.data.clone(),
			this.ref_children.map(child => child.clone()),
			this.isGroup_,
		);
	}

	public dfs(): TreeNode<T>[] {
		let visited: TreeNode<T>[] = [];
		visited.push(this);
		this.ref_children.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(): T[] {
		let visited: T[] = [];
		if (!this.isGroup) visited.push(this.data);
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

	public filter(predicate: (data: T) => boolean): void {
		this.children_ = this.ref_children.filter(child => predicate(child.data));
	}

	public get isGroup() {
		return this.isGroup_;
	}

	public get isLeaf() {
		return this.ref_children.length === 0;
	}

	public get isBranch() {
		return !this.isLeaf;
	}

	public get isItem() {
		return !this.isGroup;
	}

	public get ref_children(): TreeNode<T>[] {
		return this.children_;
	}

	public toBackend(): BackendTreeNode<Bytes> {
		return {
			data: this.data.toBackend(),
			children: this.ref_children.map(child => child.toBackend()),
			isBranch: this.isGroup,
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
