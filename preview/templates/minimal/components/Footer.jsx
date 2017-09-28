// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${ props => props.left && `
    align-items: flex-start;
  `}
  ${ props => props.right && `
    align-items: flex-end;
  `}
`;

// Component
function Footer({invoice, company, configs}) {
  const { recipient } = invoice;
  return (
    <Wrapper>
      <Column left>
        <h4 className="label">{company.company}</h4>
        <p>{company.fullname}</p>
        <p>{company.address}</p>
        <p>{company.email}</p>
        <p>{company.phone}</p>
      </Column>
      {configs.showRecipient &&
        <Column right>
          <h4 className="label">Billed To</h4>
          <p>{recipient.company}</p>
          <p>{recipient.fullname}</p>
          <p>{recipient.email}</p>
          <p>{recipient.phone}</p>
        </Column>}
    </Wrapper>
  );
}

Footer.propTypes = {
  configs: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default Footer;
