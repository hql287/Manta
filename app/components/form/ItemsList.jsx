// Libs
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// DragnDrop
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Animation
import {Motion, spring} from 'react-motion';

// Custom Libs
import sounds from '../../../libs/sounds.js';

// Custom Component
import Button from '../../components/shared/Button.jsx';
import ItemRow from './ItemRow.jsx';

// Styles
import styled from 'styled-components';
const ItemsListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-app-region: no-drag;
  margin-bottom: 30px;
`;

const ItemsListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
`;

const ItemsListActionsBtn = styled(Button)`
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    color: white;
  }
  &:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const ItemsListDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

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

  // Drag Row
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
          hasHandler={rows.length > 1 ? true : false}
          actions={index === 0 ? false : true}
          updateRow={this.updateRow}
          removeRow={this.removeRow}
          moveRow={this.moveRow}
        />
      );
    });
    return (
      <ItemsListWrapper>
        <ItemsListHeader>
          <div className="flex2">
            <label className="itemLabel">Description *</label>
          </div>
          <div className="flex1">
            <label className="itemLabel">Price *</label>
          </div>
          <div className="flex1">
            <label className="itemLabel ">Quantity *</label>
          </div>
        </ItemsListHeader>
        <Motion style={{height: spring(rows.length * 50)}}>
          {({height}) =>
            <ItemsListDiv style={{height: `${height}px`}}>
              {rowsComponent}
            </ItemsListDiv>}
        </Motion>
        <div className="itemsListActions">
          <ItemsListActionsBtn onClick={() => this.addRow()} primary>
            Add A Row
          </ItemsListActionsBtn>
        </div>
      </ItemsListWrapper>
    );
  };
}

export default connect(state => ({
  currentInvoice: state.FormReducer,
}))(DragDropContext(HTML5Backend)(ItemsList));
