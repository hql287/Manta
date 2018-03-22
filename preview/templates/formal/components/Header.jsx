// React Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
const moment = require('moment');
import { calTermDate } from '../../../../helpers/date';

// Styles
import styled from 'styled-components';

const InvoiceHeader = styled.div`
  grid-column: 1 / 9;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const InvoiceId = styled.div`
  grid-column: 1 / 6;
`;

const InvoiceDate = styled.div`
  grid-column: 6 / 9;
`;

const DueDate = styled.div`
  grid-column: 6 / 9;
  grid-row: 2;
`;

const InvoiceRecipient = styled.div`
  grid-column: 1 / 6;
  grid-row: 2;
`;

const RecipientName = styled.div`
`;

const RecipientInfo = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 1em;
`;

const Info = styled.div`
`;

// Component
function Header({ t, invoice, profile, configs }) {
  const { recipient } = invoice;
  const { language } = configs;
  return (
    <InvoiceHeader>

      <InvoiceId>
        <h2>{t('preview:common:invoice', { lng: language })}</h2>
        <h1 key="invoiceID">#{ invoice.invoiceID ? invoice.invoiceID : truncate(invoice._id, {length: 8, omission: '', })}</h1>
      </InvoiceId>

      <InvoiceDate>
        <h2>{t('preview:common:created', {lng: language})}:</h2>
        <h1 key="created_at">{' '}
          {moment(invoice.created_at)
            .lang(language)
            .format(configs.dateFormat)}</h1>
      </InvoiceDate>

      <DueDate>
        {invoice.dueDate && [
          <h2 key="dueDate">{t('preview:common:due', { lng: language })}:</h2>,
          <h1 key="paymentTerm">{' '}
            {invoice.dueDate.useCustom
              ? moment(invoice.dueDate.selectedDate)
                  .lang(language)
                  .format(configs.dateFormat)
              : moment(
                  calTermDate(invoice.created_at, invoice.dueDate.paymentTerm)
                )
                  .lang(language)
                  .format(configs.dateFormat)}
          </h1>,
          <h2 key="dueDateNote">
            {!invoice.dueDate.useCustom &&`

              ${t(
                `form:fields:dueDate:paymentTerms:${
                  invoice.dueDate.paymentTerm
                }:description`
              )}

            `}
          </h2>
          ]}
      </DueDate>

      <InvoiceRecipient>
        {configs.showRecipient && (
          <RecipientName>
            <h2> {t('preview:common:billedTo', { lng: language })}</h2>
            <h1 key="company"> {recipient.company} </h1>
            <RecipientInfo>
              <Info>
                <h2> {recipient.fullname} </h2>
                <h2> {recipient.email} </h2>
                <h2> {recipient.phone} </h2>
              </Info>
            </RecipientInfo>
          </RecipientName>
        )}
  		</InvoiceRecipient>
    </InvoiceHeader>
  );
}

Header.propTypes = {
  profile: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Header;
