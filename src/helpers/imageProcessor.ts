import { Jimp } from 'jimp'

/**
 * Processes an uploaded image (JPEG, PNG, or SVG).
 * - Raster images (JPEG, PNG) are resized & optimized.
 * - Vector images (SVG) are converted to base64.
 *
 * @param file - The File object from input.
 * @returns A promise resolving to a base64-encoded image string.
 */
export async function processImage(file: File): Promise<string> {
  if (!file) throw new Error('Invalid file')

  const fileExt = file.name.split('.').pop()?.toLowerCase()
  const isSVG = file.type === 'image/svg+xml'

  // Handle SVG (Preserve original quality)
  if (isSVG) {
    const data = await file.text() // Read as string
    return `data:image/svg+xml;base64,${btoa(data)}`
  }

  // Handle JPEG/PNG
  try {
    const imageBuffer = await file.arrayBuffer() // ✅ Get raw image data
    const jimpImage = await Jimp.read(new Uint8Array(imageBuffer)) // ✅ Convert to Uint8Array

    jimpImage.resize(500, Jimp.AUTO).quality(90) // Resize & optimize

    return await new Promise<string>((resolve, reject) => {
      jimpImage.getBase64(Jimp.MIME_PNG, (err, base64) => {
        if (err) reject(err)
        else resolve(base64)
      })
    })
  } catch (error) {
    console.error('Error processing image:', error)
    throw new Error('Failed to process image')
  }
}
