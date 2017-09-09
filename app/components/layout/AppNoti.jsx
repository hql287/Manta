// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const AllNotis = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50%;
  height: auto;
  max-width: 300px;
`;

// Component
import Notification from '../../components/shared/Notification';

function AppNoti({notifications, removeNoti}) {
  const notificationsComponent = notifications.map(noti =>
    <Notification
      key={noti.id}
      noti={noti}
      removeNoti={removeNoti} />
  );
  return (
    <AllNotis>
      {notificationsComponent}
    </AllNotis>
  );
}

AppNoti.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeNoti: PropTypes.func.isRequired,
};

export default AppNoti;
