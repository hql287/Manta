// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { RecipientForm } from '../RecipientForm.jsx';

// Mocks
const formData = {
  fullname: 'Jon Snow',
  email: 'john@hbo.com',
};
const t = jest.fn();
const updateRecipientForm = jest.fn();

describe('Recipient Form component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <RecipientForm
        t={t}
        formData={formData}
        updateRecipientForm={updateRecipientForm}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('formData')).toEqual(formData);
    expect(wrapper.prop('updateRecipientForm')).toEqual(updateRecipientForm);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('input')).toHaveLength(5);
  });

  // METHOD
  // it('handleInputCHange correctly', () => {
    // const fullname = wrapper.find('input').at(0);
    // fullname.simulate('change', {
    //   target: { name: 'fullname', value: 'new-name' },
    // });
    // Assert
    // expect(updateRecipientForm).toHaveBeenCalled();
    // let lastCallArgument =
    //   updateRecipientForm.mock.calls[
    //     updateRecipientForm.mock.calls.length - 1
    //   ][0];
    // expect(lastCallArgument).toEqual({
    //   target: {name: 'fullname', value: 'new-name'},
    // });
  // });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <RecipientForm
          t={t}
          formData={formData}
          updateRecipientForm={updateRecipientForm}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
