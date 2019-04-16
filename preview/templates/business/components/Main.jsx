// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';
import { formatNumber } from '../../../../helpers/formatNumber';
import { getInvoiceValue } from '../../../../app/helpers/invoice';
import currencies from '../../../../libs/currencies.json';
import ReactMarkdown from 'react-markdown'

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
    props.customAccentColor &&
    `
    th { border-bottom: 4px solid ${props.accentColor};}
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

const MarkDownDescription = styled(ReactMarkdown)`
    color: #2c323a;
    font-weight: 300;
    line-height: 1.8;
    font-size: 0.7em;
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
    props.customAccentColor &&
    `
    td {
      border-top: 4px solid ${props.accentColor};
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
function Main({ invoice, configs, t }) {
  // Set language
  const { language, accentColor, customAccentColor  } = configs;
  // Others
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
      <tr key={index}>
        <td className="w5" />
        <MarkDownDescription source={row.description} />
        <td className="w15" />
        <td className="w10" />
        <td className="w15" />
      </tr>)
    :
      (
        <tr key={index}>
          <td className="w5">{padStart(index + 1, 2, 0)}.</td>
          <td>{row.description}</td>
          <td className="w15">
            {currencyBefore ? currency : null}{' '}
            {formatNumber(row.price, fraction, separator)}{' '}
            {currencyBefore ? null : currency}
          </td>
          <td className="w10">{row.quantity}</td>
          <td className="w15">
            {currencyBefore ? currency : null}{' '}
            {formatNumber(row.subtotal, fraction, separator)}{' '}
            {currencyBefore ? null : currency}
          </td>
        </tr>
      )
  ));

  return (
    <InvoiceContent alignItems={setAlignItems(configs)}>
      <Table
        accentColor={accentColor}
        customAccentColor={customAccentColor}
      >
        <thead>
          <tr>
            <th className="w5">{t('preview:common:order', {lng: language})}</th>
            <th>{t('preview:common:itemDescription', {lng: language})}</th>
            <th className="w15">{t('preview:common:price', {lng: language})}</th>
            <th className="w10">{t('preview:common:qty', {lng: language})}</th>
            <th className="w15">{t('preview:common:subtotal', {lng: language})}</th>
          </tr>
        </thead>
        <tbody>{itemComponents}</tbody>
        <tfoot>
          <tr className="invoice__subtotal">
            <td colSpan="2" />
            <td className="label" colSpan="2">
              {t('preview:common:subtotal', {lng: language})}
            </td>
            <td>
              {currencyBefore ? currency : null}
              {' '}
              {formatNumber(invoice.subtotal, fraction, separator)}
              {' '}
              {currencyBefore ? null : currency}
            </td>
          </tr>

          {discount && (
            <InvoiceDiscount>
              <td colSpan="2" />
              <td className="label" colSpan="2">
                {t('form:fields:discount:name', {lng: language})}{' '}
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
            </InvoiceDiscount>
          )}

          {tax && (
            <InvoiceTax>
              <td colSpan="2" />
              <td className="label" colSpan={tax.method === 'reverse' ? 1 : 2}>
                {t('form:fields:tax:name', {lng: language})} {tax.amount}%
              </td>
              {tax.method === 'reverse' ? (
                <td
                  className="label"
                  colSpan={tax.method === 'reverse' ? 2 : 1}
                >
                  {t('form:fields:tax:reverse', {lng: language})}
                </td>
              ) : (
                <td>
                  {currencyBefore ? currency : null}{' '}
                  {formatNumber(getInvoiceValue(invoice).taxAmount, fraction, separator)}{' '}
                  {currencyBefore ? null : currency}
                </td>
              )}
            </InvoiceTax>
          )}

          <InvoiceTotal
            accentColor={accentColor}
            customAccentColor={customAccentColor}
          >
            <td colSpan="2" />
            <td className="label">{t('preview:common:total', {lng: language})}</td>
            <td colSpan="2">
              {currencyBefore ? currency : null}
              {' '}
              {formatNumber(invoice.grandTotal, fraction, separator)}
              {' '}
              {currencyBefore ? null : currency}
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
  t: PropTypes.func.isRequired,
};

export default Main;
