// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const AllNotis = styled.div`
  position: fixed;
  height: auto;
  bottom: 0;
  width: 100%;
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
