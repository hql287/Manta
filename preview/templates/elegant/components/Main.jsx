// React Libraries
import React, {Component} from 'react';

// 3rd Party Libs
const format = require('date-fns/format');
const _ = require('lodash');

// Component
class Main extends Component {
  getDiscount = () => {
    const {discount} = this.props.receipt;
    let discountTxt = '';
    if (discount.type === 'percentage') {
      discountTxt = `${discount.amount}%`;
    } else {
      discountTxt = `${this.props.receipt.currency} ${discount.amount}`;
    }
    return (
      <tr>
        <td colSpan="3">DISCOUNT</td>
        <td className="total">
          {discountTxt}
        </td>
      </tr>
    );
  };

  getSubtotal = () =>
    <tr>
      <td colSpan="3">SUBTOTAL</td>
      <td className="total">
        {this.props.receipt.currency} {this.props.receipt.subtotal}
      </td>
    </tr>;

  getGrandTotal = () =>
    <tr>
      <td colSpan="3" className="grand total">
        GRAND TOTAL
      </td>
      <td className="grand total">
        {this.props.receipt.currency} {this.props.receipt.grandTotal}
      </td>
    </tr>;

  render = () => {
    const {receipt} = this.props;
    const rowsComponents = receipt.rows.map((row, index) => {
      return (
        <tr key={index}>
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
        <table>
          <thead>
            <tr>
              <th className="desc">DESCRIPTION</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {rowsComponents}
            {this.getSubtotal()}
            {this.getDiscount()}
            {this.getGrandTotal()}
          </tbody>
        </table>
        {this.props.receipt.note &&
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              {this.props.receipt.note}
            </div>
          </div>}
      </main>
    );
  };
}
export default Main;
