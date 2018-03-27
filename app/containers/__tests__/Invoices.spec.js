import React from 'react';
import { render, shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

// Component
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../../components/shared/Layout';
import { Invoices } from '../Invoices';
import Button, { ButtonsGroup } from '../../components/shared/Button';

// Mocks
const dispatch = jest.fn();
const t = jest.fn();
const invoices = [
  {
    _id: 'first-invoice',
    status: 'pending',
  },
  {
    _id: 'second-invoice',
    status: 'refunded',
  },
  {
    _id: 'third-invoice',
    status: 'paid',
  },
  {
    _id: 'fourth-invoice',
    status: 'cancelled',
  },
];
jest.mock('../../components/invoices/Invoice', () => () => (
  <div className="invoice" />
));

jest.mock('../../components/shared/Message', () => () => (
  <div className="message" />
));

describe('render component correctly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Invoices t={t} invoices={invoices} dispatch={dispatch} />);
  });

  it('receives correct props', () => {
    const mountWrapper = mount(
      <Invoices t={t} invoices={invoices} dispatch={dispatch} />
    );
    expect(mountWrapper.prop('t')).toEqual(t);
    expect(mountWrapper.prop('dispatch')).toEqual(dispatch);
    expect(mountWrapper.prop('invoices')).toEqual(invoices);
  });

  it('render correct number of invoices', () => {
    expect(wrapper.find('.invoice')).toHaveLength(invoices.length);
  });

  it('render empty message when there is no invoice in the DB', () => {
    const newWrapper = mount(
      <Invoices t={t} invoices={[]} dispatch={dispatch} />
    );
    expect(newWrapper.find('.message')).toHaveLength(1);
  });

  it('render a correct page layout', () => {
    expect(wrapper.find(PageWrapper)).toHaveLength(1);
    expect(wrapper.find(PageHeader)).toHaveLength(1);
    expect(wrapper.find(PageHeaderTitle)).toHaveLength(1);
    expect(wrapper.find(PageHeaderActions)).toHaveLength(1);
    expect(wrapper.find(PageContent)).toHaveLength(1);
    expect(wrapper.find(PageContent)).toHaveLength(1);
  });

  it('renders filter with four options', () => {
    const HeaderActions = wrapper.find(PageHeaderActions).first();
    expect(HeaderActions.find(Button)).toHaveLength(4);
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<Invoices t={t} dispatch={dispatch} invoices={invoices} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('handle actions correcrtly', () => {
  let wrapper, spySetFilter, actions, filterBtn;
  beforeEach(() => {
    spySetFilter = jest.spyOn(Invoices.prototype, 'setFilter');
    wrapper = mount(
      <Invoices t={t} invoices={invoices} dispatch={dispatch} />
    );
    actions = wrapper.find(PageHeaderActions).first();
    filterBtn = actions.find(Button).last();
    filterBtn.simulate('click', {
      target: {
        dataset: {
          filter: 'paid',
        },
      },
    });
  });

  it('set correct filter', () => {
    expect(spySetFilter).toHaveBeenCalled();
    const filter = wrapper.state().filter;
    expect(filter).toEqual('paid');
    expect(filter).not.toEqual('pending');
  });

  it('display only invoices with matched status', () => {
    const filter = wrapper.state().filter;
    const filteredInvoices = invoices.filter(
      invoice => invoice.status === filter
    );
    expect(wrapper.find('.invoice')).toHaveLength(filteredInvoices.length);
  });
});
