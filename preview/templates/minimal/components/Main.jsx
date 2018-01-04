// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';
import { formatNumber }  from '../../../../app/helpers/number';
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
  ${ props => props.alignItems && `
    justify-content: ${props.alignItems};
  `}

  th {
    font-weight: 500;
  }
`;

const ItemsHeader = styled.tr`
  display: flex;
  justify-content: space-between;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 0.8em;
  color: #2C323A;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ItemsList = styled.tbody`
  margin: 1.5em -2.5em;
  padding: 1em 2.5em;
  font-family: 'Lora', serif;
  font-size: .95em;
  color: #000000;
  background: #F9FAFA;
`;

const Item = styled.tr`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .7em 0;
  border-bottom: 2px dotted #D8D8D8;
  & :last-child {
    border-bottom: none;
  }
  td:last-child {
    color: #B4B7BA;
  }
`;

const InvoiceSummary = styled.tfoot`
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  font-size: 0.8em;
  color: #2C323A;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;

  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .65em 0;
    border-bottom: 2px solid #ECF1F1;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Subtotal = styled.tr``;
const Tax = styled.tr`
  color: #EC476E;
`;
const Discount = styled.tr`
  color: #469FE5;
`;
const Total = styled.tr`
  color: #6BBB69;
`;

function setAlignItems(configs) {
  let pos;
  switch(configs.alignItems) {
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
    const { invoice, configs } = this.props;
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    return invoice.discount
      ? (<Discount>
          <td>
            Discount
            { invoice.discount.type === 'percentage' &&
              <span>
                {' '}
                { invoice.discount.amount }%
              </span>}
          </td>
          <td>
            {currency} {formatNumber(getInvoiceValue(invoice).discount)}
          </td>
        </Discount>)
      : null;
  }

  displayTax() {
    const { invoice, configs } = this.props;
    const { tax } = invoice;
    const { taxAmount } = getInvoiceValue(invoice);
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;
    return tax
      ? (<Tax>
          <td>
            Tax
            {' '}
            {tax.amount}%
          </td>
          { tax.method === 'reverse'
            ? (<td>
                Reverse Charge
              </td>)
            : (<td>
                {currency} {formatNumber(taxAmount)}
              </td>)}
        </Tax>)
      : null;
  }

  render() {
    const {invoice, configs} = this.props;
    const currency = configs.useSymbol
      ? invoice.currency.symbol
      : invoice.currency.code;

    const itemComponents = invoice.rows.map((row, index) =>
      <Item key={index}>
        <td>
          { padStart(index+1, 2, 0) }. {row.description} ({formatNumber(row.quantity)})
        </td>
        <td>
          {currency} {formatNumber(row.subtotal)}
        </td>
      </Item>
    );

    return (
      <Table alignItems={setAlignItems(configs)}>
        <thead>
          <ItemsHeader>
            <th>Item Description</th>
            <th>Price</th>
          </ItemsHeader>
        </thead>

        <ItemsList>
          { itemComponents }
        </ItemsList>

        <InvoiceSummary>
          <Subtotal>
            <td>Subtotal</td>
            <td>
              {currency}
              {' '}
              {formatNumber(invoice.subtotal)}
            </td>
          </Subtotal>

          { this.displayDiscount() }
          { this.displayTax() }

          <Total>
            <td>Total</td>
            <td>
              {currency}
              {' '}
              {formatNumber(invoice.grandTotal)}
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
};

export default Main;
