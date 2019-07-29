function checkSomeTruthy (...arrayOfBooleans) {
  const result = arrayOfBooleans.some(check => check)
  return result
}

module.exports = checkSomeTruthy
