import { Point2D, type Point2DLike } from "../../math/matrix.svelte";
import { assignedLater } from "../../util/utils.svelte";

type GraphEdge<T> = { from: GraphNode<T>; to: GraphNode<T> };

export class GraphNode<T> {
	public readonly targetNodes: readonly GraphNode<T>[] = $state(assignedLater());
	private readonly sourceNodes: readonly GraphNode<T>[] = $state(assignedLater());
	public data: T = $state(assignedLater());
	public position: Point2D = $state(Point2D.origin());

	private constructor(targetNodes: GraphNode<T>[], sourceNodes: GraphNode<T>[], data: T) {
		this.targetNodes = targetNodes;
		this.sourceNodes = sourceNodes;
		this.data = data;
	}

	public static create<T>(data: T, ...targetNodes: GraphNode<T>[]): GraphNode<T> {
		return new GraphNode(targetNodes, [], data);
	}

	public withPosition(position: Point2DLike): GraphNode<T> {
		this.position = new Point2D(position);
		return this;
	}

	public static linear<T>(...nodes: T[]): GraphNode<T> {
		let currentNode = GraphNode.create(nodes[0]);
		let firstNode = currentNode;
		nodes.forEach(node => {
			const newNode = GraphNode.create(node);
			(newNode.sourceNodes as any).push(currentNode);
			(currentNode.targetNodes as any).push(newNode);
			currentNode = newNode;
		});
		return firstNode;
	}

	public dfs(): GraphNode<T>[] {
		const stack: GraphNode<T>[] = [this];
		const visited: GraphNode<T>[] = [];

		while (stack.length > 0) {
			const node = stack.pop()!;

			if (visited.includes(node)) continue;
			visited.push(node);

			for (const neighbor of node.targetNodes) {
				stack.push(neighbor);
			}
		}

		return visited;
	}

	public edges(): GraphEdge<T>[] {
		let nodes = this.dfs();
		let edges = nodes.map(node => node.targetNodes.map(target => ({ from: node, to: target }))).flat();
		return edges;
	}

	public bfs(): T[] {
		const queue: GraphNode<T>[] = [this];
		const visited: GraphNode<T>[] = [];

		while (queue.length > 0) {
			const node = queue.shift()!;
			visited.push(node);

			for (const neighbor of node.targetNodes) {
				if (!visited.includes(neighbor)) {
					visited.push(neighbor);
					queue.push(neighbor);
				}
			}
		}

		return visited.map(node => node.data);
	}
}
