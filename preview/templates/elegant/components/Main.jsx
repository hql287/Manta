// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
        <td colSpan="3">DISCOUNT</td>
        <td className="total">
          {discountTxt}
        </td>
      </tr>
    );
  };

  render = () => {
    const {invoice} = this.props;
    const rowsComponents = invoice.rows.map((row, index) => {
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
            <tr>
              <td colSpan="3">SUBTOTAL</td>
              <td className="total">
                {invoice.currency} {invoice.subtotal}
              </td>
            </tr>
            { invoice.discount && this.getDiscount()}
            { invoice.vat &&
              <tr>
                <td colSpan="3">VAT</td>
                <td className="total">
                  {invoice.vat}%
                </td>
              </tr>
            }
            <tr>
              <td colSpan="3" className="grand total">
                GRAND TOTAL
              </td>
              <td className="grand total">
                {invoice.currency} {invoice.grandTotal}
              </td>
            </tr>
          </tbody>
        </table>
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
