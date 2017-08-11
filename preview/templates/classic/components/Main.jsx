// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
class Main extends Component {
  static propTypes = {
    invoice: PropTypes.object.isRequired,
  };

  getSubtotal = () =>
    <tr>
      <td colSpan="3" className="sub">
        SUBTOTAL
      </td>
      <td className="sub total">
        {this.props.invoice.currency} {this.props.invoice.subtotal}
      </td>
    </tr>;

  getDiscount = () => {
    const { discount } = this.props.invoice;
    let discountTxt = '';
    if (discount.type === 'percentage') {
      discountTxt = `${discount.amount}%`;
    } else {
      discountTxt = `${this.props.invoice.currency} ${discount.amount}`;
    }
    return (
      <tr>
        <td colSpan="3">DISCOUNT</td>
        <td className="total">{ discountTxt }</td>
      </tr>
    );
  }

  getGrandTotal = () =>
    <tr>
      <td colSpan="3" className="grand total">
        GRAND TOTAL
      </td>
      <td className="grand total">
        {this.props.invoice.currency} {this.props.invoice.grandTotal}
      </td>
    </tr>;

  render = () => {
    const {invoice} = this.props;
    const rowsComponent = invoice.rows.map((row, index) => {
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
          {rowsComponent}
          {this.getSubtotal()}
          {this.getDiscount()}
          {this.getGrandTotal()}
        </tbody>
      </table>
    );
  };
}
export default Main;
