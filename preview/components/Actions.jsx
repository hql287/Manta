// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styling
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4F555C;
`;

import Button from '../../app/components/shared/Button';

class Actions extends Component {
  render() {
    const { savePDF } = this.props;
    return (
      <Wrapper>
        <Label>Actions</Label>
        <Button block primary onClick={savePDF}>
          Save As PDF
        </Button>
      </Wrapper>
    );
  }
}

Actions.propTypes = {
  savePDF: PropTypes.func.isRequired,
};

export default Actions;
