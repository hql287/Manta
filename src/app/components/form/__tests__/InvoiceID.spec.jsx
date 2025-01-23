// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { InvoiceID } from '../InvoiceID.jsx';

// Mocks
const t = jest.fn();
const updateFieldData = jest.fn();
const invoiceID = "Invoice: 123-456-789"

describe('InvoiceID component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <InvoiceID
        t={t}
        invoiceID={invoiceID}
        updateFieldData={updateFieldData}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('invoiceID')).toEqual(invoiceID);
    expect(wrapper.prop('updateFieldData')).toEqual(updateFieldData);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIVATE METHOD
  it('handleInputChange correctly', () => {
    const spy = jest.spyOn(InvoiceID.prototype, 'handleInputChange');
    const wrap = mount(
      <InvoiceID
        t={t}
        invoiceID={invoiceID}
        updateFieldData={updateFieldData}
      />
    );
    const textInput = wrap.find('input');
    textInput.simulate('change', { target: { value: 'Invoice: 987-654-321' } });
    expect(spy).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <InvoiceID
          t={t}
          invoiceID={invoiceID}
          updateFieldData={updateFieldData}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
