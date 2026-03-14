export type Node = {
    olderSiblings: Node[];
    youngerSiblings: Node[];
    text: string;
    color: string;
    position: [number, number]
}

export function node(rootText: string, position: [number, number] = [0, 0]): Node {
    return {
        olderSiblings: [],
        youngerSiblings: [],
        text: rootText,
        color: "#b4befe",
        position
    }
}

export function linearGraph(...nodes: { text: string, position: [number, number]}[]): Node {
    let currentNode: Node = node(nodes[0].text, nodes[0].position);
    let firstNode = currentNode;
    nodes.forEach(nodeData => {
        const newNode = node(nodeData.text, nodeData.position);
        newNode.youngerSiblings.push(currentNode);
        currentNode.olderSiblings.push(newNode);
        currentNode = newNode;
    });
    return firstNode;
}

export function dfs(start: Node, visit: (node: Node) => void) {
    const stack: Node[] = [start];
    const visited = new Set<Node>();

    while (stack.length > 0) {
        const node = stack.pop()!;

        if (visited.has(node)) continue;

        visited.add(node);
        visit(node);

        for (const neighbor of node.olderSiblings) {
            stack.push(neighbor);
        }
    }
}

export function bfs(start: Node, visit: (node: Node) => void) {
    const queue: Node[] = [start];
    const visited = new Set<Node>();

    visited.add(start);

    while (queue.length > 0) {
        const node = queue.shift()!;
        visit(node);

        for (const neighbor of node.olderSiblings) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}