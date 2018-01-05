// Libs
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

// Component
import { ItemsList } from '../ItemsList.jsx';

// Mocks
const rows = [];
const formState = {};
const boundActionCreators = {
  addItem: jest.fn(),
  moveRow: jest.fn(),
  removeItem: jest.fn(),
  updateItem: jest.fn(),
};

describe('Note component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ItemsList
        rows={rows}
        formState={formState}
        boundActionCreators={boundActionCreators}
      />
    );
  });

  // PROPS & STATE
  it('receives correct props', () => {
    expect(wrapper.prop('rows')).toEqual(rows);
    expect(wrapper.prop('formState')).toEqual(formState);
    expect(wrapper.prop('boundActionCreators')).toEqual(boundActionCreators);
  });

  // RENDER
  it('renders necessary element', () => {
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  // LIFE CYCLE EVENTS
  // TODO
  it('render when necessary', () => {});

  // PRIVATE METHOD
  it('handle addItem correctly', () => {
    const addItemBtn = wrapper.find('button');
    addItemBtn.simulate('click');
    expect(boundActionCreators.addItem).toHaveBeenCalled();
  });

  // SNAPSHOT
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <ItemsList
          rows={rows}
          formState={formState}
          boundActionCreators={boundActionCreators}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
