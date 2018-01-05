// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

function Toggler({ configs, handleInputChange }) {
  const { showLogo, useSymbol, showRecipient } = configs;
  return (
    <Section>
      <Label>Toggle</Label>
      <label>
        <input
          name="showLogo"
          type="checkbox"
          checked={showLogo}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        Logo
      </label>
      <label>
        <input
          name="useSymbol"
          type="checkbox"
          checked={useSymbol}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        Symbols
      </label>
      <label>
        <input
          name="showRecipient"
          type="checkbox"
          checked={showRecipient}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        Recipient
      </label>
    </Section>
  );
}

Toggler.propTypes = {
  configs: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Toggler;
