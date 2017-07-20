// Libs
import React, {Component} from 'react';

// Component
class ItemsRow extends Component {
  componentWillMount = () => {
    const {id, description, quantity, price, subtotal} = this.props.item;
    this.setState({
      id,
      description: description ? description : '',
      quantity: quantity ? quantity : 0,
      price: price ? price : 0,
      subtotal: subtotal ? subtotal : 0,
    });
  };

  updateDescription = event => {
    this.setState({description: event.target.value}, () => {
      this.uploadRowState();
    });
  };

  updateQuantity = event => {
    this.setState({quantity: event.target.value}, () => {
      this.updateSubtotal();
    });
  };

  updatePrice = event => {
    this.setState({price: event.target.value}, () => {
      this.updateSubtotal();
    });
  };

  updateSubtotal = () => {
    let currentPrice = this.state.price;
    let currentQuantity = this.state.quantity;
    let currentSubtotal = currentPrice * currentQuantity;
    this.setState({subtotal: currentSubtotal}, () => {
      this.uploadRowState();
    });
  };

  uploadRowState = () => {
    const {updateRow} = this.props;
    updateRow(this.state);
  };

  render = () => {
    return (
      <div className="itemDiv">
        <div className="itemDescription">
          <input
            type="text"
            value={this.state.description}
            onChange={this.updateDescription.bind(this)}
            placeholder="Description"
          />
        </div>
        <div className="itemPrice">
          <input
            type="number"
            value={this.state.price}
            onChange={this.updatePrice.bind(this)}
            placeholder="Price"
          />
        </div>
        <div className="itemQuantity">
          <input
            type="number"
            value={this.state.quantity}
            onChange={this.updateQuantity.bind(this)}
            placeholder="Quantity"
          />
        </div>
        <div className="itemSubtotal">
          <span>
            {this.state.subtotal}
          </span>
        </div>
        <div className="itemActions">
          { this.props.actions &&
            <a
              href="#"
              className="itemRemoveBtn"
              onClick={() => this.props.removeRow(this.state.id)}>
              <i className="ion-close-circled" />
            </a>
          }
        </div>
      </div>
    );
  };
}

export default ItemsRow;
