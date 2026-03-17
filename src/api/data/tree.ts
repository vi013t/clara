export class TreeNode<T> {
	parent?: TreeNode<T>;
	children: TreeNode<T>[];
	data: T;
	isGroup: boolean;

	public constructor(data: T, children: TreeNode<T>[], isGroup?: boolean) {
		if (isGroup === undefined) isGroup = children.length !== 0;
		this.data = data;
		this.children = children;
		this.children.forEach(child => (child.parent = this));
		this.isGroup = isGroup;
	}

	public dfs(): T[] {
		let visited: T[] = [];
		visited.push(this.data);
		this.children.forEach(child => {
			visited = [...visited, ...child.dfs()];
		});
		return visited;
	}

	public dfsLeaves(visited: T[] = []): T[] {
		if (!this.isGroup) visited.push(this.data);
		this.children.forEach(child => {
			visited = [...visited, ...child.dfsLeaves(visited)];
		});
		return visited;
	}
}
