// Libs
import React from 'react';
import PropTypes from 'prop-types';
import {Section, Label, Range} from '../shared';

function FontSize({configs, updateConfigs}) {
  return (
    <Section>
      <Label>Font Size</Label>
      <Range
        name="fontSize"
        type="range"
        min="100"
        max="300"
        step="100"
        value={configs.fontSize}
        onChange={updateConfigs}
      />
    </Section>
  );
}

FontSize.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
};

export default FontSize;
