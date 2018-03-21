// Libs
import React from 'react';

import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: flex-end;
  align-items: flex-start;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4f555c;
`;

const Range = styled.input`
  width: 100%;
  -webkit-app-region: no-drag;
`;

export { Section, Label, Range };
