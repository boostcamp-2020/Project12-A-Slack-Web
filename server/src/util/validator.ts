export default {
  isNumber: (num: number) => {
    if (!num || num < 1 || Number.isNaN(num)) return false
    return true
  },

  isString: (str: string) => {
    if (!str || str === '') return false
    return true
  },
}
