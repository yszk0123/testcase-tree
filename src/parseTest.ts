import * as types from '@babel/types';

type Test = {
  title: string;
  callback: types.Function | undefined;
  status?: 'skip' | 'todo';
};

export function parseTest(node: types.CallExpression): Test | null {
  const callee = node.callee;

  // test, it
  const isTest =
    types.isIdentifier(callee) &&
    (callee.name === 'test' || callee.name === 'it');

  // test.skip, it.skip
  const isSkip =
    types.isMemberExpression(callee) &&
    types.isIdentifier(callee.object) &&
    (callee.object.name === 'test' || callee.object.name === 'it') &&
    types.isIdentifier(callee.property) &&
    callee.property.name === 'skip';

  // test.todo, it.todo
  const isTodo =
    types.isMemberExpression(callee) &&
    types.isIdentifier(callee.object) &&
    (callee.object.name === 'test' || callee.object.name === 'it') &&
    types.isIdentifier(callee.property) &&
    callee.property.name === 'todo';

  if (!isTest && !isSkip && !isTodo) {
    return null;
  }

  if (node.arguments.length < 1) {
    return null;
  }

  const titleNode = node.arguments[0];
  if (!types.isStringLiteral(titleNode)) {
    return null;
  }

  const callbackNode = node.arguments[1];

  return {
    title: titleNode.value,
    callback: types.isFunction(callbackNode) ? callbackNode : undefined,
    status: isSkip ? 'skip' : isTodo ? 'todo' : undefined,
  };
}
