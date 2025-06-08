const assert = require('assert');
const { formatMinutes } = require('../format');

assert.strictEqual(formatMinutes(45), '45 min');
assert.strictEqual(formatMinutes(60), '1 h');
assert.strictEqual(formatMinutes(61), '1 h 1 min');
assert.strictEqual(formatMinutes(125), '2 h 5 min');

console.log('All tests passed.');
