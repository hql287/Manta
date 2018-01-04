// Libs
import React from 'react';
import PropTypes from 'prop-types';

import { Section, Label } from '../shared';
import Button from '../../../app/components/shared/Button';

function Actions({ savePDF }) {
  return (
    <Section>
      <Label>Actions</Label>
      <Button block primary onClick={savePDF}>
        Save As PDF
      </Button>
    </Section>
  );
}

Actions.propTypes = {
  savePDF: PropTypes.func.isRequired,
};

export default Actions;
