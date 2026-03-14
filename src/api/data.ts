import type { TreeNode } from "./tree";

export interface ViewableAsTree<T> {
	toTree(): TreeNode<T>;
	fromTree(): TreeNode<T>;
}
