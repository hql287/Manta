// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Animation
import {Motion, spring} from 'react-motion';

const springConfig = {
  stiffness: 350,
  damping: 18,
  precision: 0.01,
};

const setMarginValue = activeTab => {
  switch (activeTab) {
    case 'invoices': {
      return 25;
    }
    case 'contacts': {
      return 50;
    }
    case 'settings': {
      return 75;
    }
    default: {
      return 0;
    }
  }
};

// Styles
import styled from 'styled-components';

const TopBar = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
  max-height: 100px;
  min-height: 100px;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  background: #2c323a;
`;

const Tab = styled.a`
  position: relative;
  color: white;
  font-size: 14px;
  line-height: 21px;
  text-decoration: none;
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const Icon = styled.i`
  margin-right: 8px;
  font-size: 18px;
  ${props => props.id === 'form' && `color: #6bbb69;`} ${props =>
      props.id === 'contacts' && `color: #469fe5;`} ${props =>
      props.id === 'settings' && `color: #C4C8CC;`} ${props =>
      props.id === 'archive' &&
      `
    color: #cbc189;
    font-size: 24px;
  `};
`;

const ActiveIndicator = styled.div`
  height: 5px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 40px;
  > div {
    background: #469fe5;
    width: 25%;
    height: 100%;
  }
`;

function AppNav({activeTab, changeTab}) {
  const marginLeftValue = setMarginValue(activeTab);
  return (
    <TopBar>
      <Motion style={{marginLeft: spring(marginLeftValue, springConfig)}}>
        {({marginLeft}) =>
          <ActiveIndicator>
            <div style={{marginLeft: `${marginLeft}%`}} />
          </ActiveIndicator>}
      </Motion>
      <Tab href="#" onClick={() => changeTab('form')}>
        <Icon id="form" className="ion-android-list" />
        Create
      </Tab>
      <Tab href="#" onClick={() => changeTab('invoices')}>
        <Icon id="archive" className="ion-ios-filing" />
        Archive
      </Tab>
      <Tab href="#" onClick={() => changeTab('contacts')}>
        <Icon id="contacts" className="ion-person-stalker" />
        Contacts
      </Tab>
      <Tab href="#" onClick={() => changeTab('settings')}>
        <Icon id="settings" className="ion-ios-gear" />
        Settings
      </Tab>
    </TopBar>
  );
}

AppNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default AppNav;
