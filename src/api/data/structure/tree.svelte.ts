import Point from "../../../components/Point.svelte";
import { Matrix3x3, Point2D, type Point2DLike } from "../../math/matrix.svelte";
import { getPrettyPacking } from "../../math/shape.svelte";
import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";

type CircleOutline = { kind: "circle"; radius: number; center: Point2D };
type RectangleOutline = { kind: "rectangle"; width: number; height: number; center: Point2D };
type GroupOutline = CircleOutline | RectangleOutline;
import { packSiblings, packEnclose, type PackCircle } from "d3-hierarchy";

export type BackendTreeNode<Bytes> = {
	children: BackendTreeNode<Bytes>[];
	isBranch: boolean;
	data: Bytes;
};

interface PackedChild<T extends Cloneable<T> & Serialize<any>> extends PackCircle {
	childRef: TreeNode<T>;
}

export class TreeNode<T extends Cloneable<T> & Serialize<Bytes>, Bytes = any>
	implements Cloneable<TreeNode<T, Bytes>>, Serialize<BackendTreeNode<Bytes>>
{
	private parent?: TreeNode<T, Bytes> = $state(assignedLater());
	private children_: TreeNode<T>[] = $state(assignedLater());
	private isGroup_: boolean = $state(assignedLater());

	public data: T = $state(assignedLater());

	private outline_: { radius: number; center: Point2D } = $state(assignedLater<{ radius: number; center: Point2D }>());

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children_ = children;
		this.children.forEach(child => (child.parent = this));
		this.isGroup_ = isGroup;
	}

	public findChildOrThis(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		if (predicate(this)) return this;
		return this.children.find(child => child.findChildOrThis(predicate)) ?? null;
	}

	public find(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		return this.root().findChildOrThis(predicate);
	}

	public get siblingCountIncludingMe() {
		return this.parent?.children_.length ?? 1;
	}

	public get index(): number | null {
		if (!this.parent) return null;
		return this.parent.children_.indexOf(this);
	}

	private calculateIntrinsicSize(): number {
		this.children.forEach(child => child.calculateIntrinsicSize());

		if (this.isItem) {
			this.outline_ = { radius: 15, center: Point2D.origin() };
		} else if (this.hasOnlyItems) {
			this.outline_ = { radius: this.children.length * 75 + 150, center: Point2D.origin() };
		} else if (this.hasOnlyChild) {
			this.outline_ = { radius: this.children[0].outline_.radius + 20, center: Point2D.origin() };
		} else {
			const maxChildRadius = Math.max(...this.children.map(c => c.outline_.radius));
			const { parentRadius } = getPrettyPacking(this.children.length, maxChildRadius);
			this.outline_ = { radius: parentRadius, center: Point2D.origin() };
		}
		return this.outline_.radius;
	}

	private applyLayout(targetRadius: number, parentCenter: Point2D) {
		const scaleFactor = targetRadius / this.outline_.radius;
		this.outline_.radius = targetRadius;

		if (!this.parent) {
			this.outline_.center = Point2D.origin();
		} else if (this.isPartOfItemHedge) {
			const dist = this.parent.outline_.radius * 0.6;
			const angle = (this.index! * (2 * Math.PI)) / this.siblingCountIncludingMe;
			this.outline_.center = Point2D.polar(dist, angle).plus(parentCenter);
		} else if (this.isOnlyChild) {
			this.outline_.center = parentCenter;
		} else {
			const siblingMax = Math.max(...this.siblingsIncludingMe.map(s => s.outline_.radius));
			const { circles } = getPrettyPacking(this.siblingCountIncludingMe, siblingMax);
			this.outline_.center = parentCenter.plus(circles[this.index!]);
		}

		const maxChildRadius = this.children.length > 0 ? Math.max(...this.children.map(c => c.outline_.radius)) * scaleFactor : 0;

		this.children.forEach(child => {
			child.applyLayout(maxChildRadius, this.outline_.center);
		});
	}

	public get hasOnlyLeaves() {
		return this.children.every(child => child.isLeaf);
	}

	public get hasOnlyItems() {
		return this.children.every(child => child.isItem);
	}

	public get hasOnlyGroups() {
		return this.children.every(child => child.isGroup);
	}

	public get isPartOfItemHedge() {
		return this.siblingsIncludingMe.every(sibling => sibling.isItem);
	}

	public get isOnlyChild() {
		return this.siblingCountIncludingMe === 1;
	}

	public get hasChildren() {
		return this.children.length > 0;
	}

	public get hasOnlyChild() {
		return this.children.length === 1;
	}

	public get siblingsIncludingMe() {
		return this.parent?.children ?? [this];
	}

	public get previousSibling(): TreeNode<T> | null {
		return this.parent && this.index! > 0 ? this.parent?.children[this.index! - 1] : null;
	}

	private ensureLayout(): void {
		if (this.outline_) return;
		const root = this.root();
		const rootRadius = root.calculateIntrinsicSize();
		root.applyLayout(rootRadius, Point2D.origin());
	}

	public get outline() {
		this.ensureLayout();
		return this.outline_;
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
		return 1 + this.children.map(child => child.height).reduce((max, height) => Math.max(max, height), 0);
	}

	public map<Output extends Cloneable<Output> & Serialize<any>>(mapper: (node: TreeNode<T>) => Output): TreeNode<Output> {
		const tree = new TreeNode(mapper(this), []);
		this.children.forEach(child => tree.addChild(child.map(mapper)));
		return tree;
	}

	public clone(): TreeNode<T> {
		return new TreeNode(
			this.data.clone(),
			this.children.map(child => child.clone()),
			this.isGroup_,
		);
	}

	public dfs(): TreeNode<T>[] {
		let visited: TreeNode<T>[] = [];
		visited.push(this);
		this.children.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(): T[] {
		let visited: T[] = [];
		if (!this.isGroup) visited.push(this.data);
		this.children.forEach(child => {
			let childLeaves = child.dfsLeaves();
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public addChild(node: TreeNode<T>): void {
		this.children.push(node);
		node.parent = this;
	}

	public filter(predicate: (data: T) => boolean): void {
		this.children_ = this.children.filter(child => predicate(child.data));
	}

	public get isGroup() {
		return this.isGroup_;
	}

	public get isLeaf() {
		return this.children.length === 0;
	}

	public get isBranch() {
		return !this.isLeaf;
	}

	public get isItem() {
		return !this.isGroup;
	}

	public get children(): TreeNode<T>[] {
		return this.children_;
	}

	public toBackend(): BackendTreeNode<Bytes> {
		return {
			data: this.data.toBackend(),
			children: this.children.map(child => child.toBackend()),
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
