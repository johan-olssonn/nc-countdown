export function getCountdownString(currentDate: Date, futureDate: Date) {
  const oneDayInMs = 1000

  const msDiff = Math.abs(currentDate.getTime() - futureDate.getTime())

  let seconds = Math.round(msDiff / oneDayInMs)

  const days = Math.floor(seconds / (3600 * 24))
  seconds -= days * 3600 * 24
  const hrs = Math.floor(seconds / 3600)
  seconds -= hrs * 3600
  const mnts = Math.floor(seconds / 60)
  seconds -= mnts * 60

  return days + ' days, ' + hrs + ' h, ' + mnts + ' m, ' + seconds + ' s'
}
