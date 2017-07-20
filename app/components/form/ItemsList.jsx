// Libs
import React, {Component} from 'react';
import sounds from '../../../libs/sounds.js';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/items.jsx';

// Custom Component
import ItemRow from './ItemRow.jsx';

// Component
class ItemsList extends Component {
  // Add A Row
  addRow = () => {
    const {dispatch} = this.props;
    const addRow = bindActionCreators(ActionCreators.addItem, dispatch);
    addRow();
    // Play a sound
    sounds.play('ADD');
  };

  // Remove A Row
  removeRow = rowId => {
    const {dispatch} = this.props;
    const removeRow = bindActionCreators(ActionCreators.removeItem, dispatch);
    removeRow(rowId);
    // Play a sound
    sounds.play('REMOVE');
  };

  // Update Row Data
  updateRow = childComponentState => {
    const {dispatch} = this.props;
    const updateRow = bindActionCreators(ActionCreators.updateItem, dispatch);
    updateRow(childComponentState);
  };

  // Save Data
  submitForm = () => {
    console.log('Data Saved');
  };

  render = () => {
    const {rows} = this.props.items;
    const rowsComponent = rows.map((item, index) => {
      return (
        <ItemRow
          key={item.id}
          item={item}
          updateRow={this.updateRow}
          removeRow={this.removeRow}
        />
      );
    });
    return (
      <div className="itemsListDiv">
        <div className="itemsListHeader">
          <div className="itemLabelDescription">
            <label className="itemLabel">Description *</label>
          </div>
          <div className="itemLabelPrice">
            <label className="itemLabel">Price *</label>
          </div>
          <div className="itemLabelQuantity">
            <label className="itemLabel ">Quantity *</label>
          </div>
          <div className="itemLabelSubtotal">
            <label className="itemLabel ">Subtotal</label>
          </div>
          <div className="itemLabelActions" />
        </div>

        {rowsComponent}

        <div className="formActions">
          <a href="#" className="btn btn-primary" onClick={() => this.addRow()}>
            Add A Row
          </a>
          <a
            href="#"
            className="btn btn-success"
            onClick={() => this.submitForm()}>
            Submit
          </a>
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  items: state.ItemsReducer,
}))(ItemsList);
