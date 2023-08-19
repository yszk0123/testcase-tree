import * as types from '@babel/types';

type Describe = {
  title: string;
  callback: types.Function;
  status?: 'skip';
};

export function parseDescribe(node: types.CallExpression): Describe | null {
  const callee = node.callee;

  // describe
  const isDescribe = types.isIdentifier(callee) && callee.name === 'describe';

  // describe.skip
  const isSkip =
    types.isMemberExpression(callee) &&
    types.isIdentifier(callee.object) &&
    callee.object.name === 'describe' &&
    types.isIdentifier(callee.property) &&
    callee.property.name === 'skip';

  if (!isDescribe && !isSkip) {
    return null;
  }

  if (node.arguments.length !== 2) {
    return null;
  }

  const titleNode = node.arguments[0];
  if (!types.isStringLiteral(titleNode)) {
    return null;
  }

  const callbackNode = node.arguments[1];
  if (!types.isFunction(callbackNode)) {
    return null;
  }

  return {
    title: titleNode.value,
    callback: callbackNode,
    status: isSkip ? 'skip' : undefined,
  };
}
