import { sum } from '__tests__/temp';

test('test', () => {
  expect(sum()).toBe(0);
});

test('test', () => {
  expect(sum(1, 2)).toBe(4);
});
