import React from 'react'

import Invoices from '@uiMainPages/invoices/list/Invoices'
import InvoiceForm from '@uiMainPages/invoices/add/InvoiceForm'
import Contacts from '@uiMainPages/clients/Contacts'
import Settings from '@uiMainPages/settings/Settings'
import { AppMainContent } from '@uiSharedComponents/Layout'
import { MENUS } from '@uiConstants/menus'

interface AppMainProps {
  activePage: string
}

const AppMain: React.FC<AppMainProps> = ({ activePage }) => {
  return (
    <AppMainContent>
      {activePage === MENUS.NEW_INVOICE.toLowerCase() && <InvoiceForm />}
      {activePage === MENUS.ALL_INVOICES.toLowerCase() && <Invoices />}
      {activePage === MENUS.ALL_CLIENTS.toLowerCase() && <Contacts />}
      {activePage === MENUS.GENERAL_SETTINGS.toLowerCase() && <Settings />}
    </AppMainContent>
  )
}

export default React.memo(AppMain, (prevProps, nextProps) => {
  return prevProps.activePage === nextProps.activePage
})
