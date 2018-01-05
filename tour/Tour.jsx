// Libs
import React, { Component } from 'react';
import { ipcRenderer as ipc } from 'electron';

import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
}
`;

// Components
import Slider from './containers/Slider';
import Actions from './components/Actions';

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state = { currentSlide: 1, totalSlide: 5 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  nextSlide = () => {
    this.setState({ currentSlide: this.state.currentSlide + 1 });
  }

  endTour = () => {
    this.setState({ currentSlide: 1 }, () => {
      ipc.send('end-tour');
    });
  }

  render() {
    return (
      <Wrapper>
        <Slider currentSlide={this.state.currentSlide} />
        <Actions
          totalSlide={this.state.totalSlide}
          currentSlide={this.state.currentSlide}
          nextSlide={this.nextSlide}
          endTour={this.endTour}
        />
      </Wrapper>
    );
  }
}

export default Tour;
