// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const format = require('date-fns/format');
const _ = require('lodash');

// Component
class Main extends Component {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
  };

  getDiscount = () => {
    const { discount } = this.props.receipt;
    let discountTxt = '';
    if (discount.type === 'percentage') {
      discountTxt = `${discount.amount}%`;
    } else {
      discountTxt = `${this.props.receipt.currency} ${discount.amount}`;
    }
    return (
      <tr>
        <td colSpan="2"></td>
        <td colSpan="2">DISCOUNT</td>
        <td>{ discountTxt }</td>
      </tr>
    );
  }

  getSubtotal = () =>
    <tr>
      <td colSpan="2"></td>
      <td colSpan="2">SUBTOTAL</td>
      <td>{this.props.receipt.currency} {this.props.receipt.subtotal}</td>
    </tr>;

  getGrandTotal = () =>
    <tr>
      <td colSpan="2"></td>
      <td colSpan="2">GRAND TOTAL</td>
      <td>{this.props.receipt.currency} {this.props.receipt.grandTotal}</td>
    </tr>;

  render = () => {
    const { receipt } = this.props;
    const rowsComponents = receipt.rows.map((row, index) => {
      return (
        <tr key={index}>
          <td className="no">{ index + 1 }</td>
          <td className="desc">{ row.description }</td>
          <td className="unit">{ row.price }</td>
          <td className="qty">{ row.quantity }</td>
          <td className="total">{ row.subtotal }</td>
        </tr>
      );
    });
    return (
      <main>
        <div id="details" className="clearfix">
          <div id="client">
            <div className="to">INVOICE TO:</div>
            <h2 className="name">John Doe</h2>
            <div className="address">796 Silver Harbour, TX 79273, US</div>
          </div>
          <div id="invoice">
            <h1>
              INVOICE:
              {_.truncate(this.props.receipt._id, {
                length: 8,
                omission: '',
              })}
            </h1>
            <div className="date">
              Date of Invoice:
              {format(this.props.receipt.created_at, 'DD-MM-YYYY')}
            </div>
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
            { rowsComponents }
          </tbody>
          <tfoot>
            { this.getSubtotal() }
            { this.getDiscount() }
            { this.getGrandTotal() }
          </tfoot>
        </table>
        <div id="thanks">Thank you!</div>
        { this.props.receipt.note &&
        <div id="notices">
          <div>NOTICE:</div>
          <div className="notice">{ this.props.receipt.note }</div>
        </div>
        }
      </main>
    );
  }
}
export default Main;
