// Libs
import React from 'react';
import PropTypes from 'prop-types';
import {Section, Label} from '../shared';

function Alignment({configs, updateConfigs}) {
  return (
    <Section>
      <Label>Align Items</Label>
      <select
        name="alignItems"
        value={configs.alignItems}
        onChange={updateConfigs}>
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select>
    </Section>
  );
}

Alignment.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
};

export default Alignment;
