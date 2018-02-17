// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import { Section, Label } from '../shared';

function Template({ t, template, handleInputChange, UILang }) {
  return (
    <Section>
      <Label>
        {t('preview:sidebar:template', { lng: UILang })}
      </Label>
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
  UILang: PropTypes.string.isRequired,
};

export default Template;
