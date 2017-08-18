// Libs
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// DragnDrop
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

  moveRow = (dragIndex, hoverIndex) => {
    const {dispatch} = this.props;
    const moveRow = bindActionCreators(ActionCreators.moveRow, dispatch);
    moveRow(dragIndex, hoverIndex);
  };


  render = () => {
    const {rows} = this.props.currentInvoice;
    const rowsComponent = rows.map((item, index) => {
      return (
        <ItemRow
          key={item.id}
          item={item}
          index={index}
          activeHandler={rows.length > 1 ? true : false}
          actions={index === 0 ? false : true}
          updateRow={this.updateRow}
          removeRow={this.removeRow}
          moveRow={this.moveRow}
        />
      );
    });
    return (
      <div className="itemsListWrapper formSection non-draggable" onDragOver={this.dragOver}>
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
  currentInvoice: state.FormReducer,
}))(DragDropContext(HTML5Backend)(ItemsList));

