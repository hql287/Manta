// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
class MainContent extends Component {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
  };

  getDiscount = () => {
    let discountTxt;
    const {discount} = this.props.receipt;
    if (discount.type === 'percentage') {
      discountTxt = `${discount.amount}%`;
    } else {
      discountTxt = `${this.props.receipt.currency} ${discount.amount}`;
    }
    return discountTxt;
  }

  getGrandTotal = () => {
    const {receipt} = this.props;
    let grandTotal = 0;
    receipt.rows.forEach((row, index) => {
      grandTotal += row.subtotal;
    });

    const discountAmount = receipt.discount.amount;
    if (receipt.discount.type === 'percentage') {
      grandTotal = grandTotal * (100 - discountAmount) / 100;
    } else {
      grandTotal -= discountAmount;
    }
    return `${this.props.receipt.currency} ${grandTotal}`;
  };

  render = () => {
    const {rows} = this.props.receipt;
    const rowsComponent = rows.map((row, index) => {
      return (
        <tr
          key={index}
          className={index + 1 == rows.length ? 'item last' : 'item'}>
          <td>
            {row.description}
          </td>
          <td>
            {row.subtotal}
          </td>
        </tr>
      );
    });

    return (
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr className="heading">
            <td>Item</td>
            <td>Subtotal</td>
          </tr>

          {rowsComponent}

          <tr className="total">
            <td />
            <td>
              Discount: {this.getDiscount()}
            </td>
          </tr>
          <tr className="total">
            <td />
            <td>
              Total: {this.getGrandTotal()}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
}

export default MainContent;
