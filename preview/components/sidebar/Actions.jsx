// Libs
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../app/components/shared/Button';
import styled from 'styled-components';

const ButtonsGroup = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  ${props => props.sideBarWidth && `
    width: ${props.sideBarWidth-1}px;
  `}
  padding: 20px;
  background: #f9fafa;
  border-top: 1px solid #e0e1e1;
  > * {
      margin-bottom: 10px;
      &:last-child {
      margin-bottom: 0;
    }
 }
`;

function Actions({ saveConfigs, savePDF, sideBarWidth, t, UILang }) {
  return (
    <ButtonsGroup sideBarWidth={sideBarWidth}>
      <Button block primary onClick={savePDF}>
        {t('preview:sidebar:actions:savePDF', { lng: UILang })}
      </Button>
      <Button block secondary onClick={saveConfigs}>
        {t('preview:sidebar:actions:saveConfigs', { lng: UILang })}
      </Button>
    </ButtonsGroup>
  );
}

Actions.propTypes = {
  sideBarWidth: PropTypes.number.isRequired,
  saveConfigs: PropTypes.func.isRequired,
  savePDF: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default Actions;
