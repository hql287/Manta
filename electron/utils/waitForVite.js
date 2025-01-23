import fetch from 'node-fetch'

// Function to wait for the Vite server
export const waitForViteServer = async (url, timeout = 10000) => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      await fetch(url)
      return true // Server is ready
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 200)) // Retry after 200ms
    }
  }
  throw new Error(`Vite dev server not running at ${url}`)
}
