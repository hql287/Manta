// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { padStart } from 'lodash';
import { formatNumber } from '../../../../helpers/formatNumber';
import { getInvoiceValue } from '../../../../app/helpers/invoice';
import currencies from '../../../../libs/currencies.json';

// Styles
import styled from 'styled-components';

const InvoiceContent = styled.div`
	grid-column: 1 / 9;
	grid-row: 3 / 4;
  ${props => props.alignItems && `
    align-self: ${props.alignItems};
  `};
  .w1 {
    width: 12.5%;
  }
`;

const Table = styled.table `
  width: 100%;
  border-collapse: collapse;

	th {
		padding-top: 1em;
			text-align: left;
      &:last-child {
        text-align: right;
      }
		}

  td {
		padding-top: 1em;
		padding-bottom: 1em;
      &:last-child {
        text-align: right;
      }
    }

  thead tr {
			border-bottom: 2px solid #212529;
		}
    ${props =>
      props.customAccentColor && `
      thead tr { border-bottom: 2px solid ${props.accentColor};}
    `};

  tbody tr {
			border-bottom: 1px solid #212529;
		}
    ${props =>
      props.customAccentColor && `
      tbody tr, p { border-bottom: 1px solid ${props.accentColor};}
    `};

	tbody tr td:first-child {
		padding-right: 1em;
	}

  tfoot th,
  td:last-child {
    border-top: 1px solid #212529;
  }
    ${props =>
      props.customAccentColor && `
      tfoot th,
      td:last-child { border-top: 1px solid ${props.accentColor};}
    `};

  tfoot tr:last-child th {
    border-top: 2px solid #212529;
  }
    ${props =>
      props.customAccentColor && `
      tfoot tr:last-child th { border-top: 2px solid ${props.accentColor};}
    `};

  tfoot tr:last-child td:last-child {
    border-top: 2px solid #212529;
  }
    ${props =>
      props.customAccentColor && `
      tfoot tr:last-child td:last-child { border-top: 2px solid ${props.accentColor};}
    `};
`;

const InvoiceTotal = styled.tr `
`;

const InvoiceDiscount = styled.tr `
`;

const InvoiceTax = styled.tr `
`;

function setAlignItems(configs) {
  let pos;
  switch (configs.alignItems) {
    case 'top': {
        pos = 'start';
        break;
      }
    case 'bottom': {
        pos = 'end';
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
		<tr key={index}>
			<td colSpan="2">{row.description}</td>
			<td className="w1">
				{currencyBefore ? currency : null}{' '}
				{formatNumber(row.price, fraction, separator)}{' '}
				{currencyBefore ? null : currency}
			</td>
			<td className="w1">{formatNumber(row.quantity, 0, separator)}</td>
			<td className="w1">
				{currencyBefore ? currency : null}{' '}
				{formatNumber(row.subtotal, fraction, separator)}{' '}
				{currencyBefore ? null : currency}
			</td>
		</tr>
  ));

  return (
    <InvoiceContent alignItems={setAlignItems(configs)}>
      <Table accentColor={accentColor} customAccentColor={customAccentColor}>
        <thead>
          <tr>
            <th colSpan="2">{t('preview:common:itemDescription', {lng: language})}</th>
            <th className="w1">{t('preview:common:price', {lng: language})}</th>
            <th className="w1">{t('preview:common:qty', {lng: language})}</th>
            <th className="w1">{t('preview:common:subtotal', {lng: language})}</th>
          </tr>
        </thead>

        <tbody>{itemComponents}</tbody>

        <tfoot>
          <tr>
            <td colSpan="2"> </td>
            <th colSpan="2"> {t('preview:common:subtotal', {lng: language})}</th>
            <td colSpan="2">
              {currencyBefore ? currency : null}
              {' '}
              {formatNumber(invoice.subtotal, fraction, separator)}
              {' '}
              {currencyBefore ? null : currency}
            </td>
          </tr>

          {discount && (
            <InvoiceDiscount>
              <td colSpan="2"> </td>
              <th colSpan="2">
                {t('form:fields:discount:name', {lng: language})}{' '}
                {discount.type === 'percentage' && (
                  <span> {discount.amount}% </span>
                )}
              </th>
              <td colSpan="2">
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
              <td colSpan="2"> </td>
              <th colSpan={tax.method === 'reverse' ? 1 : 2}>
                {t('form:fields:tax:name', {lng: language})} {tax.amount}%
              </th>
              {tax.method === 'reverse' ? (
                <td colSpan={tax.method === 'reverse' ? 2 : 1}>
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
            <td colSpan="2"> </td>
            <th colSpan="2"> {t('preview:common:total', {lng: language})}</th>
            <td>
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
