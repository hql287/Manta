// Libraries
import React, { useEffect, useState } from 'react'
//import { ipcRenderer as ipc } from 'electron'

// Custom Libs
//import openDialog from '../../renderers/dialog.js'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

import Currency from './_partials/invoice/Currency'
import Fields from './_partials/invoice/Fields'
import Other from './_partials/invoice/Other'
import Tax from './_partials/invoice/Tax'

const { ipcRenderer: ipc, createDialogWindow } = window.electronAPI

interface TaxState {
  name: string
  amount: number
}

interface CurrencyState {
  code: string
  separator: string
  placement: string
  fraction: number
}

interface RequiredFields {
  [key: string]: boolean
}

interface InvoiceState {
  exportDir: string
  template: string
  currency: CurrencyState
  tax: TaxState
  required_fields: RequiredFields
  dateFormat: string
}

interface InvoiceProps {
  invoice: InvoiceState
  t: (key: string) => string
  updateSettings: (field: string, data: InvoiceState) => void
}

const Invoice: React.FC<InvoiceProps> = ({ invoice, t, updateSettings }) => {
  const [state, setState] = useState<InvoiceState>(invoice)

  const noAccessHandler = (
    _event: Electron.IpcRendererEvent,
    message: string
  ) => {
    createDialogWindow({
      type: 'warning',
      title: t('dialog:noAccess:title'),
      message: `${message}. ${t('dialog:noAccess:message')}`,
    })
  }

  const confirmedExportHandler = (
    _event: Electron.IpcRendererEvent,
    path: string
  ) => {
    setState((prevState) => {
      const updatedState = { ...prevState, exportDir: path }
      updateSettings('invoice', updatedState)
      return updatedState
    })
  }

  useEffect(() => {
    ipc.on('no-access-directory', noAccessHandler)
    ipc.on('confirmed-export-directory', confirmedExportHandler)

    return () => {
      ipc.removeListener('no-access-directory', noAccessHandler)
      ipc.removeListener('confirmed-export-directory', confirmedExportHandler)
    }
  }, [t, updateSettings])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target
    const updatedValue = type === 'checkbox' ? checked : value

    setState((prevState) => {
      const updatedState = { ...prevState, [name]: updatedValue }
      updateSettings('invoice', updatedState)
      return updatedState
    })
  }

  const handleTaxChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    const updatedValue = name === 'amount' ? parseFloat(value) : value

    setState((prevState) => {
      const updatedTax = { ...prevState.tax, [name]: updatedValue }
      const updatedState = { ...prevState, tax: updatedTax }
      updateSettings('invoice', updatedState)
      return updatedState
    })
  }

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    const updatedValue = name === 'fraction' ? parseInt(value, 10) : value

    setState((prevState) => {
      const updatedCurrency = { ...prevState.currency, [name]: updatedValue }
      const updatedState = { ...prevState, currency: updatedCurrency }
      updateSettings('invoice', updatedState)
      return updatedState
    })
  }

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target

    setState((prevState) => {
      const updatedFields = { ...prevState.required_fields, [name]: checked }
      const updatedState = { ...prevState, required_fields: updatedFields }
      updateSettings('invoice', updatedState)
      return updatedState
    })
  }

  const selectExportDir = () => {
    ipc.send('select-export-directory')
  }

  const { exportDir, template, currency, tax, required_fields, dateFormat } =
    state

  return (
    <>
      <Fields
        required_fields={required_fields}
        handleVisibilityChange={handleVisibilityChange}
        t={t}
      />
      <Tax handleTaxChange={handleTaxChange} tax={tax} t={t} />
      <Currency
        currency={currency}
        handleCurrencyChange={handleCurrencyChange}
        t={t}
      />
      <Other
        dateFormat={dateFormat}
        exportDir={exportDir}
        template={template}
        handleInputChange={handleInputChange}
        selectExportDir={selectExportDir}
        t={t}
      />
    </>
  )
}

export default _withFadeInAnimation(Invoice)
