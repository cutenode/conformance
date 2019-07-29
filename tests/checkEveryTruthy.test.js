const checkEveryTruthy = require('../lib/checkEveryTruthy')

describe('validate output of checkSomeTruthy', () => {
  test('check that a single boolean is true', () => {
    expect(checkEveryTruthy(true)).toBe(true)
  })

  test('check that three of three booleans are true', () => {
    expect(checkEveryTruthy(true, true, true)).toBe(true)
  })

  test('check that a single boolean is false', () => {
    expect(checkEveryTruthy(false)).toBe(false)
  })

  test('ensure that one false boolean will result in a false return', () => {
    expect(checkEveryTruthy(true, false, true)).toBe(false)
  })
})
