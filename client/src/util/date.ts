const getTimeAMPMFormat = (dateString: string) => {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}${
    hours < 12 ? ' AM' : ' PM'
  }`
}

const getTimePassedFromNow = (dateString: string) => {
  let second = (new Date().getTime() - new Date(dateString).getTime()) / 1000
  second = second / 60 / 60 / 24
  if (second < 1) return getTimeAMPMFormat(dateString)
  return `${Math.round(second)} days ago`
}

const getMonthDayYear = (dateString: string) => {
  /** format: Month Day, Year */
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getWeekdayDayMonth = (dateString: string) => {
  /** format: Weekday, Day Month */
  return new Date(dateString).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export {
  getTimeAMPMFormat,
  getTimePassedFromNow,
  getMonthDayYear,
  getWeekdayDayMonth,
}
