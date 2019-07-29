function checkEveryTruthy (...arrayOfBooleans) {
  const result = arrayOfBooleans.every(check => check)
  return result
}

module.exports = checkEveryTruthy
