// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { RecipientsList } from '../RecipientsList.jsx';

// Mocks
const contacts = [
  {
    _id: 'first-contact',
    fullname: 'Jon Snow',
    company: 'HBO',
    email: 'john@hbo.com',
  },
  {
    _id: 'second-contact',
    fullname: 'Ned Stark',
    company: 'HBO',
    email: 'ned@hbo.com',
  },
];
const selectedContact = {};
const updateRecipientList = jest.fn();

describe('Recipient List component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RecipientsList
        contacts={contacts}
        selectedContact={selectedContact}
        updateRecipientList={updateRecipientList}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('contacts')).toEqual(contacts);
    expect(wrapper.prop('selectedContact')).toEqual(selectedContact);
    expect(wrapper.prop('updateRecipientList')).toEqual(updateRecipientList);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('select')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIVATE METHOD
  it('handleInputChange correctly', () => {
    const input = wrapper.find('select');
    input.simulate('change', { target: { value: 'second-contact' } });
    expect(updateRecipientList).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <RecipientsList
          contacts={contacts}
          selectedContact={selectedContact}
          updateRecipientList={updateRecipientList}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
