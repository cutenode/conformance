const deprecated = require('spdx-license-ids/deprecated')
const OSI = require('../licenses/array').osi
const FSF = require('../licenses/array').fsf
const FSFandOSI = require('../licenses/array').both

function checkSpdx (licenseToCheck) {
  const spdx = {
    osi: OSI.includes(licenseToCheck),
    fsf: FSF.includes(licenseToCheck),
    fsfAndOsi: FSFandOSI.includes(licenseToCheck),
    includesDeprecated: deprecated.includes(licenseToCheck)
  }

  return spdx
}

module.exports = checkSpdx
