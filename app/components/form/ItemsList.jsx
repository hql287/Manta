// Libs
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import * as Actions from '../../actions/form.jsx';

// DragnDrop
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Animation
import {Motion, spring} from 'react-motion';

// Custom Libs
import sounds from '../../../libs/sounds.js';

// Custom Component
import Button from '../shared/Button.jsx';
import { Section } from '../shared/Section';
import ItemRow from './ItemRow.jsx';

// Styles
import styled from 'styled-components';
const ItemsListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-app-region: no-drag;
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
    dispatch(Actions.addItem());
    // Play a sound
    sounds.play('ADD');
  };

  // Remove A Row
  removeRow = rowId => {
    const {dispatch} = this.props;
    dispatch(Actions.removeItem(rowId));
    // Play a sound
    sounds.play('REMOVE');
  };

  // Update Row Data
  updateRow = childComponentState => {
    const {dispatch} = this.props;
    dispatch(Actions.updateItem(childComponentState));
  };

  // Drag Row
  moveRow = (dragIndex, hoverIndex) => {
    const {dispatch} = this.props;
    dispatch(Actions.moveRow(dragIndex, hoverIndex));
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
      <Section>
        <ItemsListWrapper>
          <ItemsListHeader>
            <label className="itemLabel">Product/Service *</label>
          </ItemsListHeader>
          <Motion style={{height: spring(rows.length * 50)}}>
            {({height}) =>
              <ItemsListDiv style={{height: `${height}px`}}>
                {rowsComponent}
              </ItemsListDiv>}
          </Motion>
          <div className="itemsListActions">
            <ItemsListActionsBtn onClick={() => this.addRow()} primary>
              Add An Item
            </ItemsListActionsBtn>
          </div>
        </ItemsListWrapper>
      </Section>
    );
  };
}

// Map state to props & Add DragNDrop Context
ItemsList = connect(state => ({ currentInvoice: state.FormReducer }))(ItemsList);
ItemsList = DragDropContext(HTML5Backend)(ItemsList);

// Export
export default ItemsList;
