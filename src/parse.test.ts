import { parse } from './parse';

test('describe', () => {
  const actual = parse(`
    describe('describe-1', () => {
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        title: 'describe-1',
        type: 'describe',
      },
      children: [],
    },
  ]);
});

test('describe.skip', () => {
  const actual = parse(`
    describe.skip('describe-1', () => {
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        title: 'describe-1',
        type: 'describe',
        status: 'skip',
      },
      children: [],
    },
  ]);
});

test('test', () => {
  const actual = parse(`
    test('test-1', async () => {
      // expected-1
      expect(1).toBe(1);
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        expected: ['expected-1'],
        input: 'test-1',
        type: 'test',
      },
    },
  ]);
});

test('test.skip', () => {
  const actual = parse(`
    test.skip('test-1', () => {
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        type: 'test',
        input: 'test-1',
        expected: [],
        status: 'skip',
      },
    },
  ]);
});

test('test.todo', () => {
  const actual = parse(`
    test.todo('test-1');
  `);
  expect(actual).toEqual([
    {
      value: {
        type: 'test',
        input: 'test-1',
        expected: [],
        status: 'todo',
      },
    },
  ]);
});

test('it.skip', () => {
  const actual = parse(`
    test.skip('test-1', () => {
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        type: 'test',
        input: 'test-1',
        expected: [],
        status: 'skip',
      },
    },
  ]);
});

test('it.todo', () => {
  const actual = parse(`
    test.todo('test-1');
  `);
  expect(actual).toEqual([
    {
      value: {
        type: 'test',
        input: 'test-1',
        expected: [],
        status: 'todo',
      },
    },
  ]);
});

test('manual without `expected`', () => {
  const actual = parse(`
    manual('manual-1');
  `);
  expect(actual).toEqual([
    {
      value: {
        type: 'manual',
        input: 'manual-1',
        expected: [],
      },
    },
  ]);
});

test('manual with `expected`', () => {
  const actual = parse(`
    manual('manual-1', {
      expected: ['1', '2']
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        type: 'manual',
        input: 'manual-1',
        expected: ['1', '2'],
      },
    },
  ]);
});

test('describe and test', () => {
  const actual = parse(`
    describe('describe-1', () => {
      test('test-1', async () => {
        // expected-1
        expect(1).toBe(1);
      });
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        title: 'describe-1',
        type: 'describe',
      },
      children: [
        {
          value: {
            expected: ['expected-1'],
            input: 'test-1',
            type: 'test',
          },
        },
      ],
    },
  ]);
});

test('multiple expect', () => {
  const actual = parse(`
    test('test-1', async () => {
      // expected-1
      expect(1).toBe(1);
      // expected-2
      expect(1).toBe(1);
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        expected: ['expected-1', 'expected-2'],
        input: 'test-1',
        type: 'test',
      },
    },
  ]);
});

test('multiple describe', () => {
  const actual = parse(`
    describe('describe-1', () => {
      test('test-1', async () => {
        // expected-1
        expect(1).toBe(1);
      });
    });

    describe('describe-2', () => {
      test('test-2', async () => {
        // expected-2
        expect(1).toBe(1);
      });
    });
  `);
  expect(actual).toEqual([
    {
      value: {
        title: 'describe-1',
        type: 'describe',
      },
      children: [
        {
          value: {
            expected: ['expected-1'],
            input: 'test-1',
            type: 'test',
          },
        },
      ],
    },
    {
      value: {
        title: 'describe-2',
        type: 'describe',
      },
      children: [
        {
          value: {
            expected: ['expected-2'],
            input: 'test-2',
            type: 'test',
          },
        },
      ],
    },
  ]);
});
