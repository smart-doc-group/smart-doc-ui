const fn = require('../src/test');

test('adds 1 + 2 to equal 3', () => {
  expect(fn.sum(1, 2)).toBe(3);
});
