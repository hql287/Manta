// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

function Alignment({ t, alignItems, handleInputChange }) {
  return (
    <Section>
      <Label>{t('preview:sidebar:alignment:name')}</Label>
      <select name="alignItems" value={alignItems} onChange={handleInputChange}>
        <option value="top">{t('preview:sidebar:alignment:top')}</option>
        <option value="middle">{t('preview:sidebar:alignment:middle')}</option>
        <option value="bottom">{t('preview:sidebar:alignment:bottom')}</option>
      </select>
    </Section>
  );
}

Alignment.propTypes = {
  alignItems: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Alignment;
