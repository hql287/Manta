// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const TabsWrapperStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const TabContentStyle = styled.div`
  background: #f9fafa;
  padding: 40px 40px 0 40px;
  border: 1px solid rgba(0, 0, 0, .1);
  margin-top: -2px;
  border-radius: 4px;
  border-top-left-radius: 0;
`;

const TabStyle = styled.a`
  text-decoration: none;
  color: #292b2c;
  font-weight: 400;
  font-size: 16px;
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-left: 1px solid rgba(0, 0, 0, .1);
  padding: 6px 12px;
  &:first-child {
    border-top-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }
  &.active {
    background: #f9fafa;
    border-bottom: 1px solid #f9fafa;
  }
  &:hover {
    text-decoration: none;
    color: #292b2c;
  }
`;


// Components
const Tab = props =>
  <TabStyle {...props}>
    {props.children}
  </TabStyle>;

const TabContent = props =>
  <TabContentStyle>
    {props.children}
  </TabContentStyle>;

const TabContentWrapper = props =>
  <TabContentWrapperStyle>
    { props.children }
  </TabContentWrapperStyle>;

const TabsWrapper = props =>
  <TabsWrapperStyle>
    {props.children}
  </TabsWrapperStyle>;

export {
  Tab,
  TabContent,
  TabsWrapper
};
