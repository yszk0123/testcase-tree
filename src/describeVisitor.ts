import { Visitor } from '@babel/traverse';
import { parseTest } from './parseTest';
import { parseDescribe } from './parseDescribe';
import { TestTree } from './TestTree';
import { TestState, testVisitor } from './testVisitor';
import { parseManual } from './parseManual';

export type DescribeState = {
  trees: TestTree[];
};

export const describeVisitor: Visitor<DescribeState> = {
  CallExpression(path, state) {
    {
      const describe = parseDescribe(path.node);
      if (describe) {
        const childState: DescribeState = { trees: [] };
        path.traverse(describeVisitor, childState);
        state.trees.push({
          value: {
            type: 'describe',
            title: describe.title,
            status: describe.status,
          },
          children: childState.trees,
        });
        path.skip();
        return;
      }
    }
    {
      const test = parseTest(path.node);
      if (test) {
        const childState: TestState = {
          expected: [],
        };
        path.traverse(testVisitor, childState);
        state.trees.push({
          value: {
            type: 'test',
            input: test.title,
            expected: childState.expected,
            status: test.status,
          },
        });
        path.skip();
        return;
      }
    }
    {
      const manual = parseManual(path.node);
      if (manual) {
        state.trees.push({
          value: {
            type: 'manual',
            input: manual.title,
            expected: manual.expected,
          },
        });
        path.skip();
        return;
      }
    }
  },
};
