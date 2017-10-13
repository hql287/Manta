// Libs
import React from 'react';
import PropTypes from 'prop-types';
import {Section, Label} from '../shared';

function Toggler({configs, updateConfigs}) {
  return (
    <Section>
      <Label>Toggle</Label>

      <label>
        <input
          name="showLogo"
          type="checkbox"
          checked={configs.showLogo}
          onChange={updateConfigs}
        />
        {'\u00A0'}
        Logo
      </label>

      <label>
        <input
          name="useSymbol"
          type="checkbox"
          checked={configs.useSymbol}
          onChange={updateConfigs}
        />
        {'\u00A0'}
        Symbols
      </label>

      <label>
        <input
          name="showRecipient"
          type="checkbox"
          checked={configs.showRecipient}
          onChange={updateConfigs}
        />
        {'\u00A0'}
        Recipient
      </label>
    </Section>
  );
}

Toggler.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
};

export default Toggler;
