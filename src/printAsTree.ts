import { TestTree } from './TestTree';
import { traverseTree } from './Tree';

export function printAsTree(trees: TestTree[]): string {
  return trees.map((tree) => stringifyTree(tree)).join('\n');
}

function stringifyTree(tree: TestTree): string {
  const lines: string[] = [];
  traverseTree(tree, (value, depth) => {
    switch (value.type) {
      case 'test': {
        lines.push(`${indent(depth)}${value.input}`);
        lines.push(...value.expected.map((v) => `${indent(depth + 1)}${v}`));
        return;
      }
      case 'manual': {
        lines.push(`${indent(depth)}${value.input}`);
        lines.push(...value.expected.map((v) => `${indent(depth + 1)}${v}`));
        return;
      }
      case 'describe': {
        lines.push(`${indent(depth)}${value.title}`);
        return;
      }
    }
  });
  return lines.join('\n');
}

function indent(depth: number): string {
  return '  '.repeat(depth);
}
