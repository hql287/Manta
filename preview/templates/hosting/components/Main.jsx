// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format');
const moment = require('moment');

// Component
class Main extends Component {
  getDiscount = () => {
    const {discount} = this.props.invoice;
    let discountTxt = '';
    if (discount.type === 'percentage') {
      discountTxt = `${discount.amount}%`;
    } else {
      discountTxt = `${this.props.invoice.currency} ${discount.amount}`;
    }
    return (
      <tr>
        <td colSpan="2" />
        <td colSpan="2">DISCOUNT</td>
        <td>
          {discountTxt}
        </td>
      </tr>
    );
  };

  render = () => {
    const {invoice} = this.props;
    const {recipient} = invoice;
    const rowsComponents = invoice.rows.map((row, index) => {
      return (
        <tr key={index}>
          <td className="no">
            {index + 1}
          </td>
          <td className="desc">
            {row.description}
          </td>
          <td className="unit">
            {row.price}
          </td>
          <td className="qty">
            {row.quantity}
          </td>
          <td className="total">
            {row.subtotal}
          </td>
        </tr>
      );
    });
    return (
      <main>
        <div id="details" className="clearfix">
          <div id="client">
            <div className="to">INVOICE TO:</div>
            <h2 className="name">
              {recipient.fullname}
            </h2>
            {recipient.company &&
              <div className="company">
                {recipient.company}
              </div>}
            <div className="email">
              {recipient.email}
            </div>
            {recipient.phone &&
              <div className="phone">
                {recipient.phone}
              </div>}
          </div>
          <div id="invoice">
            <h1>
              INVOICE:
              {_.truncate(invoice._id, {
                length: 8,
                omission: '',
              })}
            </h1>
            <div className="date">
              Date of Invoice: {format(invoice.created_at, 'DD/MM/YYYY')}
            </div>
            {invoice.dueDate &&
              <div className="date">
                Due Date: {moment(invoice.dueDate).format('DD/MM/YYYY')}
              </div>}
          </div>
        </div>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th className="no">#</th>
              <th className="desc">DESCRIPTION</th>
              <th className="unit">UNIT PRICE</th>
              <th className="qty">QUANTITY</th>
              <th className="total">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {rowsComponents}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" />
              <td colSpan="2">SUBTOTAL</td>
              <td>
                {invoice.currency} {invoice.subtotal}
              </td>
            </tr>
            {invoice.discount && this.getDiscount()}
            { invoice.vat &&
              <tr>
                <td colSpan="2" />
                <td colSpan="2">VAT</td>
                <td>
                  {invoice.vat}%
                </td>
              </tr>
            }
            <tr>
              <td colSpan="2" />
              <td colSpan="2">GRAND TOTAL</td>
              <td>
                {invoice.currency} {invoice.grandTotal}
              </td>
            </tr>
          </tfoot>
        </table>
        <div id="thanks">Thank you!</div>
        {invoice.note &&
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              {invoice.note}
            </div>
          </div>}
      </main>
    );
  };
}

Main.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default Main;
