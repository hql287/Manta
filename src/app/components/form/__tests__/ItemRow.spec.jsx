// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { ItemRow } from '../ItemRow.jsx';

// Mocks
const actions = true;
const addItem = jest.fn();
const hasHandler = true;
const item = {
  id: '638fd7e3-217b-4a29-87f7-5ec539f73af9',
  description: 'iPhone X',
  price: 999,
  quantity: 1,
  subtotal: 999,
};
const removeRow = jest.fn();
const updateRow = jest.fn();
const t = jest.fn();

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ItemRow
        t={t}
        actions={actions}
        addItem={addItem}
        hasHandler={hasHandler}
        item={item}
        removeRow={removeRow}
        updateRow={updateRow}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('actions')).toEqual(true);
    expect(wrapper.prop('actions')).not.toEqual(false);
    expect(wrapper.prop('hasHandler')).toEqual(true);
    expect(wrapper.prop('hasHandler')).not.toEqual(false);
    expect(wrapper.prop('item')).toEqual(item);
    expect(wrapper.prop('removeRow')).toEqual(removeRow);
    expect(wrapper.prop('updateRow')).toEqual(updateRow);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('input')).toHaveLength(3);
    expect(wrapper.find('a')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  it('set local state as item prop value', () => {
    expect(wrapper.state()).toEqual(item);
  });

  // PRIVATE METHOD
  it('handle text input change correctly', () => {
    // Setup
    const spy = jest.spyOn(ItemRow.prototype, 'handleTextInputChange');
    const wrap = mount(
      <ItemRow
        t={t}
        actions={actions}
        addItem={addItem}
        hasHandler={hasHandler}
        item={item}
        removeRow={removeRow}
        updateRow={updateRow}
      />
    );
    // Execute
    const textChange = {
      target: {
        name: 'description',
        value: 'iPhoneX',
      },
    };
    const descriptionInput = wrap.find('input').first();
    descriptionInput.simulate('change', textChange);
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('handle number input change correctly', () => {
    const spy = jest.spyOn(ItemRow.prototype, 'handleNumberInputChange');
    const wrap = mount(
      <ItemRow
        t={t}
        actions={actions}
        addItem={addItem}
        hasHandler={hasHandler}
        item={item}
        removeRow={removeRow}
        updateRow={updateRow}
      />
    );

    // Execute
    const priceChange = {
      target: {
        name: 'price',
        value: '999',
      },
    };
    const priceInput = wrap.find('input').at(1);
    const quantityInput = wrap.find('input').last();
    priceInput.simulate('change', priceChange);
    // Assertion
    expect(spy).toHaveBeenCalled();
  });

  it('add new row when press enter', () => {
    const spy = jest.spyOn(ItemRow.prototype, 'handleKeyDown');
    const wrap = mount(
      <ItemRow
        t={t}
        actions={actions}
        addItem={addItem}
        hasHandler={hasHandler}
        item={item}
        removeRow={removeRow}
        updateRow={updateRow}
      />
    );
    // Execute
    const keyChange = {
      which: 13,
    };
    const descriptionInput = wrap.find('input').first();
    descriptionInput.simulate('keyDown', keyChange);
    // Assertion
    expect(spy).toHaveBeenCalled();
    expect(addItem).toHaveBeenCalled();
  });

  it('updateSubtotal when price and quantity change', () => {
    const spy = jest.spyOn(ItemRow.prototype, 'updateSubtotal');
    const wrap = mount(
      <ItemRow
        t={t}
        actions={actions}
        addItem={addItem}
        hasHandler={hasHandler}
        item={item}
        removeRow={removeRow}
        updateRow={updateRow}
      />
    );

    // Execute
    const priceChange = {
      target: {
        name: 'price',
        value: '799',
      },
    };
    const priceInput = wrap.find('input').at(1);
    priceInput.simulate('change', priceChange);
    // Assertion
    expect(spy).toHaveBeenCalled();
  });

  it('handle removeRow correctly', () => {
    const removeBtn = wrapper.find('a');
    removeBtn.simulate('click');
    expect(removeRow).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <ItemRow
          t={t}
          actions={actions}
          addItem={addItem}
          hasHandler={hasHandler}
          item={item}
          removeRow={removeRow}
          updateRow={updateRow}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
