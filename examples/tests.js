const conformance = require('../index')

// These are all the checks that are for tests on ../exports/conformance.js
console.log(conformance('MIT'))
console.log(conformance('GPL-2.0-with-GCC-exception'))
console.log(conformance('ISC OR MIT'))
console.log(conformance('GPL-2.0-with-GCC-exception OR CC0-1.0'))
console.log(conformance('MIT OR (CC0-1.0 AND ISC)'))
console.log(conformance('MIT OR (Artistic-2.0 AND GPL-2.0-with-GCC-exception)'))
console.log(conformance('notareallicense'))
