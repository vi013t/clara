import type { Icon } from "./components";

export type TreeNode<T> = {
    parent?: TreeNode<T>;
    children: TreeNode<T>[];
    data: T
};

export type TreeNodeData = string | { text: string; icon: Icon }

export function treeNode<TreeNodeData>(parent: TreeNodeData, ...children: TreeNode<TreeNodeData>[]): TreeNode<TreeNodeData> {
    let parentNode: TreeNode<TreeNodeData> = {
        children: [],
        data: parent
    };

    children.forEach(child => {
        child.parent = parentNode;
        parentNode.children.push(child);
    })

    return parentNode;
}