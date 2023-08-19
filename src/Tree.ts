export type Tree<T> = {
  value: T;
  children?: Tree<T>[];
};

export function filterTree<T>(
  tree: Tree<T>,
  predicate: (v: T) => boolean,
): Tree<T> | null {
  if (!predicate(tree.value)) {
    return null;
  }
  const value = tree.value;
  const children = tree.children
    ?.map((v) => filterTree(v, predicate))
    .filter(isNotNull);
  return { value, children };
}

export function traverseTree<T>(
  tree: Tree<T>,
  visit: (value: T, depth: number) => unknown,
  depth = 0,
): void {
  visit(tree.value, depth);
  for (const child of tree.children ?? []) {
    traverseTree(child, visit, depth + 1);
  }
}

function isNotNull<T>(v: T | null): v is T {
  return v !== null;
}
