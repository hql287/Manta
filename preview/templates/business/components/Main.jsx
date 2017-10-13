// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

import {formatNumber} from '../../../../app/helpers/number';

// Styles
import styled from 'styled-components';

const InvoiceContent = styled.div`
  flex: 1;
  display: flex;
  ${props => props.alignItems && `
    align-items: ${props.alignItems};
  `} margin-top: 3em;
  margin-bottom: 3em;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    border-bottom: 4px solid #efefd1;
    padding-bottom: 0.8em;
  }
  ${props => props.accentColor.useCustom && `
    th { border-bottom: 4px solid ${props.accentColor.color};}
  `};
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
    &:first-child {
      border: none;
    }
  }

  ${props => props.accentColor.useCustom && `
    td {
      border-top: 4px solid ${props.accentColor.color};
    }
  `};
`;

const InvoiceDiscount = styled.tr`
  td:last-child {
    color: #6bbb69;
  }
`;

const InvoiceVat = styled.tr`
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
function Main({invoice, configs}) {
  const currency = configs.useSymbol
    ? invoice.currency.symbol
    : invoice.currency.code;
  const itemComponents = invoice.rows.map((row, index) => (
    <tr key={index}>
      <td className="w5">{index + 1}.</td>
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
            <th className="w5">No</th>
            <th>Description</th>
            <th className="w15">Price</th>
            <th className="w10">Qty</th>
            <th className="w15">Subtotal</th>
          </tr>
        </thead>

        <tbody>{itemComponents}</tbody>

        <tfoot>
          <tr className="invoice__subtotal">
            <td colSpan="2" />
            <td className="label" colSpan="2">
              Subtotal
            </td>
            <td>
              {currency} {formatNumber(invoice.subtotal)}
            </td>
          </tr>

          {invoice.discount && (
            <InvoiceDiscount>
              <td colSpan="2" />
              <td className="label" colSpan="2">
                Discount
              </td>
              <td>
                {invoice.discount.type === 'flat' ? currency : '%'}{' '}
                {formatNumber(invoice.discount.amount)}
              </td>
            </InvoiceDiscount>
          )}

          {invoice.vat && (
            <InvoiceVat>
              <td colSpan="2" />
              <td className="label" colSpan="2">
                Vat
              </td>
              <td>% {invoice.vat}</td>
            </InvoiceVat>
          )}

          <InvoiceTotal accentColor={configs.accentColor}>
            <td colSpan="2" />
            <td className="label">Total</td>
            <td colSpan="2">
              {currency} {formatNumber(invoice.grandTotal)}
            </td>
          </InvoiceTotal>
        </tfoot>
      </Table>
    </InvoiceContent>
  );
}

Main.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default Main;
