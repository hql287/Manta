// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

function Alignment({ t, alignItems, handleInputChange, UILang }) {
  return (
    <Section>
      <Label>{t('preview:sidebar:alignment:name', { lng: UILang })}</Label>
      <select name="alignItems" value={alignItems} onChange={handleInputChange}>
        <option value="top">{t('preview:sidebar:alignment:top')}</option>
        <option value="middle">
          {t('preview:sidebar:alignment:middle', { lng: UILang })}
        </option>
        <option value="bottom">
          {t('preview:sidebar:alignment:bottom', { lng: UILang })}
        </option>
      </select>
    </Section>
  );
}

Alignment.propTypes = {
  alignItems: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default Alignment;
