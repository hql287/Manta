// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import styled from 'styled-components';

const format = require('date-fns/format');
const moment = require('moment');
const ipc = require('electron').ipcRenderer;

// Helper
import { formatNumber } from '../../helpers/number';

// Custom Components
import Button from '../shared/Button';
import SplitButton from '../shared/SplitButton';

import * as TRANSLATION_LABELS from '../../constants/translations';

// Invoice Container
const Wrapper = styled.div`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Invoice Header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  i.ion-trash-a {
    font-size: 24px;
    line-height: 24px;
    color: #c4c8cc;
  }
  i.ion-checkmark {
    font-size: 16px;
    line-height: 16px;
  }
  i.ion-loop {
    font-size: 18px;
    line-height: 18px;
  }
  i.ion-backspace {
    font-size: 18px;
    line-height: 18px;
  }
  i.ion-arrow-return-left {
    font-size: 18px;
    line-height: 18px;
  }
`;

const StatusBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 4px 4px 0 0;
  ${props => props.status === 'pending' && `background: #469FE5;`} ${props =>
      props.status === 'paid' && `background: #6BBB69;`} ${props =>
      props.status === 'refunded' && `background: #4F555C;`} ${props =>
      props.status === 'cancelled' && `background: #EC476E;`};
`;

const Status = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  ${props => props.status === 'pending' && `color: #469FE5;`} ${props =>
      props.status === 'paid' && `color: #6BBB69;`} ${props =>
      props.status === 'refunded' && `color: #4F555C;`} ${props =>
      props.status === 'cancelled' && `color: #EC476E;`} span {
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
    }
  }
`;

// Invoice Body
const Body = styled.div`
  padding: 0 30px;
`;

// Invoice Footer
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
`;

// Shared Style
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Field = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 15px;
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
`;

// Component
class Invoice extends PureComponent {
  constructor(props) {
    super(props);
    this.viewInvoice = this.viewInvoice.bind(this);
    this.editInvoice = this.editInvoice.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.displayStatus = this.displayStatus.bind(this);
  }

  deleteInvoice() {
    const { invoice, deleteInvoice } = this.props;
    deleteInvoice(invoice._id);
  }

  editInvoice() {
    const { invoice, editInvoice } = this.props;
    editInvoice(invoice);
  }

  viewInvoice() {
    ipc.send('preview-invoice', this.props.invoice);
  }

  displayStatus() {
    const { invoice } = this.props;
    const { status } = invoice;
    const { recipient } = invoice;
    switch (status) {
      case 'cancelled': {
        return (
          <span>
            <i className="ion-backspace" />
            { this.props.translate(TRANSLATION_LABELS.INVOICE_STATUS_CANCELLED) }
          </span>
        );
      }

      case 'paid': {
        return (
          <span>
            <i className="ion-checkmark" />
            { this.props.translate(TRANSLATION_LABELS.INVOICE_STATUS_PAID) }
          </span>
        );
      }

      case 'refunded': {
        return (
          <span>
            <i className="ion-arrow-return-left" />
            { this.props.translate(TRANSLATION_LABELS.INVOICE_STATUS_REFUNDED) }
          </span>
        );
      }
      default: {
        return (
          <span>
            <i className="ion-loop" />
            { this.props.translate(TRANSLATION_LABELS.INVOICE_STATUS_PENDING) }
          </span>
        );
      }
    }
  }

  render() {
    const { invoice, setInvoiceStatus, dateFormat } = this.props;
    const { recipient, status } = invoice;
    const statusActions = [
      {
        label: 'Pending',
        action: () => setInvoiceStatus(invoice._id, 'pending'),
      },
      {
        label: 'Refunded',
        action: () => setInvoiceStatus(invoice._id, 'refunded'),
      },
      {
        label: 'Cancelled',
        action: () => setInvoiceStatus(invoice._id, 'cancelled'),
      },
    ];
    return (
      <div className="col-lg-6">
        <Wrapper>
          <StatusBar status={status} />
          <Header>
            <Status status={status}>{this.displayStatus()}</Status>
            <Button link onClick={this.deleteInvoice}>
              <i className="ion-trash-a" />
            </Button>
          </Header>
          <Body>
            <Row>
              <Field>
                <label>{ this.props.translate(TRANSLATION_LABELS.INVOICE_CLIENT) }</label>
                <h2>{recipient.fullname}</h2>
              </Field>
            </Row>
            <Row>
              <Field>
                <label>{ this.props.translate(TRANSLATION_LABELS.INVOICE_INVOICEID) }</label>
                <p>
                  {truncate(invoice._id, {
                    length: 8,
                    omission: '',
                  })}
                </p>
              </Field>
              <Field>
                <label>{ this.props.translate(TRANSLATION_LABELS.INVOICE_TOTAL_VALUE) }</label>
                <p>
                  {invoice.currency.code} {formatNumber(invoice.grandTotal)}
                </p>
              </Field>
            </Row>
            <Row>
              <Field>
                <label>{ this.props.translate(TRANSLATION_LABELS.INVOICE_CREATED_ON) }</label>
                <p>{format(invoice.created_at, dateFormat)}</p>
              </Field>
              <Field>
                <label>{ this.props.translate(TRANSLATION_LABELS.INVOICE_DUEDATE) }</label>
                <p>
                  {invoice.dueDate
                    ? moment(invoice.dueDate).format(dateFormat)
                    : '--'}
                </p>
              </Field>
            </Row>
          </Body>
          <Footer>
            <SplitButton
              mainButton={{
                label: this.props.translate(TRANSLATION_LABELS.INVOICE_MARKPAID),
                action: () => setInvoiceStatus(invoice._id, 'paid'),
              }}
              options={statusActions}
            />
            <Button onClick={this.editInvoice}>{ this.props.translate(TRANSLATION_LABELS.INVOICE_EDIT) }</Button>
            <Button onClick={this.viewInvoice}>{ this.props.translate(TRANSLATION_LABELS.INVOICE_VIEW) }</Button>
          </Footer>
        </Wrapper>
      </div>
    );
  }
}

Invoice.propTypes = {
  editInvoice: PropTypes.func.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  setInvoiceStatus: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

export default Invoice;
