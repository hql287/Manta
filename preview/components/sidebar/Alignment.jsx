// Libs
import React from 'react';
import PropTypes from 'prop-types';
import {Section, Label} from '../shared';

function Alignment({alignItems, handleInputChange}) {
  return (
    <Section>
      <Label>Align Items</Label>
      <select
        name="alignItems"
        value={alignItems}
        onChange={handleInputChange}>
        <option value="top">Top</option>
        <option value="middle">Middle</option>
        <option value="bottom">Bottom</option>
      </select>
    </Section>
  );
}

Alignment.propTypes = {
  alignItems: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Alignment;
