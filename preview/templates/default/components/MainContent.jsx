// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
class MainContent extends Component {
  getDiscount = () => {
    let discountTxt;
    const {discount} = this.props.invoice;
    if (discount.type === 'percentage') {
      discountTxt = `${discount.amount}%`;
    } else {
      discountTxt = `${this.props.invoice.currency} ${discount.amount}`;
    }
    return discountTxt;
  };

  render = () => {
    const {invoice} = this.props;
    const rowsComponent = invoice.rows.map((row, index) => {
      return (
        <tr
          key={index}
          className={index + 1 == invoice.rows.length ? 'item last' : 'item'}>
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
          {invoice.discount &&
            <tr className="total">
              <td />
              <td>
                Discount: {this.getDiscount()}{' '}
              </td>
            </tr>}
          <tr className="total">
            <td />
            <td>
              Total: {invoice.grandTotal}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
}

MainContent.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default MainContent;
