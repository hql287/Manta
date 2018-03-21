// Libs
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

// Component
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../../components/shared/Layout';
import Button, { ButtonsGroup } from '../../components/shared/Button';
import Message from '../../components/shared/Message';
import { Invoices } from '../Invoices';
import Invoice from '../../components/invoices/Invoice';

// Mocks
const dispatch = jest.fn();
const t = jest.fn();
const sharedSettings = {
  currency: {
    code:"USD",
    placement:"before",
    separator:"commaDot",
    fraction:2
  },
  dateFormat: 'MMDDYY',
  subtotal: 3843,
  grandTotal: 3843,
  recipient: {
    _id: '3bd85cb9-7675-4d59-b9c3-305481cb77c9',
    company: 'Lindgren Group',
    email: 'Hattie42@gmail.com',
    fullname: 'Penelope Hettinger',
    phone: '854-306-7837',
  },
}
const invoices = [
  {
    _id: 'first-invoice',
    status: 'pending',
    ...sharedSettings
  },
  {
    _id: 'second-invoice',
    status: 'refunded',
    ...sharedSettings
  },
  {
    _id: 'third-invoice',
    status: 'paid',
    ...sharedSettings
  },
  {
    _id: 'fourth-invoice',
    status: 'cancelled',
    ...sharedSettings
  },
];

// Tests
describe('render component correctly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Invoices
        t={t}
        invoices={invoices}
        dispatch={dispatch}
      />
    );
  });

  it('receives correct props', () => {
    const mountWrapper = mount(
      <Invoices
        t={t}
        invoices={invoices}
        dispatch={dispatch}
      />
    );
    expect(mountWrapper.prop('t')).toEqual(t);
    expect(mountWrapper.prop('dispatch')).toEqual(dispatch);
    expect(mountWrapper.prop('invoices')).toEqual(invoices);
  });

  it('render correct number of invoices', () => {
    expect(wrapper.find(Invoice)).toHaveLength(invoices.length);
  });

  it('render empty message when there is no invoice in the DB', () => {
    const newWrapper = shallow(
      <Invoices
        t={t}
        invoices={[]}
        dispatch={dispatch}
      />
    );
    expect(newWrapper.find(Message)).toHaveLength(1);
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
      .create(
        <Invoices
          t={t}
          dispatch={dispatch}
          invoices={invoices}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('handle actions correcrtly', () => {
  let wrapper, spySetFilter, actions, filterBtn;
  beforeEach(() => {
    spySetFilter = jest.spyOn(Invoices.prototype, 'setFilter');
    wrapper = shallow(
      <Invoices
        t={t}
        invoices={invoices}
        dispatch={dispatch}
      />
    );
    actions = wrapper.find(PageHeaderActions).first();
    filterBtn = actions.find(Button).last();
    filterBtn.simulate('click', {
      target : {
        dataset : {
          filter: 'paid'
        }
      }
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
    const filteredInvoices = invoices.filter(invoice => invoice.status === filter);
    expect(wrapper.find(Invoice)).toHaveLength(filteredInvoices.length);
  });
});
