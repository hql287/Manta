// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ipcRenderer as ipc} from 'electron';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
}
`;

// Components
import Slider from './Slider';
import Actions from '../components/Actions';

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state = {currentSlide: 1};
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.endTour = this.endTour.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  nextSlide() {
    this.setState({currentSlide: this.state.currentSlide + 1});
  }

  prevSlide() {
    this.setState({currentSlide: this.state.currentSlide - 1});
  }

  endTour() {
    this.setState({currentSlide: 1}, () => {
      ipc.send('end-tour');
    });
  }

  render() {
    return (
      <Wrapper>
        <Slider currentSlide={this.state.currentSlide} />
        <Actions
          currentSlide={this.state.currentSlide}
          nextSlide={this.nextSlide}
          prevSlide={this.prevSlide}
          endTour={this.endTour}
        />
      </Wrapper>
    );
  }
}

Tour.propTypes = {};

export default Tour;
