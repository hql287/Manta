// Libs
import React from 'react';
import { mount } from 'enzyme';

// Component
import {
  AppWrapper,
  AppMainContent,
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
} from '../Layout';

describe('Renders correctly to the DOM', () => {
  it('AppWrapper renders a DIV element', () => {
    expect(mount(<AppWrapper />).find('div')).toHaveLength(1);
  });
  it('AppMainContent renders a DIV element', () => {
    expect(mount(<AppMainContent />).find('div')).toHaveLength(1);
  });
  it('PageWrapper renders a DIV element', () => {
    expect(mount(<PageWrapper />).find('div')).toHaveLength(1);
  });
  it('PageHeader renders a DIV element', () => {
    expect(mount(<PageHeader />).find('div')).toHaveLength(1);
  });
  it('PageHeaderTitle renders a DIV element', () => {
    expect(mount(<PageHeaderTitle />).find('p')).toHaveLength(1);
  });
  it('PageHeaderActions renders a DIV element', () => {
    expect(mount(<PageHeaderActions />).find('div')).toHaveLength(1);
  });
  it('PageContent renders a DIV element', () => {
    expect(mount(<PageContent />).find('div')).toHaveLength(1);
  });
  it('PageFooter renders a DIV element', () => {
    expect(mount(<PageFooter />).find('div')).toHaveLength(1);
  });
});

describe('Renders its children element', () => {
  it('AppWrapper renders its children', () => {
    const appWrapper = mount(
      <AppWrapper>
        <div>Hello, World</div>
      </AppWrapper>
    );
    expect(appWrapper.find('div')).toHaveLength(2);
    expect(appWrapper.text()).toEqual('Hello, World');
  });

  it('AppMainContent renders its children', () => {
    const appMainContent = mount(
      <AppMainContent>
        <div>Hello, World</div>
      </AppMainContent>
    );
    expect(appMainContent.find('div')).toHaveLength(2);
    expect(appMainContent.text()).toEqual('Hello, World');
  });

  it('PageWrapper renders its children', () => {
    const pageWrapper = mount(
      <PageWrapper>
        <div>Hello, World</div>
      </PageWrapper>
    );
    expect(pageWrapper.find('div')).toHaveLength(2);
    expect(pageWrapper.text()).toEqual('Hello, World');
  });

  it('PageHeader renders its children', () => {
    const pageHeader = mount(
      <PageHeader>
        <div>Hello, World</div>
      </PageHeader>
    );
    expect(pageHeader.find('div')).toHaveLength(2);
    expect(pageHeader.text()).toEqual('Hello, World');
  });

  it('PageHeaderTitle renders a DIV element', () => {
    const pageHeaderTitle = mount(
      <PageHeaderTitle>
        <span>Hello, World</span>
      </PageHeaderTitle>
    );
    expect(pageHeaderTitle.find('p')).toHaveLength(1);
    expect(pageHeaderTitle.find('span')).toHaveLength(1);
    expect(pageHeaderTitle.text()).toEqual('Hello, World');
  });

  it('PageHeaderActions renders its children', () => {
    const pageHeaderActions = mount(
      <PageHeaderActions>
        <div>Hello, World</div>
      </PageHeaderActions>
    );
    expect(pageHeaderActions.find('div')).toHaveLength(2);
    expect(pageHeaderActions.text()).toEqual('Hello, World');
  });

  it('PageContent renders its children', () => {
    const pageContent = mount(
      <PageContent>
        <div>Hello, World</div>
      </PageContent>
    );
    expect(pageContent.find('div')).toHaveLength(2);
    expect(pageContent.text()).toEqual('Hello, World');
  });

  it('PageFooter renders its children', () => {
    const pageFooter = mount(
      <PageFooter>
        <div>Hello, World</div>
      </PageFooter>
    );
    expect(pageFooter.find('div')).toHaveLength(2);
    expect(pageFooter.text()).toEqual('Hello, World');
  });
});
