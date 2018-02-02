// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';
import { formatNumber } from '../../../../app/helpers/number';
import { getInvoiceValue } from '../../../../app/helpers/invoice';

// Styles
import styled from 'styled-components';

const Table = styled.table`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  ${props =>
    props.alignItems &&
    `
    justify-content: ${props.alignItems};
  `} th {
    font-weight: 500;
  }
`;

const ItemsHeader = styled.tr`
  display: flex;
  justify-content: space-between;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.8em;
  color: #2c323a;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ItemsList = styled.tbody`
  margin: 1.5em -2.5em;
  padding: 1em 2.5em;
  font-family: 'Lora', serif;
  font-size: 0.95em;
  color: #000000;
  background: #f9fafa;
`;

const Item = styled.tr`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em 0;
  border-bottom: 2px dotted #d8d8d8;
  & :last-child {
    border-bottom: none;
  }
  td:last-child {
    color: #b4b7ba;
  }
`;

const InvoiceSummary = styled.tfoot`
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  font-size: 0.8em;
  color: #2c323a;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;

  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.65em 0;
    border-bottom: 2px solid #ecf1f1;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Subtotal = styled.tr``;
const Tax = styled.tr`
  color: #ec476e;
`;
const Discount = styled.tr`
  color: #469fe5;
`;
const Total = styled.tr`
  color: #6bbb69;
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
    const { invoice, configs, t } = this.props;
    const currencyBefore = configs.currencyPlacement === 'before';
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    return invoice.discount ? (
      <Discount>
        <td>
          { t('form:fields:discount:name') }
          {' '}
          {invoice.discount.type === 'percentage' && (
            <span> {invoice.discount.amount}%</span>
          )}
        </td>
        <td>
          {currencyBefore ? currency : ''} {formatNumber(getInvoiceValue(invoice).discount)} {currencyBefore ? '' : currency}
        </td>
      </Discount>
    ) : null;
  }

  displayTax() {
    const { t, invoice, configs } = this.props;
    const { tax } = invoice;
    const { taxAmount } = getInvoiceValue(invoice);
    const currencyBefore = configs.currencyPlacement === 'before';
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    return tax ? (
      <Tax>
        <td>
          { t('form:fields:tax:name') }{' '}{tax.amount}%
        </td>
        {tax.method === 'reverse' ? (
          <td>{t('form:fields:tax:reverse')}</td>
        ) : (
          <td>
            {currencyBefore ? currency : ''} {formatNumber(taxAmount)} {currencyBefore ? '' : currency}
          </td>
        )}
      </Tax>
    ) : null;
  }

  render() {
    const { invoice, configs, t } = this.props;
    const currencyBefore = configs.currencyPlacement === 'before';
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;

    const itemComponents = invoice.rows.map((row, index) => (
      <Item key={index}>
        <td>
          {padStart(index + 1, 2, 0)}. {row.description} ({formatNumber(
            row.quantity
          )})
        </td>
        <td>
          {currencyBefore ? currency : ''} {formatNumber(row.subtotal)} {currencyBefore ? '' : currency}
        </td>
      </Item>
    ));

    return (
      <Table alignItems={setAlignItems(configs)}>
        <thead>
          <ItemsHeader>
            <th>{t('preview:common:itemDescription')}</th>
            <th>{t('preview:common:price')}</th>
          </ItemsHeader>
        </thead>

        <ItemsList>{itemComponents}</ItemsList>

        <InvoiceSummary>
          <Subtotal>
            <td>{t('preview:common:subtotal')}</td>
            <td>
              {currencyBefore ? currency : ''} {formatNumber(invoice.subtotal)} {currencyBefore ? '' : currency}
            </td>
          </Subtotal>

          {this.displayDiscount()}
          {this.displayTax()}

          <Total>
            <td>{t('preview:common:total')}</td>
            <td>
              {currencyBefore ? currency : ''} {formatNumber(invoice.grandTotal)} {currencyBefore ? '' : currency}
            </td>
          </Total>
        </InvoiceSummary>
      </Table>
    );
  }
}

Main.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
