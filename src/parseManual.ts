import * as types from '@babel/types';

type Manual = {
  title: string;
  expected: string[];
};

export function parseManual(node: types.CallExpression): Manual | null {
  const callee = node.callee;

  // test, it
  const isManual = types.isIdentifier(callee) && callee.name === 'manual';
  if (!isManual) {
    return null;
  }

  if (node.arguments.length < 1) {
    return null;
  }

  const titleNode = node.arguments[0];
  if (!types.isStringLiteral(titleNode)) {
    return null;
  }

  // manual(TITLE, { expected: ['1', '2'] })
  const object = node.arguments[1];
  let expected: string[] = [];
  if (types.isObjectExpression(object)) {
    object.properties.forEach((prop) => {
      if (
        !(
          types.isObjectProperty(prop) &&
          types.isIdentifier(prop.key) &&
          prop.key.name === 'expected' &&
          types.isArrayExpression(prop.value)
        )
      ) {
        return;
      }
      expected = prop.value.elements
        .map((v) => (types.isStringLiteral(v) ? v.value : null))
        .filter(isNotNull);
    });
  }

  return {
    title: titleNode.value,
    expected,
  };
}

function isNotNull<T>(v: T | null): v is T {
  return v !== null;
}
