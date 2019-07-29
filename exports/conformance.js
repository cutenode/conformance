const parseExpressions = require('spdx-expression-parse')
const checkEveryTruthy = require('../lib/checkEveryTruthy')
const checkSomeTruthy = require('../lib/checkSomeTruthy')
const checkSpdx = require('../lib/checkSpdx.js')

const compliance = function (licenseID, options) {
  try {
    const data = parseExpressions(licenseID)
    return handleAsManyLicenseCasesAsPossilbe(data, licenseID, options)
  } catch (error) {
    const data = {
      error: true,
      errorMessage: `Passed license expression was not a valid license expression. Error from spdx-expression-parse: ${error}`
    }
    return handleAsManyLicenseCasesAsPossilbe(data, licenseID, options)
  }
}

function handleAsManyLicenseCasesAsPossilbe (data, licenseID, options) {
  const defaultOptions = {
    throwOnError: false
  }

  if (options === undefined || (Object.entries(options).length === 0 && options.constructor === Object)) { // if the options objecet is undefined *or* empty
    options = defaultOptions
  }

  if (data.error === true) { // handle errors that occur when license parsing fails because the parsed license expression is not valid
    if (options.throwOnError === true) {
      throw new Error(data.errorMessage)
    }

    process.exitCode = 1

    const returnableLicenseError = {
      license: licenseID,
      error: data.errorMessage
    }
    return returnableLicenseError
  }

  const returnableLicense = {
    uniqueLicenseIds: [],
    spdxLicenseLinks: [],
    spdx: {
      osi: false,
      fsf: false,
      fsfAndOsi: false,
      includesDeprecated: false
    }
  }

  if (typeof data.license === 'string') {
    // check license data
    const spdxCheck = checkSpdx(data.license)
    returnableLicense.spdx = spdxCheck // just directly assign the returned value to the module

    returnableLicense.uniqueLicenseIds.push(data.license)
    returnableLicense.spdxLicenseLinks.push(`https://spdx.org/licenses/${data.license}.html#licenseText`)
  } else if (typeof data.right.license === 'string') {
    // we're going to need both data for left and right for this one
    const spdxCheckLeft = checkSpdx(data.left.license)
    const spdxCheckRight = checkSpdx(data.right.license)

    returnableLicense.spdx.osi = checkEveryTruthy(spdxCheckLeft.osi, spdxCheckRight.osi)
    returnableLicense.spdx.fsf = checkEveryTruthy(spdxCheckLeft.fsf, spdxCheckRight.fsf)
    returnableLicense.spdx.fsfAndOsi = checkEveryTruthy(spdxCheckLeft.fsfAndOsi, spdxCheckRight.fsfAndOsi)
    returnableLicense.spdx.includesDeprecated = checkSomeTruthy(spdxCheckLeft.includesDeprecated, spdxCheckRight.includesDeprecated)

    returnableLicense.uniqueLicenseIds.push(
      data.left.license,
      data.right.license
    )

    returnableLicense.spdxLicenseLinks.push(
      `https://spdx.org/licenses/${data.left.license}.html#licenseText`,
      `https://spdx.org/licenses/${data.right.license}.html#licenseText`
    )
  } else if (typeof data.right.left.license === 'string') {
    const spdxCheckLeft = checkSpdx(data.left.license)
    const spdxCheckRightLeft = checkSpdx(data.right.left.license)
    const spdxCheckRightRight = checkSpdx(data.right.right.license)

    returnableLicense.spdx.osi = checkEveryTruthy(spdxCheckLeft.osi, spdxCheckRightLeft.osi, spdxCheckRightRight.osi)
    returnableLicense.spdx.fsf = checkEveryTruthy(spdxCheckLeft.fsf, spdxCheckRightLeft.fsf, spdxCheckRightRight.fsf)
    returnableLicense.spdx.fsfAndOsi = checkEveryTruthy(spdxCheckLeft.fsfAndOsi, spdxCheckRightLeft.fsfAndOsi, spdxCheckRightRight.fsfAndOsi)
    returnableLicense.spdx.includesDeprecated = checkSomeTruthy(spdxCheckLeft.includesDeprecated, spdxCheckRightLeft.includesDeprecated, spdxCheckRightRight.includesDeprecated)

    returnableLicense.uniqueLicenseIds.push(
      data.left.license,
      data.right.left.license,
      data.right.right.license
    )

    returnableLicense.spdxLicenseLinks.push(
      `https://spdx.org/licenses/${data.left.license}.html#licenseText`,
      `https://spdx.org/licenses/${data.right.left.license}.html#licenseText`,
      `https://spdx.org/licenses/${data.right.right.license}.html#licenseText`
    )
  }

  return returnableLicense
}

module.exports = compliance
