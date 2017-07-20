// Libs
import React, {Component} from 'react';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import sounds from '../../../libs/sounds.js';

// Semantic UI Components
import {Button, List, Form} from 'semantic-ui-react';

// Custom Component
import ItemRow from './ItemRow.jsx';

// Component
class ItemsList extends Component {
  state = {
    rows: [],
    data: [],
  };

  componentWillMount = () => {
    this.addRow();
  };

  // Add A Row
  addRow = () => {
    // Create a unique id for each row
    let uuid = uuidv4();

    // Push new row to rows
    let currentRows = this.state.rows;
    currentRows.push(
      <ItemRow
        key={uuid}
        id={uuid}
        actions={currentRows.length ? true : false}
        updateRow={this.updateRow}
        removeRow={this.removeRow}
      />,
    );

    // Push data holder to data
    let currentData = this.state.data;
    currentData.push({id: uuid});

    // Update state
    this.setState({
      rows: currentRows,
      data: currentData,
    });

    // Play a sound
    sounds.play('ADD');
  };

  // Remove A Row
  removeRow = uuid => {
    // Remove Row from Rows
    let currentRows = this.state.rows;
    let rowIndex = _.findIndex(currentRows, {key: uuid});
    currentRows.splice(rowIndex, 1);

    // Remove Row Data from Data
    let currentData = this.state.data;
    let dataIndex = _.findIndex(currentData, {key: uuid});
    currentData.splice(dataIndex, 1);

    // Update State
    this.setState({
      rows: currentRows,
      data: currentData,
    });

    // Play a sound
    sounds.play('REMOVE');
  };

  // Update Row Data
  updateRow = childComponentState => {
    let currentData = this.state.data;
    let rowIndex = _.findIndex(currentData, {id: childComponentState.id});
    // Update data
    currentData[rowIndex] = childComponentState;
    // Update State
    this.setState({
      data: currentData,
    });
  };

  // Save Data
  submitForm = () => {
    console.log('Data', this.state.data);
  };

  render = () => {
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

        {this.state.rows}
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

export default ItemsList;
