// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const SectionStyle = styled.div`
  position: relative;
  display: block;
  margin-bottom: 30px;
  padding: 0 40px;
`;

// Components
export const Section = props =>
  <SectionStyle>
    { props.children }
  </SectionStyle>;

