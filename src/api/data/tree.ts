export class TreeNode<T> {
	private parent?: TreeNode<T>;
	private children_: TreeNode<T>[];
	private isBranch_: boolean;

	data: T;

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children_ = children;
		this.children.forEach(child => (child.parent = this));
		this.isBranch_ = isGroup;
	}

	public dfs(): T[] {
		let visited: T[] = [];
		visited.push(this.data);
		this.children.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(): T[] {
		let visited: T[] = [];
		if (!this.isBranch) visited.push(this.data);
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

	public find(predicate: (data: T) => boolean): T | null {
		if (predicate(this.data)) return this.data;
		for (let child of this.children) {
			let found = child.find(predicate);
			if (found) return found;
		}

		return null;
	}

	public filter(predicate: (data: T) => boolean): void {
		this.children_ = this.children.filter(child => predicate(child.data));
	}

	public get isBranch() {
		return this.isBranch_;
	}

	public get children() {
		return this.children_;
	}
}
