// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const Wrapper = styled.div`
  position: fixed;
  height: auto;
  bottom: 0;
  width: 100%;
  padding: 40px 40px 20px 40px;
`;

// Component
import Notification from '../../components/shared/Notification';
import Transition from '../../components/shared/Transition';

function AppNoti({notifications, removeNoti}) {
  const notificationsComponent = notifications.map(notification =>
    <Notification
      key={notification.id}
      notification={notification}
      removeNoti={removeNoti}
    />
  );
  return (
    <Wrapper>
      <Transition>
        {notificationsComponent}
      </Transition>
    </Wrapper>
  );
}

AppNoti.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeNoti: PropTypes.func.isRequired,
};

export default AppNoti;
