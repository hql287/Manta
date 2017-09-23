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

function TemplateConfigs({configs, updateConfigs}) {
  return (
    <Wrapper>
      <Label>Show Logo</Label>
      <label className="switch">
        <input
          name="showLogo"
          type="checkbox"
          checked={configs.showLogo}
          onChange={updateConfigs}
        />
        <span className="slider round"></span>
      </label>
    </Wrapper>
  );
}

TemplateConfigs.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
};

export default TemplateConfigs;
