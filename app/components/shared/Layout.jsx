// Libraries
import React from 'react';

// Styles
import styled from 'styled-components';

const AppWrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const AppMainContentStyle = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  background: #f9fafa;
`;

const PageWrapperStyle = styled.div`
  overflow: auto;
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
  padding: 10px 120px 10px 40px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const PageHeaderTitleStyle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.5px;
`;

const PageHeaderActionsStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  button {  margin-left: 10px; }
  i { margin-right: 10px; }
`;

const PageContentStyle = styled.div`
  // flex: 1;
  // overflow: hidden;
  margin: 90px 40px 40px 40px;
  ${props =>
    !props.bare &&
    `
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 4px;
    background: #FFF;
  `};
`;

const PageFooterStyle = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #f9fafa;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

// Components
const AppWrapper = props => <AppWrapperStyle>{props.children}</AppWrapperStyle>;

const AppMainContent = props => (
  <AppMainContentStyle>{props.children}</AppMainContentStyle>
);

const PageWrapper = props => (
  <PageWrapperStyle>{props.children}</PageWrapperStyle>
);

const PageHeader = props => <PageHeaderStyle>{props.children}</PageHeaderStyle>;

const PageHeaderTitle = props => (
  <PageHeaderTitleStyle>{props.children}</PageHeaderTitleStyle>
);

const PageHeaderActions = props => (
  <PageHeaderActionsStyle>{props.children}</PageHeaderActionsStyle>
);

const PageContent = props => (
  <PageContentStyle bare={props.bare}>{props.children}</PageContentStyle>
);

const PageFooter = props => <PageFooterStyle>{props.children}</PageFooterStyle>;

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
