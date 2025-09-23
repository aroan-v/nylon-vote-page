export function roundToNearest5Minutes(date) {
  const ms = 1000 * 60 * 5 // 5 minutes in ms
  return new Date(Math.ceil(date.getTime() / ms) * ms)
}
