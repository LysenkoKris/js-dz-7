import { TreeNode } from "./tree.ts";

// Обход в ширину (Breadth-First Search): сначала весь текущий уровень,
// затем следующий. Очередь реализована массивом и индексом начала чтения,
// поэтому уже обработанные элементы не удаляются с начала массива.
// Время: O(n), память: O(n), где n - число узлов.
export function bfs<T>(root: TreeNode<T> | null): T[] {
  if (root === null) return [];

  const result: T[] = [];
  const queue: TreeNode<T>[] = [root];

  for (let i = 0; i < queue.length; i++) {
    const node = queue[i]!;
    result.push(node.value);
    queue.push(...node.children);
  }

  return result;
}

// Прямой обход в глубину (Preorder): узел посещается до его потомков.
// Потомки добавляются в стек справа налево, чтобы первым обработать
// самого левого ребёнка, как при обычном рекурсивном обходе.
export function dfsPreorder<T>(root: TreeNode<T> | null): T[] {
  if (root === null) return [];

  const result: T[] = [];
  const stack: TreeNode<T>[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.value);

    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]!);
    }
  }

  return result;
}

// Обратный обход в глубину (Postorder): сначала посещаются все потомки,
// затем сам узел. Флаг visited заменяет возврат из рекурсивного вызова:
// при первом попадании узел возвращается в стек, а при втором добавляется
// в результат после обработки детей.
export function dfsPostorder<T>(root: TreeNode<T> | null): T[] {
  if (root === null) return [];

  const result: T[] = [];
  const stack: Array<{ node: TreeNode<T>; visited: boolean }> = [{ node: root, visited: false }];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current.visited) {
      result.push(current.node.value);
      continue;
    }

    stack.push({ node: current.node, visited: true });
    for (let i = current.node.children.length - 1; i >= 0; i--) {
      stack.push({ node: current.node.children[i]!, visited: false });
    }
  }

  return result;
}

// Симметричный обход (Inorder) для дерева с несколькими детьми означает:
// первый ребёнок, узел, остальные дети.
// nextChild хранит индекс следующего необработанного ребёнка,
// а emitted показывает, был ли уже добавлен текущий узел.
export function dfsInorder<T>(root: TreeNode<T> | null): T[] {
  if (root === null) return [];

  const result: T[] = [];
  const stack: Array<{ node: TreeNode<T>; nextChild: number; emitted: boolean }> = [
    { node: root, nextChild: 0, emitted: false },
  ];

  while (stack.length > 0) {
    const frame = stack[stack.length - 1]!;

    if (frame.nextChild === 0 && frame.node.children.length > 0) {
      frame.nextChild = 1;
      stack.push({ node: frame.node.children[0]!, nextChild: 0, emitted: false });
    } else if (!frame.emitted) {
      result.push(frame.node.value);
      frame.emitted = true;
    } else if (frame.nextChild < frame.node.children.length) {
      stack.push({ node: frame.node.children[frame.nextChild]!, nextChild: 0, emitted: false });
      frame.nextChild++;
    } else {
      stack.pop();
    }
  }

  return result;
}
