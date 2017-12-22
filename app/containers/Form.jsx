// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getCurrentInvoice} from '../reducers/FormReducer';

// Actions
import * as Actions from '../actions/form';
import {bindActionCreators} from 'redux';

// Components
import Recipient from '../components/form/Recipient';
import ItemsList from '../components/form/ItemsList';
import Currency from '../components/form/Currency';
import Discount from '../components/form/Discount';
import DueDate from '../components/form/DueDate';
import Tax from '../components/form/Tax';
import Note from '../components/form/Note';
import Settings from '../components/form/Settings';
import Button from '../components/shared/Button';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../components/shared/Layout';

// Component
class Form extends Component {
  // Optimization
  shouldComponentUpdate(nextProps) {
    return this.props.currentInvoice !== nextProps.currentInvoice;
  }

  // Render The form
  render() {
    const {
      clearForm,
      toggleField,
      saveFormData,
      updateFieldData,
      toggleFormSettings,
    } = this.props.boundActionCreators;
    const {dueDate, currency, discount, tax, note} = this.props.currentInvoice;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Create A New Invoice</PageHeaderTitle>
          <PageHeaderActions>
            <Button danger onClick={clearForm}>
              Clear
            </Button>
            <Button primary onClick={saveFormData}>
              Save & Preview
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Settings
            toggleField={toggleField}
            toggleFormSettings={toggleFormSettings}
            currentInvoice={this.props.currentInvoice}
          />
          <Recipient />
          <ItemsList />
          {dueDate.required && (
            <DueDate dueDate={dueDate} updateFieldData={updateFieldData} />
          )}
          {currency.required && (
            <Currency currency={currency} updateFieldData={updateFieldData} />
          )}
          {discount.required && (
            <Discount discount={discount} updateFieldData={updateFieldData} />
          )}
          {tax.required && <Tax tax={tax} updateFieldData={updateFieldData} />}
          {note.required && (
            <Note note={note} updateFieldData={updateFieldData} />
          )}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Form.propTypes = {
  boundActionCreators: PropTypes.shape({
    // Works but need to refactor to handle passed click event
    clearForm: PropTypes.func.isRequired,
    saveFormData: PropTypes.func.isRequired,
    toggleField: PropTypes.func.isRequired,
    toggleFormSettings: PropTypes.func.isRequired,
    updateFieldData: PropTypes.func.isRequired,
  }).isRequired,
  currentInvoice: PropTypes.shape({
    recipient: PropTypes.shape({
      newRecipient: PropTypes.bool.isRequired,
      select: PropTypes.object.isRequired,
      new: PropTypes.object.isRequired,
    }),
    rows: PropTypes.array.isRequired,
    dueDate: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
    discount: PropTypes.object.isRequired,
    tax: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    settingsOpen: PropTypes.bool.isRequired,
  }).isRequired,
};

// Map state & dispatch to props
const mapStateToProps = state => ({
  currentInvoice: getCurrentInvoice(state),
});

const mapDispatchToProps = dispatch => ({
  boundActionCreators: bindActionCreators(Actions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  _withFadeInAnimation
)(Form);
