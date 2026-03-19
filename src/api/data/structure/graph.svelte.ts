import { assignedLater } from "../../util/utils.svelte";

export class GraphNode<T> {
	public readonly olderSiblings: readonly GraphNode<T>[] = $state(assignedLater());
	private readonly youngerSiblings: readonly GraphNode<T>[] = $state(assignedLater());
	public data: T = $state(assignedLater());

	private constructor(olderSiblings: GraphNode<T>[], youngerSiblings: GraphNode<T>[], data: T) {
		this.olderSiblings = olderSiblings;
		this.youngerSiblings = youngerSiblings;
		this.data = data;
	}

	public static create<T>(data: T): GraphNode<T> {
		return new GraphNode([], [], data);
	}

	public static linear<T>(...nodes: T[]): GraphNode<T> {
		let currentNode = GraphNode.create(nodes[0]);
		let firstNode = currentNode;
		nodes.forEach(node => {
			const newNode = GraphNode.create(node);
			(newNode.youngerSiblings as any).push(currentNode);
			(currentNode.olderSiblings as any).push(newNode);
			currentNode = newNode;
		});
		return firstNode;
	}

	public dfs(): T[] {
		const stack: GraphNode<T>[] = [this];
		const visited: GraphNode<T>[] = [];

		while (stack.length > 0) {
			const node = stack.pop()!;

			if (visited.includes(node)) continue;
			visited.push(node);

			for (const neighbor of node.olderSiblings) {
				stack.push(neighbor);
			}
		}

		return visited.map(node => node.data);
	}

	public bfs(): T[] {
		const queue: GraphNode<T>[] = [this];
		const visited: GraphNode<T>[] = [];

		while (queue.length > 0) {
			const node = queue.shift()!;
			visited.push(node);

			for (const neighbor of node.olderSiblings) {
				if (!visited.includes(neighbor)) {
					visited.push(neighbor);
					queue.push(neighbor);
				}
			}
		}

		return visited.map(node => node.data);
	}
}
