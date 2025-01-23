// Libs
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

// Component
import Message from '../Message';

describe('Renders correct style', () => {
  it('renders a DIV element', () => {
    const tree = renderer.create(<Message text="foo" />).toJSON();
    expect(tree).toHaveStyleRule('color', '#4f555c');
  });
});

describe('Renders correctly to the DOM', () => {
  it('renders a DIV element', () => {
    const message = mount(<Message text="foo" />);
    expect(message.find('div')).toHaveLength(1);
  });
});

describe('Allows us to set message types via props', () => {
  it('set message type as info', () => {
    const message = mount(<Message info text="foo" />);
    expect(message.props().info).toEqual(true);
  });
  it('set message type as success', () => {
    const message = mount(<Message success text="foo" />);
    expect(message.props().success).toEqual(true);
  });
  it('set message type as danger', () => {
    const message = mount(<Message danger text="foo" />);
    expect(message.props().danger).toEqual(true);
  });
  it('set message type as warning', () => {
    const message = mount(<Message warning text="foo" />);
    expect(message.props().warning).toEqual(true);
  });
});

describe('Allows us to set text props', () => {
  it('set text prop to foo', () => {
    const message = mount(<Message text="foo" />);
    expect(message.props().text).toEqual('foo');
  });
  it('set text prop to bar', () => {
    const message = mount(<Message text="bar" />);
    expect(message.props().text).toEqual('bar');
  });
});

describe('Renders correct content passed via props', () => {
  it('prints out Hello, World', () => {
    const message = mount(<Message text="Hello, World" />);
    expect(message.text()).toEqual('Hello, World');
  });
  it('prints out Bye, World', () => {
    const message = mount(<Message text="Bye, World" />);
    expect(message.text()).toEqual('Bye, World');
  });
});
