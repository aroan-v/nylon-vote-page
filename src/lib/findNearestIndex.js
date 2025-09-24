import { roundToNearest5Minutes } from './roundToNearestFiveMinutes'

export function findNearestIndex({ timestamps, currentDate }) {
  const target = roundToNearest5Minutes(currentDate)

  const currentIndex = timestamps.findIndex((iso) => {
    const ts = new Date(iso)
    return ts.getHours() === target.getHours() && ts.getMinutes() === target.getMinutes()
  })

  let nextIndex = null
  if (currentIndex !== -1) {
    nextIndex = currentIndex + 1 < timestamps.length ? currentIndex + 1 : 0
  }

  return { currentIndex, nextIndex }
}
