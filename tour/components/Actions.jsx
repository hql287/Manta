import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Content = styled.div`
  flex: 1;
  max-height: 100px;
  background: #f9fafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  justify-content: space-around;
  display: flex;
  align-items: center;
  > * {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

import Button from '../../app/components/shared/Button';

function Actions({endTour, nextSlide, prevSlide, currentSlide}) {
  return (
    <Content>
      <div>
        {currentSlide > 1 && (
          <Button primary onClick={prevSlide}>
            Prev
          </Button>
        )}
      </div>

      <Button danger onClick={endTour}>
        End Tour
      </Button>

      <div>
        {currentSlide < 4 && (
          <Button primary onClick={nextSlide}>
            Next
          </Button>
        )}
      </div>
    </Content>
  );
}

Actions.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  endTour: PropTypes.func.isRequired,
  nextSlide: PropTypes.func.isRequired,
  prevSlide: PropTypes.func.isRequired,
};

export default Actions;
