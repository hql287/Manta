// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { Note } from '../Note.jsx';

// Mocks
const t = jest.fn();
const updateFieldData = jest.fn();
const note = {
  required: true,
  content: 'something',
};

describe('Note component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Note t={t} note={note} updateFieldData={updateFieldData} />);
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('note')).toEqual(note);
    expect(wrapper.prop('updateFieldData')).toEqual(updateFieldData);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('textarea')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIVATE METHOD
  it('handleInputChange correctly', () => {
    const spy = jest.spyOn(Note.prototype, 'handleInputChange');
    const wrap = mount(<Note t={t} note={note} updateFieldData={updateFieldData} />);
    const textArea = wrap.find('textarea');
    textArea.simulate('change', { target: { value: 'Something Else' } });
    expect(spy).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(<Note t={t} note={note} updateFieldData={updateFieldData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
