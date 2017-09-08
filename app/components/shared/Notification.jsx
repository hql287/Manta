// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Animation
import _withFadeInAnimation from './hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const Noti = styled.div`
  background: #469fe5;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, .1);
`;

const Message = styled.p`
  color: white;
  margin: 0;
`;

// Component
const Notification = ({noti, removeNoti}) => {
  return (
    <Noti type={noti.type}>
      <Message>
        {noti.message}
      </Message>
      <a href="#" onClick={() => removeNoti(noti.id)}>
        Close
      </a>
    </Noti>
  );
};

Notification.propTypes = {
  noti: PropTypes.object.isRequired,
  removeNoti: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Notification);
