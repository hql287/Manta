import os from 'os'
import fs from 'fs'
import path from 'path'
import appConfig from 'electron-settings'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function setInitialValues() {
  // Default Logo
  const logoPath = path.resolve(
    __dirname,
    '../../public/static/imgs/default_logo.svg'
  )
  const logoData = fs.readFileSync(logoPath)
  const logoBase64String =
    'data:image/svg+xml;base64,' + logoData.toString('base64')

  // Default Options
  const defaultOptions = {
    tour: {
      isActive: false,
      hasBeenTaken: false,
    },
    winsLastVisibleState: {
      isMainWinVisible: true,
      isPreviewWinVisible: false,
    },
    profile: {
      logo: logoBase64String,
      fullname: 'Manta Ray',
      company: 'Oceanic Preservation Society',
      address: '336 Bon Air Center #384 Greenbrae, CA 94904',
      email: 'info@opsociety.org',
      phone: '+01 (0) 1-2345-6789',
      website: 'http://www.opsociety.org/',
    },
    general: {
      language: 'en',
      sound: 'default',
      muted: false,
      previewPDF: true,
      checkUpdate: 'daily',
      lastCheck: Date.now(),
    },
    invoice: {
      exportDir: os.homedir(),
      template: 'default',
      dateFormat: 'MM/DD/YYYY',
      tax: {
        tin: '123-456-789',
        method: 'default',
        amount: 0,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        separator: 'commaDot',
        fraction: 2,
      },
      required_fields: {
        invoiceID: false,
        dueDate: false,
        currency: false,
        discount: false,
        tax: false,
        note: false,
      },
    },
  }

  // Ensure defaults exist
  for (const key in defaultOptions) {
    if (!appConfig.hasSync(key)) {
      appConfig.setSync(key, defaultOptions[key])
    }
  }
}
