// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Redux
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/form.jsx';
import { getRows } from '../../reducers/FormReducer';

// DragNDrop
import TransitionList from '../../components/shared/TransitionList';
import _withDragNDrop from './hoc/_withDragNDrop';

// Custom Component
import Button from '../shared/Button.jsx';
import { Section } from '../shared/Section';
import ItemRow from './ItemRow.jsx';

import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import * as TRANSLATION_LABELS from '../../constants/translations';

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
export class ItemsList extends PureComponent {
  componentDidMount() {
    const { rows, boundActionCreators } = this.props;
    if (!rows.length) {
      boundActionCreators.addItem();
    }
  }

  render() {
    // Bound Actions
    const { addItem, removeItem, updateItem } = this.props.boundActionCreators;
    // Item Rows
    const { rows } = this.props;
    const rowsComponent = rows.map((item, index) => (
      <ItemRow
        key={item.id}
        item={item}
        hasHandler={rows.length > 1}
        actions={index !== 0}
        updateRow={updateItem}
        removeRow={removeItem}
        addItem={addItem}
      />
    ));

    // Render
    return (
      <Section>
        <ItemsListWrapper>
          <ItemsListHeader>
            <label className="itemLabel">{ this.props.translate(TRANSLATION_LABELS.ITEMLIST_PRODUCT) }</label>
          </ItemsListHeader>
          <ItemsListDiv>
            <TransitionList componentHeight={50}>
              {rowsComponent}
            </TransitionList>
          </ItemsListDiv>
          <div className="itemsListActions">
            <ItemsListActionsBtn primary onClick={addItem}>
              { this.props.translate(TRANSLATION_LABELS.ITEMLIST_ADDITEM) }
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
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

const mapStateToProps = state => ({
  formState: state.form, // Make drag & drop works
  rows: getRows(state),
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code,
});

const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(Actions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  _withDragNDrop
)(ItemsList);
