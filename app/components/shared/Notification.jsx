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
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,.1);
  border-top: 4px solid #469FE5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${ props => props.type ==='warning' && `border-top: 4px solid #F9D548;`}
  ${ props => props.type ==='success' && `border-top: 4px solid #6BBB69;`}
  ${ props => props.type ==='danger' && `border-top: 4px solid #EC476E;`}
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
    return this.props.notification !== nextProps.notification;
  }

  removeNoti() {
    this.props.removeNoti();
  }

  render() {
    const {notification} = this.props;
    return (
      <Noti type={notification.type} onClick={this.removeNoti}>
        <Message>
          {notification.message}
        </Message>
        <a href="#" onClick={this.removeNoti}>
          <i className="ion-android-close"/>
        </a>
      </Noti>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  removeNoti: PropTypes.func.isRequired,
};

export default compose(
  _withFadeInAnimation,
  _withShowUpAnimation
)(Notification);
