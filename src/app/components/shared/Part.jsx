// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const PartStyle = styled.div`
  padding: 20px 20px 10px 20px;
  background: #f9fafa;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f2f3f4;
`;

const RowStyle = styled.div`
  display: flex;
  margin: 0 -15px;
`;

const FieldStyle = styled.div`
  flex: 1;
  margin: 0 15px 20px 15px;
`;

const HeaderStyle = styled.h2``;


// Components
export const Part = props => <PartStyle>{props.children}</PartStyle>;
export const Header = props => <HeaderStyle>{props.children}</HeaderStyle>;
export const Field = props => <FieldStyle>{props.children}</FieldStyle>;
export const Row = props => <RowStyle>{props.children}</RowStyle>;
