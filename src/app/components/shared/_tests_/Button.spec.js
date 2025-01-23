// Libs
import React from 'react';
import { mount } from 'enzyme';

// Component
import Button from '../Button';

describe('Renders correctly to the DOM', () => {
  it('renders a Link(a) element', () => {
    const button = mount(<Button />);
    expect(button.find('a')).toHaveLength(0);
    expect(button.find('button')).toHaveLength(1);
  });
  it('renders its children element', () => {
    const button = mount(<Button>A Button</Button>);
    expect(button.text()).toEqual('A Button');
  });
});

describe('Allows us to set button type via props', () => {
  it('set button type as info', () => {
    const button = mount(<Button primary />);
    expect(button.props().primary).toEqual(true);
  });
  it('set button type as success', () => {
    const button = mount(<Button success />);
    expect(button.props().success).toEqual(true);
  });
  it('set button type as danger', () => {
    const button = mount(<Button danger />);
    expect(button.props().danger).toEqual(true);
  });
});
