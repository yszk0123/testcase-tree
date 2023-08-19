import * as types from '@babel/types';
import { Visitor } from '@babel/traverse';

export type TestState = {
  expected: string[];
};

export const testVisitor: Visitor<TestState> = {
  CallExpression(path, state) {
    if (
      !types.isIdentifier(path.node.callee) ||
      path.node.callee.name !== 'expect'
    ) {
      return;
    }

    const statement = path.findParent((p) =>
      types.isExpressionStatement(p.node),
    );
    if (!statement) {
      return;
    }

    const comments = (statement.node.leadingComments ?? []).map((v) =>
      v.value.trim(),
    );
    state.expected.push(...comments);
  },
};
