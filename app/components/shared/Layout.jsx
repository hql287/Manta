// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const AppWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AppMainContentStyle = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

const PageWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PageHeaderStyle = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px 40px;
  background: #F2F3F4;
  border-bottom: 1px solid rgba(0,0,0,.1);
  z-index: 1;
`;

const PageHeaderTitleStyle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -.5px;
`;

const PageHeaderActionsStyle = styled.div`
  a { margin-left: 10px; }
`;

const PageContentStyle = styled.div`
  flex: 1;
  overflow: scroll;
  padding: 20px 40px 0 40px;
  margin-top: 50px;
`;

const PageFooterStyle = styled.div`
  position: relative;
  flex: 1;
  max-height: 40px;
  text-transform: uppercase;
  font-size: 14px;
  padding: 0 40px;
  border-top: 1px solid #f2f3f4;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

// Components
const AppWrapper = props =>
  <AppWrapperStyle>
    {props.children}
  </AppWrapperStyle>;

const AppMainContent = props =>
  <AppMainContentStyle>
    {props.children}
  </AppMainContentStyle>;

const PageWrapper = props =>
  <PageWrapperStyle>
    {props.children}
  </PageWrapperStyle>;

const PageHeader = props =>
  <PageHeaderStyle>
    {props.children}
  </PageHeaderStyle>;

const PageHeaderTitle = props =>
  <PageHeaderTitleStyle>
    { props.children }
  </PageHeaderTitleStyle>;

const PageHeaderActions = props =>
  <PageHeaderActionsStyle>
    { props.children }
  </PageHeaderActionsStyle>;

const PageContent = props =>
  <PageContentStyle>
    {props.children}
  </PageContentStyle>;

const PageFooter = props =>
  <PageFooterStyle>
    {props.children}
  </PageFooterStyle>;

export {
  AppWrapper,
  AppMainContent,
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
};
