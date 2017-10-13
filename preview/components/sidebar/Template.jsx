// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import {Section, Label} from '../shared';

function Template({template, handleInputChange}) {
  return (
    <Section>
      <Label>Template</Label>
      <select
        name="template"
        value={template}
        onChange={handleInputChange}>
        <option value="minimal">Minimal</option>
        <option value="business">Business</option>
        <option value="modern">Modern</option>
      </select>
    </Section>
  );
}

Template.propTypes = {
  template: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Template;
