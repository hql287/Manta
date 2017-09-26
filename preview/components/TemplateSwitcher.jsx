// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import styled from 'styled-components';
const Wrapper = styled.div``;
const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4F555C;
`;
const Select = styled.select`
  width: 150px;
  height: 24px;
  margin-right: 20px;
`;

function TemplateSwitcher({template, changeTemplate}) {
  return (
    <Wrapper>
      <Label>Template</Label>
      <select
        name="template"
        value={template}
        onChange={changeTemplate}>
        <option value="copywriter">Copywriter</option>
        <option value="marketing">Marketing</option>
      </select>
    </Wrapper>
  );
}

TemplateSwitcher.propTypes = {
  changeTemplate: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
};

export default TemplateSwitcher;
