// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

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
  font-family: 'Source Serif Pro', serif;
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
    padding: .65em 0;
    border-bottom: 2px solid #ECF1F1;
    &:last-child {
      border-bottom: none;
    }
  }
  .invoice__subtotal { }
  .invoice__vat      { }
  .invoice__discount { color: #EC476E; }
  .invoice__total    { color: #6BBB69; }
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
function Main({invoice, configs}) {

  const currency = configs.useSymbol
    ? invoice.currency.symbol
    : invoice.currency.code;

  const itemComponents = invoice.rows.map((row, index) =>
    <Item key={index}>
      <td>
        { index + 1 }. {row.description} ({row.quantity})
      </td>
      <td>
        {currency} {row.subtotal}
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
        <tr className="invoice__subtotal">
          <td>Subtotal</td>
          <td>
            {currency}
            {' '}
            {invoice.subtotal}
          </td>
        </tr>
        { invoice.discount &&
          <tr className="invoice__discount">
            <td>Discount</td>
            <td>
              {invoice.discount.type === 'flat' ? currency : '%'}
              {' '}
              {invoice.discount.amount}
            </td>
          </tr>
        }
        { invoice.vat &&
          <tr className="invoice__vat">
            <td>Vat</td>
            <td>% {invoice.vat}</td>
          </tr>
        }
        <tr className="invoice__total">
          <td>Total</td>
          <td>
            {currency}
            {' '}
            {invoice.grandTotal}
          </td>
        </tr>
      </InvoiceSummary>
    </Table>
  );
}

Main.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default Main;
