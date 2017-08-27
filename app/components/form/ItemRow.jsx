// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
const ItemDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 14px;
  flex: 1;

  & > div {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

const ItemDivInput = styled.input`
  min-height: 36px;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 16px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

const ItemActions = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 40px;
  margin: 0 !important;
  margin-left: 10px;
`;

const ItemRemoveBtn = styled.a`
  > i {
    color: #ec476e;
  }
`;

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

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, () => {
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
    const {actions, hasHandler} = this.props;
    return (
      <ItemDiv>
        <div className="flex2">
          <ItemDivInput
            name="description"
            type="text"
            value={this.state.description}
            onChange={e => this.handleInputChange(e)}
            placeholder="Description"
          />
        </div>

        <div className="flex1">
          <ItemDivInput
            name="price"
            type="number"
            value={this.state.price}
            onChange={e => this.handleInputChange(e)}
            placeholder="Price"
          />
        </div>

        <div className="flex1">
          <ItemDivInput
            name="quantity"
            type="number"
            value={this.state.quantity}
            onChange={e => this.handleInputChange(e)}
            placeholder="Quantity"
          />
        </div>

        {(actions || hasHandler) &&
          <ItemActions>
            {actions &&
              <ItemRemoveBtn
                href="#"
                onClick={() => this.props.removeRow(this.state.id)}>
                <i className="ion-close-circled" />
              </ItemRemoveBtn>}
          </ItemActions>}
      </ItemDiv>
    );
  };
}

ItemsRow.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  hasHandler: PropTypes.bool.isRequired,
  actions: PropTypes.bool.isRequired,
  updateRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  moveRow: PropTypes.func.isRequired,
};

export default ItemsRow;
