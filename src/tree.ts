// Узел обобщённого дерева.
// У каждого узла есть значение и любое количество потомков.
// Пустой массив children означает, что узел является листом.
export class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];

  constructor(value: T, children: TreeNode<T>[] = []) {
    this.value = value;
    this.children = children;
  }
}
