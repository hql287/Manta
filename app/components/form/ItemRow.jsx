// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

// HOCs
import _withDraggable from './hoc/_withDraggable';

// Styles
import styled from 'styled-components';

const ItemDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
export class ItemRow extends Component {
  constructor(props) {
    super(props);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateSubtotal = this.updateSubtotal.bind(this);
    this.uploadRowState = this.uploadRowState.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  componentWillMount() {
    const {id, description, quantity, price, subtotal} = this.props.item;
    this.setState({
      id,
      description: description ? description : '',
      price: price ? price : '',
      quantity: quantity ? quantity : '',
      subtotal: subtotal ? subtotal : '',
    });
  }

  handleKeyDown(e) {
    if (e.which === 13) {
      this.props.addItem();
    }
  }

  handleTextInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, () => {
      this.uploadRowState();
    });
  }

  handleNumberInputChange(event) {
    const name   = event.target.name;
    const eValue = event.target.value;
    const value  = eValue === '' ? '' : parseInt(eValue, 10);
    this.setState({[name]: value}, () => {
      this.updateSubtotal();
    });
  }

  updateSubtotal() {
    const currentPrice = this.state.price === '' ? 0 : parseInt(this.state.price, 10);
    const currentQuantity = this.state.quantity === '' ? 0 : parseInt(this.state.quantity, 10);
    let currentSubtotal;
    if (this.state.price === '' || this.state.quantity === '') {
      currentSubtotal = '';
    } else {
      currentSubtotal = currentPrice * currentQuantity;
    }
    this.setState({subtotal: currentSubtotal}, () => {
      this.uploadRowState();
    });
  }

  uploadRowState() {
    const {updateRow} = this.props;
    updateRow(this.state);
  }

  removeRow() {
    this.props.removeRow(this.state.id);
  }

  // Since react-beautiful-dnd calls event.preventDefault()
  // on the mousedown event for the Draggable. Hence children element
  // such as input won't be aware of such event and can't be interactive with
  // This function overrides this behaviour
  // & making inputs interactive inside Draggable.
  // More: https://github.com/atlassian/react-beautiful-dnd
  // #interactive-child-elements-within-a-draggable
  stopPropagation(event) {
    event.stopPropagation();
  }

  render() {
    const {actions, hasHandler} = this.props;
    return (
      <ItemDiv>
        { hasHandler &&
          <div className="dragHandler">
            <i className="ion-grid" />
          </div>
        }
        <div className="flex3">
          <ItemDivInput
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleTextInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Description"
            onMouseDown={this.stopPropagation}
          />
        </div>

        <div className="flex1">
          <ItemDivInput
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleNumberInputChange}
            placeholder="Price"
            onKeyDown={this.handleKeyDown}
            onMouseDown={this.stopPropagation}
          />
        </div>

        <div className="flex1">
          <ItemDivInput
            name="quantity"
            type="number"
            value={this.state.quantity}
            onChange={this.handleNumberInputChange}
            placeholder="Quantity"
            onKeyDown={this.handleKeyDown}
            onMouseDown={this.stopPropagation}
          />
        </div>

        {(actions || hasHandler) &&
          <ItemActions>
            {actions &&
              <ItemRemoveBtn
                href="#"
                onClick={this.removeRow}>
                <i className="ion-close-circled" />
              </ItemRemoveBtn>}
          </ItemActions>}
      </ItemDiv>
    );
  }
}

ItemRow.propTypes = {
  actions:    PropTypes.bool.isRequired,
  addItem:    PropTypes.func.isRequired,
  hasHandler: PropTypes.bool.isRequired,
  item:       PropTypes.object.isRequired,
  removeRow:  PropTypes.func.isRequired,
  updateRow:  PropTypes.func.isRequired,
};

export default compose (
  _withDraggable
)(ItemRow);
