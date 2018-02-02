// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import { Section, Label } from '../shared';

function Template({ t, template, handleInputChange }) {
  return (
    <Section>
      <Label>{t('preview:sidebar:template')}</Label>
      <select name="template" value={template} onChange={handleInputChange}>
        <option value="minimal">Minimal</option>
        <option value="business">Business</option>
      </select>
    </Section>
  );
}

Template.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  template: PropTypes.string.isRequired,
};

export default Template;
