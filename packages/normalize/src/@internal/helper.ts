export function isLastChar(value, char) {
  return !!value && value.substr(value.length - 1) === char
}

export function shouldDeleteLastChar(value, previousValue, normalizedChar) {
  if (previousValue) {
    const isBackspacing = value.length < previousValue.length
    if (isBackspacing) {
      if (isLastChar(previousValue, normalizedChar)) {
        return previousValue.substr(0, previousValue.length - 1)
      }
    }
  }
}

export function noChangeOnDeleteLastChar(value, previousValue) {
  if (previousValue) {
    const isBackspacing = value.length < previousValue.length
    if (isBackspacing) {
      return value
    }
  }
}
