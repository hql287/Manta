// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Animation
import {Motion, spring} from 'react-motion';

const springConfig = {
  stiffness: 350,
  damping: 18,
  precision: 0.01,
};

const setMarginValue = activeTab => {
  const multiplier = 100 / allTabs.length;
  const activeTabIndex = _.findIndex(allTabs, {name: activeTab});
  return activeTabIndex * multiplier;
};

const allTabs = [
  {
    title: 'Create',
    name: 'form',
    icon: 'ion-android-list',
  },
  {
    title: 'Invoices',
    name: 'invoices',
    icon: 'ion-ios-filing',
  },
  {
    title: 'Contacts',
    name: 'contacts',
    icon: 'ion-person-stalker',
  },
  {
    title: 'Settings',
    name: 'settings',
    icon: 'ion-ios-gear',
  },
];

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
      props.id === 'invoices' &&
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
    height: 100%;
  }
`;

function AppNav({activeTab, changeTab}) {
  const marginLeftValue = setMarginValue(activeTab);
  const allTabsComponent = allTabs.map(tab =>
    <Tab key={tab.name} href="#" onClick={() => changeTab(tab.name)}>
      <Icon id={tab.name} className={tab.icon} />
      {tab.title}
    </Tab>
  );
  return (
    <TopBar>
      <Motion style={{marginLeft: spring(marginLeftValue, springConfig)}}>
        {({marginLeft}) =>
          <ActiveIndicator>
            <div
              style={{
                width: `${100 / allTabs.length}%`,
                marginLeft: `${marginLeft}%`,
              }}
            />
          </ActiveIndicator>}
      </Motion>
      {allTabsComponent}
    </TopBar>
  );
}

AppNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default AppNav;
