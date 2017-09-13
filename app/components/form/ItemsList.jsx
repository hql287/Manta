// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/form.jsx';

// DragnDrop
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Animation
import TransitionList from '../../components/shared/TransitionList';

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
  constructor(props) {
    super(props);
    this.addRow    = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.updateRow = this.updateRow.bind(this);
    this.moveRow   = this.moveRow.bind(this);
  }

  // Add A Row
  addRow() {
    const {dispatch} = this.props;
    dispatch(Actions.addItem());
  }

  // Remove A Row
  removeRow(rowId) {
    const {dispatch} = this.props;
    dispatch(Actions.removeItem(rowId));
  }

  // Update Row Data
  updateRow(childComponentState) {
    const {dispatch} = this.props;
    dispatch(Actions.updateItem(childComponentState));
  };

  // Drag Row
  moveRow(dragIndex, hoverIndex) {
    const {dispatch} = this.props;
    dispatch(Actions.moveRow(dragIndex, hoverIndex));
  }

  render() {
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
          <ItemsListDiv>
            <TransitionList componentHeight={50}>
              {rowsComponent}
            </TransitionList>
          </ItemsListDiv>
          <div className="itemsListActions">
            <ItemsListActionsBtn
              primary
              onClick={this.addRow} >
              Add An Item
            </ItemsListActionsBtn>
          </div>
        </ItemsListWrapper>
      </Section>
    );
  }
}

ItemsList.propTypes = {
  currentInvoice: PropTypes.shape({
    recipient: PropTypes.shape({
      newRecipient: PropTypes.bool.isRequired,
      select: PropTypes.object.isRequired,
      new: PropTypes.object.isRequired,
    }),
    rows: PropTypes.array,
    dueDate:  PropTypes.object,
    currency: PropTypes.object,
    discount: PropTypes.object,
    vat:      PropTypes.object,
    note:     PropTypes.object,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Export
export default compose(
  connect(state => ({ currentInvoice: state.FormReducer })),
  DragDropContext(HTML5Backend)
)(ItemsList);
