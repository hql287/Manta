// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const InvoiceNote = styled.div`
  grid-column: 1 / 9;
  grid-row: 4;
  h1 {
    border-bottom: 2px solid #212529;
  }
  ${props =>
    props.customAccentColor && `
    h1 { border-bottom: 2px solid ${props.accentColor};}
    `};

  h2 {
    padding-top: 1em;
  }

`;

// Component
function Note({t, invoice, configs}) {
  const { language, accentColor, customAccentColor  } = configs;
  return invoice.note ? (
    <InvoiceNote
      accentColor={accentColor}
      customAccentColor={customAccentColor}
      >
      <h1>{t('preview:common:notice', {lng: language})}</h1>
      <h2>{invoice.note}</h2>
    </InvoiceNote>
  ) : null;
}

Note.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default Note;
