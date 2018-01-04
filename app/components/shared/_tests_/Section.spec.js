// Libs
import React from 'react';
import { mount } from 'enzyme';

// Component
import { Section } from '../Section';

describe('Renders correctly to the DOM', () => {
  it('renders a DIV element', () => {
    const section = mount(<Section />);
    expect(section.find('div')).toHaveLength(1);
  });

  it('renders its children', () => {
    const section = mount(
      <Section>
        <div>
          <h4>Hello, World</h4>
          <p>This is a paragraph</p>
        </div>
      </Section>
    );
    expect(section.find('div')).toHaveLength(2);
    expect(section.find('h4')).toHaveLength(1);
    expect(section.find('p')).toHaveLength(1);
  });
});
