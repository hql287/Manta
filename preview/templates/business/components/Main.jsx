// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';
import { formatNumber } from '../../../../app/helpers/number';
import { getInvoiceValue } from '../../../../app/helpers/invoice';

// Styles
import styled from 'styled-components';

const InvoiceContent = styled.div`
  flex: 1;
  display: flex;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  ${props =>
    props.alignItems &&
    `
    align-items: ${props.alignItems};
  `};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    border-bottom: 4px solid #efefd1;
    padding-bottom: 0.8em;
    &:last-child {
      text-align: right;
    }
  }
  ${props =>
    props.accentColor.useCustom &&
    `
    th { border-bottom: 4px solid ${props.accentColor.color};}
  `};
  tr > td:last-child {
    text-align: right;
  }
  td {
    color: #2c323a;
    font-weight: 300;
    line-height: 2.75;
    font-size: 0.7em;
    border-bottom: 2px solid #ecf1f1;
    &:first-child {
      color: #c4c8cc;
    }
  }
  tfoot {
    td {
      font-weight: 400;
      &:first-child {
        border: none;
      }
    }
  }
`;

const InvoiceTotal = styled.tr`
  font-size: 1.5em;
  td {
    border-bottom: none;
    line-height: 2;
    border-top: 4px solid #efefd1;
    color: #6bbb69;
    &:first-child {
      border: none;
    }
  }

  ${props =>
    props.accentColor.useCustom &&
    `
    td {
      border-top: 4px solid ${props.accentColor.color};
    }
  `};
`;

const InvoiceDiscount = styled.tr`
  td:last-child {
    color: #469fe5;
  }
`;

const InvoiceTax = styled.tr`
  td:last-child {
    color: #ec476e;
  }
`;

function setAlignItems(configs) {
  let pos;
  switch (configs.alignItems) {
    case 'top': {
      pos = 'flex-start';
      break;
    }
    case 'bottom': {
      pos = 'flex-end';
      break;
    }
    default: {
      pos = 'center';
      break;
    }
  }
  return pos;
}

// Component
class Main extends Component {
  constructor(props) {
    super(props);
    this.displayTax = this.displayTax.bind(this);
    this.displayDiscount = this.displayDiscount.bind(this);
  }

  displayDiscount() {
    const { t, invoice, configs } = this.props;
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    return invoice.discount ? (
      <InvoiceDiscount>
        <td colSpan="2" />
        <td className="label" colSpan="2">
          { t('form:fields:discount:name') }{' '}
          {invoice.discount.type === 'percentage' && (
            <span> {invoice.discount.amount}%</span>
          )}
        </td>
        <td>
          {currency} {formatNumber(getInvoiceValue(invoice).discount)}
        </td>
      </InvoiceDiscount>
    ) : null;
  }

  displayTax() {
    const { t, invoice, configs } = this.props;
    const { tax } = invoice;
    const { taxAmount } = getInvoiceValue(invoice);
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    return tax ? (
      <InvoiceTax>
        <td colSpan="2" />
        <td className="label" colSpan={tax.method === 'reverse' ? 1 : 2}>
          { t('form:fields:tax:name') }{' '}{tax.amount}%
        </td>
        {tax.method === 'reverse' ? (
          <td className="label" colSpan={tax.method === 'reverse' ? 2 : 1}>
            {t('form:fields:tax:reverse')}
          </td>
        ) : (
          <td>
            {currency} {formatNumber(taxAmount)}
          </td>
        )}
      </InvoiceTax>
    ) : null;
  }

  render() {
    const { t, invoice, configs } = this.props;
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    const itemComponents = invoice.rows.map((row, index) => (
      <tr key={index}>
        <td className="w5">{padStart(index + 1, 2, 0)}.</td>
        <td>{row.description}</td>
        <td className="w15">
          {currency} {formatNumber(row.price)}
        </td>
        <td className="w10">{formatNumber(row.quantity)}</td>
        <td className="w15">
          {currency} {formatNumber(row.subtotal)}
        </td>
      </tr>
    ));

    return (
      <InvoiceContent alignItems={setAlignItems(configs)}>
        <Table accentColor={configs.accentColor}>
          <thead>
            <tr>
              <th className="w5">{t('preview:common:order')}</th>
              <th>{t('preview:common:itemDescription')}</th>
              <th className="w15">{t('preview:common:price')}</th>
              <th className="w10">{t('preview:common:qty')}</th>
              <th className="w15">{t('preview:common:subtotal')}</th>
            </tr>
          </thead>
          <tbody>{itemComponents}</tbody>
          <tfoot>
            <tr className="invoice__subtotal">
              <td colSpan="2" />
              <td className="label" colSpan="2">
                {t('preview:common:subtotal')}
              </td>
              <td>
                {currency} {formatNumber(invoice.subtotal)}
              </td>
            </tr>

            {this.displayDiscount()}
            {this.displayTax()}

            <InvoiceTotal accentColor={configs.accentColor}>
              <td colSpan="2" />
              <td className="label">
                {t('preview:common:total')}
              </td>
              <td colSpan="2">
                {currency} {formatNumber(invoice.grandTotal)}
              </td>
            </InvoiceTotal>
          </tfoot>
        </Table>
      </InvoiceContent>
    );
  }
}

Main.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
