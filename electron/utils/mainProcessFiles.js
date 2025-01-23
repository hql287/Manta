import glob from 'glob'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function loadMainProcessFiles() {
  const files = glob.sync(path.join(__dirname, '../main/*.js'))
  files.forEach(async (file) => {
    try {
      await import(file)
    } catch (err) {
      console.error(`Failed to load ${file}:`, err)
    }
  })
}
