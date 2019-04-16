// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';
import { formatNumber } from '../../../../helpers/formatNumber';
import { getInvoiceValue } from '../../../../app/helpers/invoice';
import currencies from '../../../../libs/currencies.json';

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
function Main({ invoice, configs, t }) {
  // Get currentLanguage
  const currentLanguage = configs.language;
  // Destructuring values
  const { tax, discount } = invoice;
  const { code, placement, fraction, separator } = invoice.currency;
  // Set placement
  const currencyBefore = placement === 'before';
  // Set Currency Sign
  const currency = configs.useSymbol ? currencies[code].symbol : code;
  // Render Items
  const itemComponents = invoice.rows.map((row, index) => (
    (row.price === undefined || row.quantity === undefined) ?
    (
      <Item key={index}>
        <td>{row.description}</td>
      </Item>
    )
      :
      <Item key={index}>
        <td>
          {padStart(index + 1, 2, 0)}
          {'. '}
          {row.description} ({row.quantity})
        </td>
        <td>
          {currencyBefore ? currency : null}{' '}
          {formatNumber(row.subtotal, fraction, separator)}{' '}
          {currencyBefore ? null : currency}
        </td>
      </Item>
  ));

  return (
    <Table alignItems={setAlignItems(configs)}>
      <thead>
        <ItemsHeader>
          <th>{t('preview:common:itemDescription', {lng: currentLanguage})}</th>
          <th>{t('preview:common:price', {lng: currentLanguage})}</th>
        </ItemsHeader>
      </thead>

      <ItemsList>{itemComponents}</ItemsList>

      <InvoiceSummary>
        <Subtotal>
          <td>{t('preview:common:subtotal', {lng: currentLanguage})}</td>
          <td>
            {currencyBefore ? currency : null}
            {' '}
            {formatNumber(invoice.subtotal, fraction, separator)}
            {' '}
            {currencyBefore ? null : currency}
          </td>
        </Subtotal>

        {tax && (
          <Tax>
            <td>
              {t('form:fields:tax:name', {lng: currentLanguage})} {tax.amount}%
            </td>
            {tax.method === 'reverse' ? (
              <td>{t('form:fields:tax:reverse', {lng: currentLanguage})}</td>
            ) : (
              <td>
                {currencyBefore ? currency : null}{' '}
                {formatNumber(
                  getInvoiceValue(invoice).taxAmount,
                  fraction,
                  separator
                )}{' '}
                {currencyBefore ? null : currency}
              </td>
            )}
          </Tax>
        )}

        {discount && (
          <Discount>
            <td>
              {t('form:fields:discount:name', {lng: currentLanguage})}{' '}
              {discount.type === 'percentage' && (
                <span> {discount.amount}%</span>
              )}
            </td>
            <td>
              {currencyBefore ? currency : null}{' '}
              {formatNumber(
                getInvoiceValue(invoice).discount,
                fraction,
                separator
              )}{' '}
              {currencyBefore ? null : currency}
            </td>
          </Discount>
        )}

        <Total>
          <td>{t('preview:common:total', {lng: currentLanguage})}</td>
          <td>
            {currencyBefore ? currency : null}
            {' '}
            {formatNumber(invoice.grandTotal, fraction, separator)}
            {' '}
            {currencyBefore ? null : currency}
          </td>
        </Total>
      </InvoiceSummary>
    </Table>
  );
}

Main.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Main;
