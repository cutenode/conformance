const checkSomeTruthy = require('../lib/checkSomeTruthy')

describe('validate output of checkSomeTruthy', () => {
  test('check that a single boolean is true', () => {
    expect(checkSomeTruthy(true)).toBe(true)
  })

  test('check that three of three booleans are true', () => {
    expect(checkSomeTruthy(true, true, true)).toBe(true)
  })

  test('check that a single boolean is false', () => {
    expect(checkSomeTruthy(false)).toBe(false)
  })

  test('ensure that one false boolean will result in a false return', () => {
    expect(checkSomeTruthy(true, false, true)).toBe(true)
  })

  test('ensure that one false boolean will result in a false return', () => {
    expect(checkSomeTruthy(false, false, false)).toBe(false)
  })
})
