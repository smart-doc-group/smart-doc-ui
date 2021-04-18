const sum = (a: number = 0, b: number = 0) => a + b;

test('test', () => {
  expect(sum()).toBe(0);
});

test('test', () => {
  expect(sum(1, 2)).toBe(4);
});
