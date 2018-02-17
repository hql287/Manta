// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label, Range } from '../shared';

function FontSize({ t, fontSize, handleInputChange, UILang }) {
  return (
    <Section>
      <Label>
        {t('preview:sidebar:fontSize', { lng: UILang })}
      </Label>
      <Range
        name="fontSize"
        type="range"
        min="100"
        max="500"
        step="100"
        value={fontSize}
        onChange={handleInputChange}
      />
    </Section>
  );
}

FontSize.propTypes = {
  fontSize: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default FontSize;
