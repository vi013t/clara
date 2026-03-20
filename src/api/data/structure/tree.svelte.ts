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

	private diameter = $state(assignedLater<number>());
	private center_ = $state(assignedLater<Point2D>());

	public data: T = $state(assignedLater());
	private static readonly padding = 50;

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children_ = children;
		this.refChildren.forEach(child => (child.parent = this));
		this.isGroup_ = isGroup;
	}

	public findChildOrThis(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		if (predicate(this)) return this;
		return this.refChildren.find(child => child.findChildOrThis(predicate)) ?? null;
	}

	public find(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		return this.root().findChildOrThis(predicate);
	}

	public get siblingCountIncludingMe() {
		return this.parent?.children_.length ?? 1;
	}

	public index(): number | null {
		if (!this.parent) return null;
		return this.parent.children_.indexOf(this);
	}

	private calculateSize(): void {
		this.refChildren.forEach(child => child.calculateSize());

		if (this.isLeaf) {
			this.diameter = 0;
			return;
		}

		if (this.hasOnlyLeaves) {
			this.diameter = this.refChildren.length * 100 + 500;
			return;
		}

		if (this.refChildren.length === 1) {
			this.diameter = this.refChildren[0].diameter + TreeNode.padding;
			return;
		}

		if (this.refChildren.length === 2) {
			let littleD = max(...this.refChildren.map(child => child.diameter));
			this.diameter = littleD * 2;
			return;
		}

		let littleR = max(...this.refChildren.map(child => child.diameter / 2));
		let bigR = littleR * (1 + 1 / Math.sin(Math.PI / this.refChildren.length));

		this.diameter = bigR * 2;
	}

	private calculateCenter(): void {
		if (!this.diameter) this.root().calculateSize();

		if (!this.parent) {
			this.center_ = Point2D.origin();
			this.refChildren.forEach(child => child.calculateCenter());
			return;
		}

		if (this.hasNoSiblings) {
			this.center_ = this.parent.center_;
			this.refChildren.forEach(child => child.calculateCenter());
			return;
		}

		if (this.isPartOfHedge) {
			let radius = this.parent.diameter / 4;
			let angle = (this.index()! * (2 * Math.PI)) / this.siblingCountIncludingMe;
			this.center_ = Point2D.polar(radius, angle).plus(this.parent.center_);
			this.refChildren.forEach(child => child.calculateCenter());
			return;
		}

		if (this.siblingCountIncludingMe === 2) {
			let bigR = this.parent.diameter / 2;
			let littleR = this.parent.diameter / 4;
			let radius = bigR - littleR;
			let angle = (this.index()! * (2 * Math.PI)) / this.siblingCountIncludingMe;
			this.center_ = Point2D.polar(radius, angle).plus(this.parent.center_);
			this.refChildren.forEach(child => child.calculateCenter());
			return;
		}

		let bigR = this.parent.diameter / 2;
		let littleR =
			(bigR * Math.sin(Math.PI / this.siblingCountIncludingMe)) / (1 + Math.sin(Math.PI / this.siblingCountIncludingMe));
		let radius = bigR - littleR;
		let angle = (this.index()! * (2 * Math.PI)) / this.siblingCountIncludingMe;
		this.center_ = Point2D.polar(radius, angle).plus(this.parent.center_);

		this.refChildren.forEach(child => child.calculateCenter());
	}

	public get hasOnlyLeaves() {
		return this.refChildren.every(child => child.isLeaf);
	}

	public get isPartOfHedge() {
		return this.siblingsIncludingMe.every(sibling => sibling.isLeaf);
	}

	public get siblingsIncludingMe() {
		return this.parent?.refChildren ?? [this];
	}

	public get center() {
		if (!this.center_) this.root().calculateCenter();
		return this.center_;
	}

	public get hasNoSiblings() {
		return !this.parent || this.siblingsIncludingMe.length === 1;
	}

	public get size() {
		if (!this.diameter) this.root().calculateSize();
		return this.diameter;
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
		return 1 + this.refChildren.map(child => child.height).reduce((max, height) => Math.max(max, height), 0);
	}

	public map<Output extends Cloneable<Output> & Serialize<any>>(mapper: (node: TreeNode<T>) => Output): TreeNode<Output> {
		const tree = new TreeNode(mapper(this), []);
		this.refChildren.forEach(child => tree.addChild(child.map(mapper)));
		return tree;
	}

	public clone(): TreeNode<T> {
		return new TreeNode(
			this.data.clone(),
			this.refChildren.map(child => child.clone()),
			this.isGroup_,
		);
	}

	public dfs(): TreeNode<T>[] {
		let visited: TreeNode<T>[] = [];
		visited.push(this);
		this.refChildren.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(): T[] {
		let visited: T[] = [];
		if (!this.isGroup) visited.push(this.data);
		this.refChildren.forEach(child => {
			let childLeaves = child.dfsLeaves();
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public addChild(node: TreeNode<T>): void {
		this.refChildren.push(node);
		node.parent = this;
	}

	public filter(predicate: (data: T) => boolean): void {
		this.children_ = this.refChildren.filter(child => predicate(child.data));
	}

	public get isGroup() {
		return this.isGroup_;
	}

	public get isLeaf() {
		return this.refChildren.length === 0;
	}

	public get isBranch() {
		return !this.isLeaf;
	}

	public get isItem() {
		return !this.isGroup;
	}

	public get refChildren(): TreeNode<T>[] {
		return this.children_;
	}

	public toBackend(): BackendTreeNode<Bytes> {
		return {
			data: this.data.toBackend(),
			children: this.refChildren.map(child => child.toBackend()),
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
