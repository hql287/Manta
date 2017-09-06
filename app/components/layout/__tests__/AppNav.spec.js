// Libs
import React from 'react';
import { shallow, mount } from 'enzyme';

// Component
import AppNav from '../AppNav';
import { Tab } from '../../shared/Tabs';

const fn = () => console.log('Dummy Function');

describe('Renders correctly to the DOM', () => {
  it('renders 4 tabs', () => {
    const nav = mount(<AppNav activeTab='none' changeTab={fn}/>);
    expect(nav.find('a')).toHaveLength(4);
  });
  it('contains active indicator');
  it('shows active indicator at the correct position');
});
