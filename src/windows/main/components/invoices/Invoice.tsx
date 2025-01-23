// Libraries
import React from 'react'
import { truncate } from 'lodash'
import styled from 'styled-components'
import moment from 'moment'
//import { ipcRenderer as ipc } from 'electron'

const { ipcRenderer: ipc } = window.electronAPI

// Helper
import { formatNumber } from '@uiHelpers/formatNumber'
import { calTermDate } from '@uiHelpers/date'

// Custom Components
import { Button } from '@uiSharedComponents/Button'
import SplitButton from '@uiSharedComponents/SplitButton'

// Styled Components
const Wrapper = styled.div`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
`

const StatusBar = styled.div<{ status: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 4px 4px 0 0;
  ${(props) => props.status === 'pending' && `background: #469FE5;`}
  ${(props) => props.status === 'paid' && `background: #6BBB69;`}
  ${(props) => props.status === 'refunded' && `background: #4F555C;`}
  ${(props) => props.status === 'cancelled' && `background: #EC476E;`}
`

const Status = styled.div<{ status: string }>`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${(props) => props.status === 'pending' && `color: #469FE5;`}
  ${(props) => props.status === 'paid' && `color: #6BBB69;`}
  ${(props) => props.status === 'refunded' && `color: #4F555C;`}
  ${(props) => props.status === 'cancelled' && `color: #EC476E;`}
  span {
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
    }
  }
  i.ion-checkmark,
  i.ion-loop,
  i.ion-backspace,
  i.ion-arrow-return-left {
    font-size: 18px;
    line-height: 18px;
  }
`

const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  i {
    margin-left: 10px;
    color: #b4b7ba;
  }
  i.ion-trash-a {
    font-size: 24px;
    line-height: 24px;
    &:hover {
      color: #ec476e;
    }
  }
  i.ion-ios-copy {
    font-size: 24px;
    line-height: 24px;
    &:hover {
      color: #469fe5;
    }
  }
`

const Body = styled.div`
  padding: 0 30px;
`

const Footer = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    flex: 1;
    margin: 0 10px;
    &:first-child {
      flex: 3;
    }
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Field = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 15px;
  text-transform: capitalize;
  h2 {
    font-size: 21px;
    color: #283641;
    margin-bottom: 0;
    font-weight: 500;
  }
  label {
    font-size: 11px;
    color: #b4b7ba;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
    font-weight: 400;
  }
  p {
    font-weight: 300;
    margin-bottom: 0px;
    font-size: 14px;
  }
`

// Types
interface Currency {
  placement: 'before' | 'after'
  code: string
  fraction: number
  separator: string
}

interface DueDate {
  useCustom: boolean
  paymentTerm: string
  selectedDate?: string
}

interface Recipient {
  fullname: string
}

interface InvoiceProps {
  invoice: {
    _id: string
    recipient: Recipient
    currency: Currency
    tax?: number
    grandTotal: number
    status: 'pending' | 'paid' | 'refunded' | 'cancelled'
    dueDate: DueDate
    created_at: string
    invoiceID?: string
    configs?: {
      dateFormat: string
    }
  }
  dateFormat: string
  deleteInvoice: (id: string) => void
  duplicateInvoice: (invoice: InvoiceProps['invoice']) => void
  editInvoice: (invoice: InvoiceProps['invoice']) => void
  setInvoiceStatus: (id: string, status: string) => void
  t: (key: string) => string
}

const Invoice: React.FC<InvoiceProps> = ({
  invoice,
  dateFormat,
  deleteInvoice,
  duplicateInvoice,
  editInvoice,
  setInvoiceStatus,
  t,
}) => {
  const viewInvoice = () => {
    ipc.send('preview-invoice', invoice)
  }

  const renderStatus = () => {
    switch (invoice.status) {
      case 'cancelled':
        return (
          <span>
            <i className="ion-backspace" />
            {t('invoices:status:cancelled')}
          </span>
        )
      case 'paid':
        return (
          <span>
            <i className="ion-checkmark" />
            {t('invoices:status:paid')}
          </span>
        )
      case 'refunded':
        return (
          <span>
            <i className="ion-arrow-return-left" />
            {t('invoices:status:refunded')}
          </span>
        )
      default:
        return (
          <span>
            <i className="ion-loop" />
            {t('invoices:status:pending')}
          </span>
        )
    }
  }

  const renderDueDate = () => {
    const { dueDate } = invoice
    const format = invoice.configs?.dateFormat || dateFormat

    if (dueDate.useCustom) {
      return moment(dueDate.selectedDate).format(format)
    }

    const paymentTermDate = calTermDate(invoice.created_at, dueDate.paymentTerm)
    return `
      ${t(`form:fields:dueDate:paymentTerms:${dueDate.paymentTerm}:label`)}
      (
      ${moment(paymentTermDate).format(format)}
      )
    `
  }

  const statusActions = [
    {
      label: t('invoices:status:pending'),
      action: () => setInvoiceStatus(invoice._id, 'pending'),
    },
    {
      label: t('invoices:status:refunded'),
      action: () => setInvoiceStatus(invoice._id, 'refunded'),
    },
    {
      label: t('invoices:status:cancelled'),
      action: () => setInvoiceStatus(invoice._id, 'cancelled'),
    },
  ]

  const currencyBefore = invoice.currency.placement === 'before'

  return (
    <div className="col-lg-6">
      <Wrapper>
        <StatusBar status={invoice.status} />
        <Header>
          <Status status={invoice.status}>{renderStatus()}</Status>
          <ButtonsGroup>
            <Button link onClick={() => duplicateInvoice(invoice)}>
              <i className="ion-ios-copy" />
            </Button>
            <Button link onClick={() => deleteInvoice(invoice._id)}>
              <i className="ion-trash-a" />
            </Button>
          </ButtonsGroup>
        </Header>
        <Body>
          <Row>
            <Field>
              <label>{t('invoices:fields:client')}</label>
              <h2>{invoice.recipient.fullname}</h2>
            </Field>
          </Row>
          <Row>
            <Field>
              <label>{t('invoices:fields:invoiceID')}</label>
              <p>
                {invoice.invoiceID
                  ? invoice.invoiceID
                  : truncate(invoice._id, { length: 8, omission: '' })}
              </p>
            </Field>
            <Field>
              <label>{t('invoices:fields:total')}</label>
              <p>
                {currencyBefore ? invoice.currency.code : null}{' '}
                {formatNumber(
                  invoice.grandTotal,
                  invoice.currency.fraction,
                  invoice.currency.separator
                )}{' '}
                {currencyBefore ? null : invoice.currency.code}
              </p>
            </Field>
          </Row>
          <Row>
            <Field>
              <label>{t('invoices:fields:createdDate')}</label>
              <p>{moment(invoice.created_at).format(dateFormat)}</p>
            </Field>
            <Field>
              <label>{t('invoices:fields:dueDate')}</label>
              <p>{invoice.dueDate && renderDueDate()}</p>
            </Field>
          </Row>
        </Body>
        <Footer>
          <SplitButton
            mainButton={{
              label: t('invoices:btns:markAsPaid'),
              action: () => setInvoiceStatus(invoice._id, 'paid'),
            }}
            options={statusActions}
          />
          <Button onClick={() => editInvoice(invoice)}>
            {t('invoices:btns:edit')}
          </Button>
          <Button onClick={viewInvoice}>{t('invoices:btns:view')}</Button>
        </Footer>
      </Wrapper>
    </div>
  )
}

export default Invoice
