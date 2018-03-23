// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const InvoiceFooter = styled.div `
  grid-column: 1 / 9;
  grid-row: 5;
  align-self: end;
`;

const InvoiceCompany = styled.div `
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  h1 {
 margin-bottom: -1em;
  }
`;

const ColumnLeft = styled.div `
  grid-column: 1 / 5;
`;

const ColumnRight = styled.div `
  grid-column: 6 / 9;
  align-self: end;
`;

// Component
function Footer({invoice, profile, configs}) {
  const {tax} = invoice;
  return (<InvoiceFooter>

    <InvoiceCompany>
      <ColumnLeft>
        <h1>{profile.fullname}</h1>
        <h2>{profile.phone}</h2>
        <h2>{profile.email}</h2>
      </ColumnLeft>
      <ColumnRight>
        <h1>{profile.company}</h1>
        <h2>{tax.tin}</h2>
        <h2>{profile.address}</h2>
        <h2>{profile.website}</h2>
      </ColumnRight>
    </InvoiceCompany>

  </InvoiceFooter>)
}

Footer.propTypes = {
  configs: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired
};

export default Footer;
