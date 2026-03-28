import { assignedLater } from "../util/index.svelte";
import { Point2D, type Point2DLike } from "../math/matrix.svelte";
import { Circle } from "../math/shape.svelte";
import { Color } from "./attribute/color.svelte";
import { GraphOutline } from "./database.svelte";

let nextID = 0; // TODO: ensure this doesnt get fricked when deserializing

export abstract class TreeNode<Branch extends TreeBranch<Branch, Leaf>, Leaf extends TreeLeaf<Branch, Leaf>> {
	private static paddingMultiplier = 1.1;

	private parent_?: Branch = $state(assignedLater());
	private outline_ = $state(assignedLater<GraphOutline<Circle>>());

	/**
	 * A unique numeric ID for this tree node. Some notes on this:
	 *
	 * - Every tree node has a unique ID, **except tree nodes from differen't trees**. Tree nodes from
	 * different trees **may or may not** have the same ID.
	 * - IDs tell you nothing about the structure or data of the node&mdash;the node with ID
	 * 0 is not necessarily the root, for example, and a node with ID 1 is not necessarily its child
	 * - IDs are not reused when nodes are deleted in the current implementation. The ID of a deleted
	 * node remains a null pointer forever.
	 * - No IDs are guaranteed to exist&mdash;Just because you have a reference to a node of ID 12 doesn't
	 * mean there exists one with ID 11.
	 */
	public readonly id: number;

	protected constructor() {
		this.id = nextID++;
	}

	public get parent() {
		return this.parent_;
	}

	public get siblingCountIncludingMe() {
		return this.parent?.children.length ?? 1;
	}

	public get index(): number | null {
		if (!this.parent) return null;
		return this.parent.children.indexOf(this.self);
	}

	private calculateIntrinsicSize(): number {
		this.children.forEach(child => child.calculateIntrinsicSize());

		if (this.isLeaf()) {
			this.outline_ = GraphOutline.originCircle(15);
		} else if (this.isntGrandparent) {
			this.outline_ = GraphOutline.originCircle(this.children.length * 75 + 150);
		} else if (this.hasOnlyChild) {
			this.outline_ = GraphOutline.originCircle(this.children[0].outline_.shape.radius * TreeNode.paddingMultiplier);
		} else {
			let maxChildRadius = Math.max(...this.children.map(c => c.outline_.shape.radius));
			maxChildRadius *= TreeNode.paddingMultiplier;
			const { parentRadius } = Circle.prettyPack(this.children.length, maxChildRadius);
			this.outline_ = GraphOutline.originCircle(parentRadius);
		}
		return this.outline_.shape.radius;
	}

