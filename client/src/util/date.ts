const getTimePassedFromNow = (date: string) => {
  let second = (new Date().getTime() - new Date(date).getTime()) / 1000
  second = second / 60 / 60 / 24
  if (second < 1) return getDateAndTime(date)
  return `${Math.round(second)} days ago`
}

const getDateAndTime = (date: string) => {
  const [, hour, minute] = date.split(/[T:]/, 3)
  return `${hour}:${minute} ${parseInt(hour, 10) > 11 ? 'PM' : 'AM'}`
}

export { getTimePassedFromNow, getDateAndTime }
