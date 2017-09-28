// Libs
import React from 'react';
import PropTypes from 'prop-types';
import ColorPicker from '../components/ColorPicker';

// Styling
import styled from 'styled-components';
const Wrapper = styled.div`
  flex: 1;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4F555C;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Range = styled.input`
  width: 100%;
  -webkit-app-region: no-drag;
`;

function TemplateConfigs({configs, updateConfigs, updateAccentColor}) {
  return (
    <Wrapper>
      <Section>
        <Label>Align Items</Label>
        <select
          name="alignItems"
          value={configs.alignItems}
          onChange={updateConfigs}>
          <option value="top">Top</option>
          <option value="middle">Middle</option>
          <option value="bottom">Bottom</option>
        </select>
      </Section>

      <Section>
        <Label>Accent Color</Label>
        <ColorPicker
          name="accentColor"
          accentColor={configs.accentColor}
          updateAccentColor={updateAccentColor}
        />
      </Section>

      <Section>
        <Label>Font Size</Label>
        <Range
          name="fontSize"
          type="range"
          min="100"
          max="300"
          step="100"
          value={configs.fontSize}
          onChange={updateConfigs}
        />
      </Section>

      <Section>
        <Label>Toggle</Label>

        <label>
          <input
            name="showLogo"
            type="checkbox"
            checked={configs.showLogo}
            onChange={updateConfigs}
          />
          {'\u00A0'}
          Logo
        </label>

        <label>
          <input
            name="useSymbol"
            type="checkbox"
            checked={configs.useSymbol}
            onChange={updateConfigs}
          />
          {'\u00A0'}
          Symbols
        </label>

        <label>
          <input
            name="showRecipient"
            type="checkbox"
            checked={configs.showRecipient}
            onChange={updateConfigs}
          />
          {'\u00A0'}
          Recipient
        </label>
      </Section>
    </Wrapper>
  );
}

TemplateConfigs.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
  updateAccentColor: PropTypes.func.isRequired,
};

export default TemplateConfigs;