	private applyLayout(targetRadius: number, parentCenter: Point2D) {
		const scaleFactor = targetRadius / this.outline_.shape.radius;
		this.outline_.shape.radius = targetRadius;

		if (!this.parent) {
			this.outline_.shape.center = Point2D.origin();
		} else if (this.hasNoChildrenOrNiblings) {
			const dist = this.parent.outline_.shape.radius * 0.6;
			const angle = (this.index! * (2 * Math.PI)) / this.siblingCountIncludingMe;
			this.outline_.shape.center = Point2D.polar(dist, angle).plus(parentCenter);
		} else if (this.isOnlyChild) {
			this.outline_.shape.center = parentCenter;
		} else {
			let siblingMax = Math.max(...this.siblingsIncludingMe.map(s => s.outline_.shape.radius));
			const { circles } = Circle.prettyPack(this.siblingCountIncludingMe, siblingMax);
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

	public resetColors() {
		if (!this.parent) this.outline_.color = Color.hex("var(--background-dark)");
		else this.outline_.color = this.parent.outline_.color.darken(2);
		this.children.forEach(child => (child as unknown as TreeNode<Branch, Leaf>).resetColors());
	}

	/**
	 * Makes all nodes visible, assembling them all together again.
	 */
	public thanksgivingDinner() {
		this.root()
			.dfs()
			.forEach(node => (node.outline.isVisible = true));
	}

	/**
	 * Hides all nodes that arent this node and its decendents.
	 */
	public emancipate() {
		this.root()
			.dfs()
			.filter(node => node !== this.self && !node.isDescendantOf(this.self))
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

	public get hasOnlyLeaves(): boolean {
		return this.children.every(child => child.isLeaf);
	}

	public get isntGrandparent(): boolean {
		return this.children.every(child => child.isLeaf());
	}

	public get hasNoGrandchildren(): boolean {
		return this.children.every(child => child.isBranch());
	}

	public get hasNoChildrenOrNiblings(): boolean {
		return this.siblingsIncludingMe.every(sibling => sibling.isLeaf());
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

	public get siblingsIncludingMe(): readonly (Branch | Leaf)[] {
		return this.parent?.children ?? [this.self];
	}

	public get previousSibling(): Branch | Leaf | null {
		return this.parent && this.index! > 0 ? this.parent?.children[this.index! - 1] : null;
	}

	private generateOutline(): void {
		if (this.outline_) return;
		this.root().resetLayout();
		this.root().resetColors();
	}

	public get outline(): GraphOutline<Circle> {
		this.generateOutline();
		return this.outline_;
	}

	public root(): Branch | Leaf {
		let root: Branch | Leaf = this.self;
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

	public get cousins(): (Branch | Leaf)[] {
		return this.root()
			.dfs()
			.filter(node => node !== this.self && !node.isDescendantOf(this.self) && !this.isDescendantOf(node));
	}

	public isDescendantOf(other: Branch | Leaf): boolean {
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

	public abstract isLeaf(): this is Leaf;
	public abstract isBranch(): this is Branch;

	public dfs(): (Branch | Leaf)[] {
		let visited: (Branch | Leaf)[] = [];
		visited.push(this.self);
		this.children.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(): Leaf[] {
		let visited: Leaf[] = [];
		if (this.isLeaf()) visited.push(this);
		this.children.forEach(child => {
			let childLeaves = child.isBranch() ? child.dfsLeaves() : [child];
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public dfsBranches(): Branch[] {
		let visited: Branch[] = [];
		if (this.isBranch()) visited.push(this);
		this.children.forEach(child => {
			let childLeaves = child.isBranch() ? child.dfsBranches() : [];
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public dfsYoungParents(): Branch[] {
		let visited: Branch[] = [];
		if (this.isBranch() && this.children[0].isLeaf()) visited.push(this);
		this.children.forEach(child => {
			let childLeaves = child.isBranch() ? child.dfsYoungParents() : [];
			visited = [...visited, ...childLeaves];
		});
		return visited;
	}

	public get branchChildren(): Branch[] {
		return this.children.filter(child => child.isBranch());
	}

	public get leafChildren(): Leaf[] {
		return this.children.filter(child => child.isLeaf());
	}

	public get sortedChildren(): (Branch | Leaf)[] {
		return [...this.branchChildren, ...this.leafChildren];
	}

	public delete() {
		if (!this.parent) throw new Error("Attempted to delete tree root");
		this.parent.deleteChild(this.self);
	}

	public abstract get children(): readonly (Branch | Leaf)[];
	public abstract get self(): Branch | Leaf;
}

export abstract class TreeLeaf<Branch extends TreeBranch<Branch, Leaf>, Leaf extends TreeLeaf<Branch, Leaf>> extends TreeNode<
	Branch,
	Leaf
> {
	_treeLeaf = undefined;

	public get children(): readonly (Branch | Leaf)[] {
		return [];
	}

	public get self(): Leaf {
		return this as unknown as Leaf;
	}

	public isLeaf(): this is Leaf {
		return true;
	}

	public isBranch(): this is Branch {
		return false;
	}
}

export abstract class TreeBranch<Branch extends TreeBranch<Branch, Leaf>, Leaf extends TreeLeaf<Branch, Leaf>> extends TreeNode<
	Branch,
	Leaf
> {
	public leaves: Leaf[] = $state([]);
	public branches: Branch[] = $state([]);

	protected constructor(...children: (Branch | Leaf)[]) {
		super();
		children.forEach(child => this.addChild(child));
	}

	public addChild(child: Branch | Leaf) {
		if (child.isLeaf()) this.leaves.push(child);
		else this.branches.push(child);
		(child as any).parent_ = this;
	}

	public filterChildrenInPlace(predicate: (node: Branch | Leaf) => any): void {
		this.leaves = this.leaves.filter(predicate);
		this.branches = this.branches.filter(predicate);
	}

	public get children(): readonly (Branch | Leaf)[] {
		return [...this.leaves, ...this.branches];
	}

	public get self(): Branch {
		return this as unknown as Branch;
	}

	public isLeaf(): this is Leaf {
		return false;
	}

	public isBranch(): this is Branch {
		return true;
	}

	public deleteChild(child: Branch | Leaf): void {
		this.leaves = this.leaves.filter(leaf => leaf.id !== child.id);
		this.branches = this.branches.filter(branch => branch.id !== child.id);
	}
}
