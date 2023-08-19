import fs from 'node:fs/promises';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { TestTree } from './TestTree';
import { DescribeState, describeVisitor } from './describeVisitor';

export function parse(code: string): TestTree[] {
  const state: DescribeState = { trees: [] };

  const ast = parser.parse(code, {
    sourceType: 'module',
  });
  traverse(ast, {
    Program(path) {
      path.traverse(describeVisitor, state);
    },
  });

  return state.trees;
}

export async function parseFile(file: string): Promise<TestTree[]> {
  const code = await fs.readFile(file, 'utf8');
  return parse(code);
}
