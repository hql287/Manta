// Libs
import React from 'react';
import PropTypes from 'prop-types';

import { Section, Label } from '../shared';
import Button from '../../../app/components/shared/Button';

function Actions({ saveConfigs, savePDF, t, UILang }) {
  return (
    <Section>
      <Label>
        {t('preview:sidebar:actions:name', { lng: UILang })}
      </Label>
      <Button block primary onClick={savePDF}>
        {t('preview:sidebar:actions:savePDF', { lng: UILang })}
      </Button>
      <Button block secondary onClick={saveConfigs}>
        {t('preview:sidebar:actions:saveConfigs', { lng: UILang })}
      </Button>
    </Section>
  );
}

Actions.propTypes = {
  saveConfigs: PropTypes.func.isRequired,
  savePDF: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default Actions;
