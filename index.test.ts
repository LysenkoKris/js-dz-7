import { describe, expect, test } from "bun:test";
import { TreeNode } from "./src/tree.ts";
import { bfs, dfsInorder, dfsPostorder, dfsPreorder } from "./src/traversal.ts";

function sampleTree(): TreeNode<string> {
  return new TreeNode("A", [
    new TreeNode("B", [new TreeNode("E"), new TreeNode("F")]),
    new TreeNode("C"),
    new TreeNode("D", [new TreeNode("G")]),
  ]);
}

describe("обходы дерева", () => {
  test("пустое дерево", () => {
    expect(bfs(null)).toEqual([]);
    expect(dfsInorder(null)).toEqual([]);
    expect(dfsPreorder(null)).toEqual([]);
    expect(dfsPostorder(null)).toEqual([]);
  });

  test("один узел", () => {
    const tree = new TreeNode(42);
    expect(bfs(tree)).toEqual([42]);
    expect(dfsInorder(tree)).toEqual([42]);
    expect(dfsPreorder(tree)).toEqual([42]);
    expect(dfsPostorder(tree)).toEqual([42]);
  });

  test("BFS идёт по уровням", () => {
    expect(bfs(sampleTree())).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
  });

  test("DFS Preorder: узел до детей", () => {
    expect(dfsPreorder(sampleTree())).toEqual(["A", "B", "E", "F", "C", "D", "G"]);
  });

  test("DFS Postorder: узел после детей", () => {
    expect(dfsPostorder(sampleTree())).toEqual(["E", "F", "B", "C", "G", "D", "A"]);
  });

  test("DFS Inorder: первый ребёнок, узел, остальные дети", () => {
    expect(dfsInorder(sampleTree())).toEqual(["E", "B", "F", "A", "C", "G", "D"]);
  });

  test("inorder обрабатывает больше двух детей", () => {
    const tree = new TreeNode("root", [new TreeNode("a"), new TreeNode("b"), new TreeNode("c"), new TreeNode("d")]);
    expect(dfsInorder(tree)).toEqual(["a", "root", "b", "c", "d"]);
  });

  test("глубокое дерево не требует рекурсии", () => {
    let root = new TreeNode(0);
    let current = root;
    for (let value = 1; value <= 100_000; value++) {
      const child = new TreeNode(value);
      current.children.push(child);
      current = child;
    }

    expect(bfs(root).length).toBe(100_001);
    expect(dfsInorder(root).length).toBe(100_001);
    expect(dfsPreorder(root).length).toBe(100_001);
    expect(dfsPostorder(root).length).toBe(100_001);
  });
});
