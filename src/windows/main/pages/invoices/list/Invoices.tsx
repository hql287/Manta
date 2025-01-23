// Libraries
import React, { useEffect, useState } from 'react'
import { create } from 'zustand'

const { ipcRenderer: ipc, createDialogWindow } = window.electronAPI

// Components
import Invoice from '@uiMainComponents/invoices/Invoice'
import Message from '@uiSharedComponents/Message'
import { Button, ButtonsGroup } from '@uiSharedComponents/Button'
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '@uiSharedComponents/Layout'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

// Zustand Store
interface Invoice {
  _id: string
  status: string
}

interface InvoiceState {
  invoices: Invoice[]
  deleteInvoice: (invoiceId: string) => void
  setInvoiceStatus: (invoiceId: string, status: string) => void
  editInvoice: (invoice: Invoice) => void
  duplicateInvoice: (invoice: Invoice) => void
}

const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: [],
  deleteInvoice: (invoiceId) => {
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice._id !== invoiceId),
    }))
  },
  setInvoiceStatus: (invoiceId, status) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice._id === invoiceId ? { ...invoice, status } : invoice
      ),
    }))
  },
  editInvoice: (invoice) => console.log('Editing invoice', invoice),
  duplicateInvoice: (invoice) => console.log('Duplicating invoice', invoice),
}))

// Component
const Invoices: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null)
  const {
    invoices,
    deleteInvoice,
    setInvoiceStatus,
    editInvoice,
    duplicateInvoice,
  } = useInvoiceStore()

  useEffect(() => {
    const confirmedDeleteHandler = (
      event: Electron.IpcRendererEvent,
      index: number,
      invoiceId: string
    ) => {
      if (index === 0) {
        deleteInvoice(invoiceId)
      }
    }

    ipc.on('confirmed-delete-invoice', confirmedDeleteHandler)

    return () => {
      ipc.removeListener('confirmed-delete-invoice', confirmedDeleteHandler)
    }
  }, [deleteInvoice])

  const handleDeleteInvoice = (invoiceId: string) => {
    createDialogWindow(
      {
        type: 'warning',
        title: 'Delete Invoice',
        message: 'Are you sure you want to delete this invoice?',
        buttons: ['Yes', 'No'],
      },
      'confirmed-delete-invoice',
      invoiceId
    )
  }

  const handleSetFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newFilter = event.currentTarget.dataset.filter!
    setFilter((currentFilter) =>
      currentFilter === newFilter ? null : newFilter
    )
  }

  const filteredInvoices = filter
    ? invoices.filter((invoice) => invoice.status === filter)
    : invoices

  const statuses = ['paid', 'pending', 'refunded', 'cancelled']

  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderTitle>Invoices</PageHeaderTitle>
        <PageHeaderActions>
          <i className="ion-funnel" />
          <ButtonsGroup>
            {statuses.map((status) => (
              <Button
                key={status}
                active={filter === status}
                data-filter={status}
                onClick={handleSetFilter}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </ButtonsGroup>
        </PageHeaderActions>
      </PageHeader>
      <PageContent bare>
        {invoices.length === 0 ? (
          <Message info text="No invoices available." />
        ) : (
          <div className="row">
            {filteredInvoices.map((invoice, index) => (
              <Invoice
                key={invoice._id}
                dateFormat="YYYY-MM-DD"
                deleteInvoice={handleDeleteInvoice}
                duplicateInvoice={duplicateInvoice}
                editInvoice={editInvoice}
                setInvoiceStatus={setInvoiceStatus}
                index={index}
                invoice={invoice}
              />
            ))}
          </div>
        )}
      </PageContent>
    </PageWrapper>
  )
}

export default _withFadeInAnimation(Invoices)
