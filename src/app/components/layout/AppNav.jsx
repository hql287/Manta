// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { findIndex } from 'lodash';

// Animation
import { Motion, spring } from 'react-motion';

const springConfig = {
  stiffness: 350,
  damping: 18,
  precision: 0.01,
};

const setMarginValue = activeTab => {
  const multiplier = 100 / allTabs.length;
  const activeTabIndex = findIndex(allTabs, { name: activeTab });
  return activeTabIndex * multiplier;
};

const allTabs = [
  {
    title: 'Create',
    name: 'form',
    icon: 'ion-document-text',
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

export const SideBar = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  background: #2c323a;
`;

export const Tab = styled.a`
  position: relative;
  color: white;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1.5;
  text-decoration: none;
  height: 60px;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

export const Icon = styled.i`
  ${props => props.id === 'form' && `color: #6bbb69;`};
  ${props => props.id === 'contacts' && `color: #469fe5;`};
  ${props => props.id === 'settings' && `color: #C4C8CC;`};
  ${props => props.id === 'invoices' && `color: #cbc189;`};
`;

export const ActiveIndicator = styled.div`
  height: ${allTabs.length * 60}px;
  width: 5px;
  position: absolute;
  > div {
    position: absolute;
    background: #292b2c;
    width: 80px;
    border-left: 5px solid #469fe5;
  }
`;

import AppUpdate from './AppUpdate';

function AppNav({ activeTab, changeTab }) {
  const marginTopValue = setMarginValue(activeTab);
  const allTabsComponent = allTabs.map(tab => (
    <Tab key={tab.name} href="#" onClick={() => changeTab(tab.name)}>
      <Icon id={tab.name} className={tab.icon} />
    </Tab>
  ));
  return (
    <SideBar>
      <div>
        <Motion style={{ marginTop: spring(marginTopValue, springConfig) }}>
          {({ marginTop }) => (
            <ActiveIndicator>
              <div
                style={{
                  height: `${100 / allTabs.length}%`,
                  top: `${marginTop}%`,
                }}
              />
            </ActiveIndicator>
          )}
        </Motion>
        {allTabsComponent}
      </div>
      <AppUpdate />
    </SideBar>
  );
}

AppNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default AppNav;
