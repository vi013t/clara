import { Point2D, type Point2DLike } from "../../math/matrix.svelte";
import { Circle, getPrettyPacking } from "../../math/shape.svelte";
import { Color } from "../../ui/color.svelte";
import type { Cloneable } from "../../util/Clone.svelte";
import type { Serialize } from "../../util/serialize.svelte";
import { assignedLater } from "../../util/utils.svelte";
import { GraphOutline } from "./graph.svelte";

export type BackendTreeNode<Bytes> = {
	children: BackendTreeNode<Bytes>[];
	isBranch: boolean;
	data: Bytes;
};

export class TreeNode<T extends Cloneable<T> & Serialize<Bytes>, Bytes = any>
	implements Cloneable<TreeNode<T, Bytes>>, Serialize<BackendTreeNode<Bytes>>
{
	private parent_?: TreeNode<T, Bytes> = $state(assignedLater());
	private children_: TreeNode<T>[] = $state(assignedLater());
	private isGroup_: boolean = $state(assignedLater());

	public data: T = $state(assignedLater());

	private outline_ = $state(assignedLater<GraphOutline<Circle>>());

	private static paddingMultiplier = 1.1;

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children_ = children;
		this.children.forEach(child => (child.parent_ = this));
		this.isGroup_ = isGroup;
	}

	public findChildOrThis(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		if (predicate(this)) return this;
		return this.children.find(child => child.findChildOrThis(predicate)) ?? null;
	}

	public find(predicate: (node: TreeNode<T>) => any): TreeNode<T> | null {
		return this.root().findChildOrThis(predicate);
	}

	public get parent() {
		return this.parent_;
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
			this.outline_ = GraphOutline.originCircle(15);
		} else if (this.hasOnlyItems) {
			this.outline_ = GraphOutline.originCircle(this.children.length * 75 + 150);
		} else if (this.hasOnlyChild) {
			this.outline_ = GraphOutline.originCircle(this.children[0].outline_.shape.radius * TreeNode.paddingMultiplier);
		} else {
			let maxChildRadius = Math.max(...this.children.map(c => c.outline_.shape.radius));
			maxChildRadius *= TreeNode.paddingMultiplier;
			const { parentRadius } = getPrettyPacking(this.children.length, maxChildRadius);
			this.outline_ = GraphOutline.originCircle(parentRadius);
		}
		return this.outline_.shape.radius;
	}

	private applyLayout(targetRadius: number, parentCenter: Point2D) {
		const scaleFactor = targetRadius / this.outline_.shape.radius;
		this.outline_.shape.radius = targetRadius;

		if (!this.parent) {
			this.outline_.shape.center = Point2D.origin();
		} else if (this.isPartOfItemHedge) {
			const dist = this.parent.outline_.shape.radius * 0.6;
			const angle = (this.index! * (2 * Math.PI)) / this.siblingCountIncludingMe;
			this.outline_.shape.center = Point2D.polar(dist, angle).plus(parentCenter);
		} else if (this.isOnlyChild) {
			this.outline_.shape.center = parentCenter;
		} else {
			let siblingMax = Math.max(...this.siblingsIncludingMe.map(s => s.outline_.shape.radius));
			const { circles } = getPrettyPacking(this.siblingCountIncludingMe, siblingMax);
			this.outline_.shape.center = parentCenter.plus(circles[this.index!]);
		}

		const maxChildRadius =
			this.children.length > 0 ? Math.max(...this.children.map(c => c.outline_.shape.radius)) * scaleFactor : 0;

		this.children.forEach(child => {
			child.applyLayout(maxChildRadius, this.outline_.shape.center);
		});
	}

	public resetLayout(): void {
		this.clearLayoutCache();
		const intrinsicRadius = this.calculateIntrinsicSize();
		let targetRadius = intrinsicRadius;
		let startCenter = Point2D.origin();

		if (this.parent) {
			targetRadius = Math.max(...this.siblingsIncludingMe.map(sibling => sibling.outline_.shape.radius));
			startCenter = this.parent.outline_.shape.center;
		}

		this.applyLayout(targetRadius, startCenter);
	}

	private setColors() {
		if (!this.parent) {
			this.outline_.color = Color.hex("#181825");
			this.outline_.isVisible = false;
		} else this.outline_.color = this.parent.outline_.color.darken(2);
		this.children.forEach(child => child.setColors());
	}

	/**
	 * Makes all nodes visible, assembling them all together again.
	 */
	public thanksgivingDinner() {
		this.root()
			.dfs()
			.forEach(node => (node.outline.isVisible = true));
	}

	public cutOff() {
		console.log(this.parent);
		this.root()
			.dfs()
			.filter(node => node !== this && !node.isDescendantOf(this))
			.forEach(node => (node.outline.isVisible = false));
	}

	public shift(amount: Point2DLike) {
		let difference = new Point2D(amount);
		this.outline.shape.center = this.outline.shape.center.plus(difference);
		this.children.forEach(child => child.shift(amount));
	}

	private clearLayoutCache(): void {
		this.outline_ = assignedLater();
		this.children.forEach(child => child.clearLayoutCache());
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

	private generateOutline(): void {
		if (this.outline_) return;
		this.root().resetLayout();
		this.root().setColors();
	}

	public get outline(): GraphOutline<Circle> {
		this.generateOutline();
		return this.outline_;
	}

	public root() {
		let root: TreeNode<T> = this;
		while (root.parent) root = root.parent;
		return root;
	}

	public isOverlapping(): boolean {
		return this.cousins.some(node => node.outline.shape.overlaps(this.outline.shape, this.outline.shape.radius / 100));
	}

	public isEscapingParent(): boolean {
		if (!this.parent) return false;
		return !this.parent.outline.shape.contains(this.outline.shape, this.outline.shape.radius / 100);
	}

	public wouldEscapeParentIfShifted(point: Point2DLike): boolean {
		if (!this.parent) return false;
		let newCenter = this.outline.shape.center.plus(point);
		let newShape = this.outline.shape.clone();
		newShape.center = newCenter;
		return !this.parent.outline.shape.contains(this.outline.shape, this.outline.shape.radius / 100);
	}

	public wouldOverlapIfShifted(point: Point2DLike): boolean {
		let newCenter = this.outline.shape.center.plus(point);
		let newShape = this.outline.shape.clone();
		newShape.center = newCenter;
		return this.cousins.some(node => node.outline.shape.overlaps(newShape, this.outline.shape.radius / 2));
	}

	public getCollisionConstrainedShift(desiredShift: [number, number]): [number, number] {
		let [dx, dy] = desiredShift;
		const myShape = this.outline.shape as Circle;
		const cousins = this.cousins;

		for (const node of cousins) {
			const other = node.outline.shape as Circle;
			// We use your padding logic (radius / 2)
			const minDistance = myShape.radius + other.radius - 0.1;

			const nextCenter = myShape.center.plus([dx, dy]);
			const nextDistance = nextCenter.distanceTo(other.center);

			// If this move would cause an overlap...
			if (nextDistance < minDistance) {
				// 1. Calculate the direction from the obstacle to us
				const angle = Math.atan2(nextCenter.y - other.center.y, nextCenter.x - other.center.x);

				// 2. Find the point exactly 'minDistance' away from the obstacle
				const safePointX = other.center.x + Math.cos(angle) * minDistance;
				const safePointY = other.center.y + Math.sin(angle) * minDistance;

				// 3. Update our allowed delta to stop at that safe point
				dx = safePointX - myShape.center.x;
				dy = safePointY - myShape.center.y;
			}
		}

		return [dx, dy];
	}

	public get cousins() {
		return this.root()
			.dfs()
			.filter(node => node !== this && !node.isDescendantOf(this) && !this.isDescendantOf(node));
	}

	public isDescendantOf(other: TreeNode<T>): boolean {
		if (!this.parent) return false;
		if (this.parent === other) return true;
		return this.parent.isDescendantOf(other);
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
		node.parent_ = this;
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
