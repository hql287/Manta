// Libs
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

// Component
import Contact from '../Contact';
import { TR, TD } from '../../shared/Table';
import Button from '../../shared/Button';

// Mocks
const contact = {
  _id: 'id-string',
  fullname: 'Jon Snow',
  email: 'jon@snow.hbo',
  phone: '000-000-000',
};
const newInvoice = jest.fn();
const deleteContact = jest.fn();

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Contact
        contact={contact}
        newInvoice={newInvoice}
        deleteContact={deleteContact}
      />
    );
  });

  it('renders 1 TR row', () => {
    expect(wrapper.find(TR)).toHaveLength(1);
    expect(wrapper.find(TR)).not.toHaveLength(2);
  });

  it('renders 4 TD columns', () => {
    expect(wrapper.find(TD)).toHaveLength(4);
    expect(wrapper.find(TD)).not.toHaveLength(5);
  });

  it('receive correct props', () => {
    const mountWrapper = mount(
      <Contact
        contact={contact}
        newInvoice={newInvoice}
        deleteContact={deleteContact}
      />
    );
    expect(mountWrapper.prop('contact')).toEqual(contact);
    expect(mountWrapper.prop('newInvoice')).toEqual(newInvoice);
    expect(mountWrapper.prop('deleteContact')).toEqual(deleteContact);
  });

  it('renders 2 buttons in the last TD', () => {
    expect(
      wrapper
        .find(TD)
        .last()
        .find(Button)
    ).toHaveLength(2);
    expect(
      wrapper
        .find(TD)
        .last()
        .find(Button)
    ).not.toHaveLength(3);
  });

  describe('renders buttons correctly', () => {
    let firstBtn, lastBtn;
    beforeEach(() => {
      firstBtn = wrapper.find(Button).first();
      lastBtn = wrapper.find(Button).last();
    });

    it('renders buttons with correct props', () => {
      expect(firstBtn.prop('link')).toBe(true);
      expect(firstBtn.prop('primary')).toBe(true);
      expect(firstBtn.prop('success')).toBe(false);
      expect(lastBtn.prop('link')).toBe(true);
      expect(lastBtn.prop('danger')).toBe(true);
      expect(lastBtn.prop('success')).toBe(false);
    });

    it('handle click correctly', () => {
      firstBtn.simulate('click');
      expect(newInvoice).toHaveBeenCalled();
      expect(newInvoice).toHaveBeenCalledWith(contact);

      lastBtn.simulate('click');
      expect(deleteContact).toHaveBeenCalled();
      expect(deleteContact).toHaveBeenCalledWith('id-string');
    });
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Contact
          contact={contact}
          newInvoice={newInvoice}
          deleteContact={deleteContact}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
