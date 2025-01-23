// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

function Toggler({ t, configs, handleInputChange, UILang }) {
  const { showLogo, useSymbol, showRecipient, customAccentColor } = configs;
  return (
    <Section>
      <Label>
        { t('preview:sidebar:toggle:name', { lng: UILang }) }
      </Label>
      <label>
        <input
          name="showLogo"
          type="checkbox"
          checked={showLogo}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:toggle:logo', { lng: UILang }) }
      </label>
      <label>
        <input
          name="useSymbol"
          type="checkbox"
          checked={useSymbol}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:toggle:symbol', { lng: UILang }) }
      </label>
      <label>
        <input
          name="showRecipient"
          type="checkbox"
          checked={showRecipient}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:toggle:recipient', { lng: UILang }) }
      </label>
      <label>
        <input
          name="customAccentColor"
          type="checkbox"
          checked={customAccentColor}
          onChange={handleInputChange}
        />
        {'\u00A0'}
        { t('preview:sidebar:accentColor:name', { lng: UILang }) }
      </label>
    </Section>
  );
}

Toggler.propTypes = {
  configs: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default Toggler;
