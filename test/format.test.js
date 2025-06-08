const assert = require('assert');
const { formatMinutes } = require('../format');

assert.strictEqual(formatMinutes(45), '45mins');
assert.strictEqual(formatMinutes(60), '1h');
assert.strictEqual(formatMinutes(61), '1h 1min');
assert.strictEqual(formatMinutes(125), '2h 5mins');

console.log('All tests passed.');
