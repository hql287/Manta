// React Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';

// Animation
import _withFadeInAnimation from './hoc/_withFadeInAnimation';
import _withShowUpAnimation from './hoc/_withShowUpAnimation';

// Styles
import styled from 'styled-components';
const Noti = styled.div`
  background: #FFF;
  height: 70px;
  padding: 20px 40px;
  margin-top: 20px;
  border-top: 4px solid #469FE5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Message = styled.p`
  color: #2C323A;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
`;

// Component
class Notification extends Component {
  constructor(props) {
    super(props);
    this.removeNoti = this.removeNoti.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.noti.id !== nextProps.noti.id;
  }

  removeNoti() {
    const {noti, removeNoti} = this.props;
    removeNoti(noti.id);
  }

  render() {
    const {noti} = this.props;
    return (
      <Noti type={noti.type} onClick={this.removeNoti}>
        <Message>
          {noti.message}
        </Message>
        <a href="#" onClick={this.removeNoti}>
          <i className="ion-android-close"/>
        </a>
      </Noti>
    );
  }
}

Notification.propTypes = {
  noti: PropTypes.object.isRequired,
  removeNoti: PropTypes.func.isRequired,
};

export default compose(
  _withFadeInAnimation,
  _withShowUpAnimation
)(Notification);
