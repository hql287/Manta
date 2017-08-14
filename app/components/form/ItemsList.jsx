// Libs
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// Custom Libs
import sounds from '../../../libs/sounds.js';

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

  render = () => {
    const {rows} = this.props.currentReceipt;
    const rowsComponent = rows.map((item, index) => {
      return (
        <ItemRow
          key={item.id}
          item={item}
          actions={index === 0 ? false : true}
          updateRow={this.updateRow}
          removeRow={this.removeRow}
        />
      );
    });
    return (
      <div className="itemsListWrapper formSection">
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
        </div>
        <div className="itemsListDiv">
          <ReactCSSTransitionGroup
            transitionName="itemList"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {rowsComponent}
          </ReactCSSTransitionGroup>
        </div>
        <div className="itemsListActions">
          <a href="#" className="btn btn-primary" onClick={() => this.addRow()}>
            Add A Row
          </a>
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  currentReceipt: state.FormReducer,
}))(ItemsList);
