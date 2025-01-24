// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import TextareaAutosize from 'react-autosize-textarea';

// HOCs
import _withDraggable from './hoc/_withDraggable';

// Styles
import styled from 'styled-components';

const ItemDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1 auto;

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

const ItemDivTextArea = styled(TextareaAutosize)`
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
  }

  componentWillMount() {
    const { id, description, quantity, price, subtotal } = this.props.item;
    this.setState({
      id,
      description: description || '',
      price: price || '',
      quantity: quantity || '',
      subtotal: subtotal || '',
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
    this.setState({ [name]: value }, () => {
      this.uploadRowState();
    });
  }

  handleNumberInputChange(event) {
    const name = event.target.name;
    const eValue = event.target.value;
    const value = eValue === '' ? '' : parseFloat(eValue);
    this.setState({ [name]: value }, () => {
      this.updateSubtotal();
    });
  }

  updateSubtotal() {
    const currentPrice =
      this.state.price === '' ? 0 : parseFloat(this.state.price);
    const currentQuantity =
      this.state.quantity === '' ? 0 : parseFloat(this.state.quantity);
    let currentSubtotal;
    if (this.state.price === '' || this.state.quantity === '') {
      currentSubtotal = '';
    } else {
      currentSubtotal = currentPrice * currentQuantity;
    }
    this.setState({ subtotal: currentSubtotal }, () => {
      this.uploadRowState();
    });
  }

  uploadRowState() {
    const { updateRow } = this.props;
    updateRow(this.state);
  }

  removeRow() {
    this.props.removeRow(this.state.id);
  }

  render() {
    const { t, actions, hasHandler } = this.props;
    return (
      <ItemDiv>
        {hasHandler && (
          <div className="dragHandler">
            <i className="ion-grid" />
          </div>
        )}
        <div className="flex3">
          <ItemDivTextArea
            maxRows={4}
            name="description"
            contentEditable
            suppressContentEditableWarning
            value={this.state.description}
            onChange={this.handleTextInputChange}
            // onKeyDown={this.handleKeyDown}
            placeholder={t('form:fields:items:description')}
          />
        </div>

        <div className="flex1">
          <ItemDivInput
            name="price"
            type="number"
            step="0.01"
            value={this.state.price}
            onChange={this.handleNumberInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder={t('form:fields:items:price')}
          />
        </div>

        <div className="flex1">
          <ItemDivInput
            name="quantity"
            type="number"
            step="0.01"
            value={this.state.quantity}
            onChange={this.handleNumberInputChange}
            onKeyDown={this.handleKeyDown}
            placeholder={t('form:fields:items:quantity')}
          />
        </div>

        {(actions || hasHandler) && (
          <ItemActions>
            {actions && (
              <ItemRemoveBtn href="#" onClick={this.removeRow}>
                <i className="ion-close-circled" />
              </ItemRemoveBtn>
            )}
          </ItemActions>
        )}
      </ItemDiv>
    );
  }
}

ItemRow.propTypes = {
  actions: PropTypes.bool.isRequired,
  addItem: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  hasHandler: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
};

export default compose(_withDraggable)(ItemRow);
