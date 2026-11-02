import { TreeNode } from "./src/tree.ts";
import { bfs, dfsInorder, dfsPostorder, dfsPreorder } from "./src/traversal.ts";

const tree = new TreeNode("A", [
  new TreeNode("B", [new TreeNode("E"), new TreeNode("F")]),
  new TreeNode("C"),
  new TreeNode("D", [new TreeNode("G")]),
]);

console.log("Дерево: A -> [B, C, D], B -> [E, F], D -> [G]");
console.log("BFS:", bfs(tree).join(" -> "));
console.log("DFS Inorder:", dfsInorder(tree).join(" -> "));
console.log("DFS Preorder:", dfsPreorder(tree).join(" -> "));
console.log("DFS Postorder:", dfsPostorder(tree).join(" -> "));
