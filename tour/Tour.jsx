// Libs
import React, { Component } from 'react';
import { compose } from 'recompose';
import { ipcRenderer as ipc } from 'electron';
import { translate } from 'react-i18next';

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
    this.nextSlide = this.nextSlide.bind(this);
    this.endTour = this.endTour.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  nextSlide() {
    this.setState({ currentSlide: this.state.currentSlide + 1 });
  }

  endTour() {
    this.setState({ currentSlide: 1 }, () => {
      ipc.send('end-tour');
    });
  }

  render() {
    const { t } = this.props;
    return (
      <Wrapper>
        <Slider t={t} currentSlide={this.state.currentSlide} />
        <Actions
          t={t}
          totalSlide={this.state.totalSlide}
          currentSlide={this.state.currentSlide}
          nextSlide={this.nextSlide}
          endTour={this.endTour}
        />
      </Wrapper>
    );
  }
}

export default compose(translate(['common', 'tour']))(Tour);
