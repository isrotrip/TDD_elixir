const { sum } = require('../helpers/calcalutor.js');
const { multiple } = require('../helpers/calcalutor.js');


test('adds 1 + 2 equals 3', function() {
  expect(sum(1, 2)).toBe(3);
});

test('multiple 1 * 2 equals 2', function() {
  expect(multiple(1, 2)).toBe(2);
});