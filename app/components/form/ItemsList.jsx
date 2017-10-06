// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/form.jsx';
import {getRows} from '../../reducers/FormReducer';

// DragNDrop & Animation
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TransitionList from '../../components/shared/TransitionList';

// Custom Component
import Button from '../shared/Button.jsx';
import {Section} from '../shared/Section';
import ItemRow from './ItemRow.jsx';

// Styled Components
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
export class ItemsList extends Component {
  componentDidMount() {
    const { rows, boundActionCreators } = this.props;
    if(!rows.length) {
      boundActionCreators.addItem();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const {
      addItem,
      moveRow,
      removeItem,
      updateItem,
    } = this.props.boundActionCreators;
    const {rows} = this.props;
    const rowsComponent = rows.map((item, index) => (
      <ItemRow
        key={item.id}
        item={item}
        index={index}
        hasHandler={rows.length > 1 ? true : false}
        actions={index === 0 ? false : true}
        updateRow={updateItem}
        removeRow={removeItem}
        moveRow={moveRow}
        addItem={addItem}
      />
    ));
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
            <ItemsListActionsBtn primary onClick={addItem}>
              Add An Item
            </ItemsListActionsBtn>
          </div>
        </ItemsListWrapper>
      </Section>
    );
  }
}

ItemsList.propTypes = {
  boundActionCreators: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  formState: state.form, // Make drag & drop works
  rows: getRows(state),
});

const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(Actions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(ItemsList);
