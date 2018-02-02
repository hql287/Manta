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

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  a {
    font-size: 14px;
    line-height: 12px;
    // margin-bottom: 20px;
    margin-left: 10px;
  }
`;

// Components
export const Section = props => <SectionStyle>{props.children}</SectionStyle>;
export const Header = props => <HeaderStyle>{props.children}</HeaderStyle>;
