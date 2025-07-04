// tests for reverse() function
const { test } = require('node:test')                // node library for testing
const assert = require('node:assert')                // node library used by tests to check results

// import reverse() function to be tested from folder
const reverse = require('../utils/for_testing').reverse

// test: arg1 = test description, arg2 = test function
test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')

    assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')

    assert.strictEqual(result, 'saippuakauppias')
})
