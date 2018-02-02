// Libs
import React from 'react';
import PropTypes from 'prop-types';

import { Section, Label } from '../shared';
import Button from '../../../app/components/shared/Button';

function Actions({ t, savePDF }) {
  return (
    <Section>
      <Label>{t('preview:sidebar:actions:name')}</Label>
      <Button block primary onClick={savePDF}>
        {t('preview:sidebar:actions:savePDF')}
      </Button>
    </Section>
  );
}

Actions.propTypes = {
  savePDF: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Actions;
