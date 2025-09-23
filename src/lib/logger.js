// src/lib/logger.js

export const devLog = (label, ...args) => {
  if (process.env.NODE_ENV !== 'production') {
    // Check if the code is running on the client (in a browser)
    if (typeof window !== 'undefined') {
      // Use console.group for a clean, collapsible output in the browser console
      console.groupCollapsed(`[${label}]`, ...args)
      // Fire console.trace() only on the client
      console.trace()
      console.groupEnd()
    } else {
      // Log to the server console with a clear identifier
      console.log(`[SERVER LOG] [${label}]`, ...args)
    }
  }
}

export const devError = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(...args)
  }
}
