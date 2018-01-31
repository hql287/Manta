// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

function Toggler({ t, configs, handleInputChange }) {
  const { showLogo, useSymbol, showRecipient } = configs;
  return (
    <Section>
      <Label>{ t('preview:sidebar:toggler:name') }</Label>
      <label>
        <input
          name="showLogo"
          type="checkbox"
          checked={showLogo}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:toggler:logo') }
      </label>
      <label>
        <input
          name="useSymbol"
          type="checkbox"
          checked={useSymbol}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:toggler:symbol') }
      </label>
      <label>
        <input
          name="showRecipient"
          type="checkbox"
          checked={showRecipient}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:toggler:recipient') }
      </label>
    </Section>
  );
}

Toggler.propTypes = {
  configs: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Toggler;
