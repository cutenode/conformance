const conformance = require('../exports/conformance')

describe('test the main export of the module', () => {
  test('check the output of MIT', () => {
    const actual = conformance('MIT')
    expect(actual).toEqual(
      {
        uniqueLicenseIds: [ 'MIT' ],
        spdxLicenseLinks: [ 'https://spdx.org/licenses/MIT.html#licenseText' ],
        spdx: {
          osi: true,
          fsf: true,
          fsfAndOsi: true,
          includesDeprecated: false
        }
      }
    )
  })

  test('test a single deprecated license', () => {
    const actual = conformance('GPL-2.0-with-GCC-exception')
    expect(actual).toEqual(
      {
        uniqueLicenseIds: [ 'GPL-2.0-with-GCC-exception' ],
        spdxLicenseLinks: [
          'https://spdx.org/licenses/GPL-2.0-with-GCC-exception.html#licenseText'
        ],
        spdx: {
          osi: false,
          fsf: false,
          fsfAndOsi: false,
          includesDeprecated: true
        }
      }
    )
  })

  test('check two licenses that pass osi, fsf, and fsfAndOSI', () => {
    const actual = conformance('ISC OR MIT')
    expect(actual).toEqual(
      {
        uniqueLicenseIds: [ 'ISC', 'MIT' ],
        spdxLicenseLinks: [
          'https://spdx.org/licenses/ISC.html#licenseText',
          'https://spdx.org/licenses/MIT.html#licenseText'
        ],
        spdx: { osi: true, fsf: true, fsfAndOsi: true, includesDeprecated: false }
      }
    )
  })

  test('check two licenses that are not osi, fsf, and fsfAndOsi in addition to a deprecated license', () => {
    const actual = conformance('GPL-2.0-with-GCC-exception OR CC0-1.0')
    expect(actual).toEqual(
      {
        uniqueLicenseIds: [ 'GPL-2.0-with-GCC-exception', 'CC0-1.0' ],
        spdxLicenseLinks: [
          'https://spdx.org/licenses/GPL-2.0-with-GCC-exception.html#licenseText',
          'https://spdx.org/licenses/CC0-1.0.html#licenseText'
        ],
        spdx: {
          osi: false,
          fsf: false,
          fsfAndOsi: false,
          includesDeprecated: true
        }
      }
    )
  })

  test('check a complex license expression statement that does not pass osi but does pass fsf and fsfAndOSI', () => {
    const actual = conformance('MIT OR (CC0-1.0 AND ISC)')
    expect(actual).toEqual(
      {
        uniqueLicenseIds: [ 'MIT', 'CC0-1.0', 'ISC' ],
        spdxLicenseLinks: [
          'https://spdx.org/licenses/MIT.html#licenseText',
          'https://spdx.org/licenses/CC0-1.0.html#licenseText',
          'https://spdx.org/licenses/ISC.html#licenseText'
        ],
        spdx: {
          osi: false,
          fsf: true,
          fsfAndOsi: false, // this should not happen and needs to be fixed
          includesDeprecated: false }
      }
    )
  })

  test('', () => {
    const actual = conformance('MIT OR (Artistic-2.0 AND GPL-2.0-with-GCC-exception)')
    expect(actual).toEqual(
      {
        uniqueLicenseIds: [ 'MIT', 'Artistic-2.0', 'GPL-2.0-with-GCC-exception' ],
        spdxLicenseLinks: [
          'https://spdx.org/licenses/MIT.html#licenseText',
          'https://spdx.org/licenses/Artistic-2.0.html#licenseText',
          'https://spdx.org/licenses/GPL-2.0-with-GCC-exception.html#licenseText'
        ],
        spdx: {
          osi: false,
          fsf: false,
          fsfAndOsi: false,
          includesDeprecated: true
        }
      }
    )
  })
})

describe('test options passed to conformance.js', () => {
  test('check undefined throwOnError option that should not throw', () => {
    const options = undefined
    const actual = conformance('notareallicense', options)
    expect(actual).toEqual(
      {
        license: 'notareallicense',
        error: 'Passed license expression was not a valid license expression. Error from spdx-expression-parse: Error: Unexpected `n` at offset 0'
      }
    )
  })

  test('check default throwOnError option that should pass', () => {
    const options = {}
    const actual = conformance('notareallicense', options)
    expect(actual).toEqual(
      {
        license: 'notareallicense',
        error: 'Passed license expression was not a valid license expression. Error from spdx-expression-parse: Error: Unexpected `n` at offset 0'
      }
    )
  })

  test('check default throwOnError option that should fail', () => {
    const options = {
      throwOnError: true
    }
    expect(() => conformance('notareallicense', options)).toThrow(new Error('Passed license expression was not a valid license expression. Error from spdx-expression-parse: Error: Unexpected `n` at offset 0'))
  })
})
