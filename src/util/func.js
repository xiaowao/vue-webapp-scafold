function isNullOrUndefined (val) {
  return val === null || val === undefined
}
function isNotNullOrUndefined (val) {
  return !isNullOrUndefined(val)
}

export {
  isNullOrUndefined,
  isNotNullOrUndefined
}
