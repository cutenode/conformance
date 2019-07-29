const checkSpdx = require('../lib/checkSpdx')

describe('validate output of checkSpdx()', () => {
  test('test checkSpdx() with \'MIT\'', () => {
    const actual = checkSpdx('MIT')
    expect(actual).toEqual(
      {
        osi: true,
        fsf: true,
        fsfAndOsi: true,
        includesDeprecated: false
      }
    )
  })

  test('test passing a depricated license to checkSpdx()', () => {
    const actual = checkSpdx('GPL-2.0-with-GCC-exception')
    expect(actual).toEqual(
      {
        osi: false,
        fsf: false,
        fsfAndOsi: false,
        includesDeprecated: true
      }
    )
  })

  test('test a broken spdx license identifier', () => {
    const actual = checkSpdx('lol no')
    expect(actual).toEqual(
      {
        osi: false,
        fsf: false,
        fsfAndOsi: false,
        includesDeprecated: false
      }
    )
  })
})
