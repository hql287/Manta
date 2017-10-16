// Libs
import React from 'react';

import styled from 'styled-components';
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4F555C;
`;

const Range = styled.input`
  width: 100%;
  -webkit-app-region: no-drag;
`;

export {
  Section,
  Label,
  Range,
};
