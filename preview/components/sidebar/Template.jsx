// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Styling
import {Section, Label} from '../shared';

function Template({configs, updateConfigs}) {
  const { template } = configs;
  return (
    <Section>
      <Label>Template</Label>
      <select
        name="template"
        value={template}
        onChange={updateConfigs}>
        <option value="minimal">Minimal</option>
        <option value="business">Business</option>
        <option value="modern">Modern</option>
      </select>
    </Section>
  );
}

Template.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
};

export default Template;
