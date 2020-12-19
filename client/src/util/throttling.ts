const throttling = () => {
  let throttleCheck: boolean | number

  return {
    throttle(callback: () => void, milliseconds: number) {
      if (!throttleCheck) {
        throttleCheck = setTimeout(() => {
          callback()
          throttleCheck = false
        }, milliseconds)
      }
    },
  }
}
export default throttling
