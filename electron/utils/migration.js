import appConfig from 'electron-settings'

export function migrateData() {
  // Migration scheme
  const migrations = {
    1: (configs) => {
      // Get the current configs
      const { info, appSettings } = configs
      // Return current configs if this is the first time install
      if (info === undefined || appSettings === undefined) {
        return configs
      }
      // Update current configs
      const migratedConfigs = Object.assign({}, configs, {
        profile: info,
        general: {
          language: appSettings.language,
          sound: appSettings.sound,
          muted: appSettings.muted,
        },
        invoice: {
          exportDir: appSettings.exportDir,
          template: appSettings.template,
          currency: appSettings.currency,
          dateFormat: 'MM/DD/YYYY',
          tax: {
            tin: '123-456-789',
            method: 'default',
            amount: 0,
          },
          required_fields: {
            dueDate: false,
            currency: false,
            discount: false,
            tax: false,
            note: false,
          },
        },
      })
      // Omit old keys
      return omit(migratedConfigs, [
        'info',
        'appSettings',
        'printOptions',
        'test',
      ])
    },

    2: (configs) => {
      // Return current configs if this is the first time install
      if (configs.invoice.currency.placement !== undefined) {
        return configs
      }
      // Update current configs
      return Object.assign({}, configs, {
        invoice: Object.assign({}, configs.invoice, {
          currency: {
            code: configs.invoice.currency,
            placement: 'before',
            separator: 'commaDot',
            fraction: 2,
          },
        }),
      })
    },

    3: (configs) => {
      // Return current configs if checkUpdate and lastCheck do not exist
      const { checkUpdate, lastCheck } = configs.general
      if (checkUpdate === undefined || lastCheck === undefined) {
        return configs
      }
      // Remove checkUpdate and lastCheck
      return Object.assign({}, configs, {
        general: omit(configs.general, ['checkUpdate', 'lastCheck']),
      })
    },
  }
  // Get the current Config
  const configs = appConfig.get()
  // Get the current configs
  const version = appConfig.get('version') || 0
  // Handle migration
  const newMigrations = Object.keys(migrations)
    .filter((k) => k > version)
    .sort()
  // Exit if there's no migration to run
  if (!newMigrations.length) return
  // If there's migration to run run the current
  // config through each migration
  const migratedConfigs = newMigrations.reduce(
    (prev, key) => migrations[key](prev),
    configs
  )
  // Save the final config to DB
  appConfig.deleteAll().setAll(migratedConfigs)
  // Update the latest config version
  appConfig.set('version', newMigrations[newMigrations.length - 1])
}
