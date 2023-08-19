export type TestTree = {
  value:
    | {
        type: 'describe';
        title: string;
        status?: 'skip';
      }
    | {
        type: 'test';
        input: string;
        expected: string[];
        status?: 'skip' | 'todo';
      }
    | {
        type: 'manual';
        input: string;
        expected: string[];
      };
  children?: TestTree[];
};
