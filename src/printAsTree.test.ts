import { printAsTree } from './printAsTree';
import { unindent } from './testHelpers/unindent';

test('test', () => {
  const actual = printAsTree([
    {
      value: {
        type: 'test',
        input: 'input-1',
        expected: ['expected-1'],
      },
    },
  ]);
  expect(actual).toBe(
    unindent(`
      input-1
        expected-1
    `),
  );
});

test('manual', () => {
  const actual = printAsTree([
    {
      value: {
        type: 'manual',
        input: 'input-1',
        expected: ['expected-1'],
      },
    },
  ]);
  expect(actual).toBe(
    unindent(`
      input-1
        expected-1
    `),
  );
});

test('describe', () => {
  const actual = printAsTree([
    {
      value: {
        type: 'describe',
        title: 'describe-1',
      },
    },
  ]);
  expect(actual).toBe(
    unindent(`
      describe-1
    `),
  );
});

test('describe and test', () => {
  const actual = printAsTree([
    {
      value: {
        type: 'describe',
        title: 'describe-1',
      },
      children: [
        {
          value: {
            type: 'test',
            input: 'input-1',
            expected: ['expected-1'],
          },
        },
      ],
    },
  ]);
  expect(actual).toBe(
    unindent(`
      describe-1
        input-1
          expected-1
    `),
  );
});

test('multiple describe and multiple test', () => {
  const actual = printAsTree([
    {
      value: {
        type: 'describe',
        title: 'describe-1',
      },
      children: [
        {
          value: {
            type: 'test',
            input: 'input-1-1',
            expected: ['expected-1-1-1', 'expected-1-1-2'],
          },
        },
        {
          value: {
            type: 'test',
            input: 'input-1-2',
            expected: ['expected-1-2-1', 'expected-1-2-2'],
          },
        },
      ],
    },
    {
      value: {
        type: 'describe',
        title: 'describe-2',
      },
      children: [
        {
          value: {
            type: 'test',
            input: 'input-2-1',
            expected: ['expected-2-1-1', 'expected-2-1-2'],
          },
        },
        {
          value: {
            type: 'test',
            input: 'input-2-2',
            expected: ['expected-2-2-1', 'expected-2-2-2'],
          },
        },
      ],
    },
  ]);
  expect(actual).toBe(
    unindent(`
      describe-1
        input-1-1
          expected-1-1-1
          expected-1-1-2
        input-1-2
          expected-1-2-1
          expected-1-2-2
      describe-2
        input-2-1
          expected-2-1-1
          expected-2-1-2
        input-2-2
          expected-2-2-1
          expected-2-2-2
    `),
  );
});
