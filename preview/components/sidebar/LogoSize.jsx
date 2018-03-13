// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label, Range } from '../shared';

function LogoSize({ t, logoSize, handleInputChange, UILang }) {
  return (
    <Section>
      <Label>
        {t('preview:sidebar:logoSize', { lng: UILang })}
      </Label>
      <Range
        name="logoSize"
        type="range"
        min="5"
        max="50"
        step="2.5"
        value={logoSize}
        onChange={handleInputChange}
      />
    </Section>
  );
}

LogoSize.propTypes = {
  logoSize: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default LogoSize;
