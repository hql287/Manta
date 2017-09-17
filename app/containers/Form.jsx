// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';

// Actions
import * as FormActions from '../actions/form';

// Components
import Recipient from '../components/form/Recipient';
import ItemsList from '../components/form/ItemsList';
import Currency from '../components/form/Currency';
import Discount from '../components/form/Discount';
import DueDate from '../components/form/DueDate';
import Vat from '../components/form/Vat';
import Note from '../components/form/Note';
import Settings from '../components/form/Settings';
import Button from '../components/shared/Button';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../components/shared/Layout';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Component
class Form extends Component {
  constructor(props) {
    super(props);
    this.toggleField        = this.toggleField.bind(this);
    this.saveFormData       = this.saveFormData.bind(this);
    this.clearFormData      = this.clearFormData.bind(this);
    this.updateFieldData    = this.updateFieldData.bind(this);
    this.toggleFormSettings = this.toggleFormSettings.bind(this);
  }

  // Optimization
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  // Toggle Form Settings
  toggleFormSettings() {
    const { dispatch } = this.props;
    dispatch(FormActions.toggleFormSettings());
  }

  // Save Form Data
  saveFormData() {
    const {dispatch} = this.props;
    dispatch(FormActions.saveFormData(true));
  }

  // Clear Form Data
  clearFormData() {
    const {dispatch} = this.props;
    dispatch(FormActions.clearForm());
  }

  // Toggle Field
  toggleField(field) {
    const {dispatch} = this.props;
    dispatch(FormActions.toggleField(field));
  }

  // Update Field Data
  updateFieldData(field, data) {
    const {dispatch} = this.props;
    dispatch(FormActions.updateFieldData(field, data));
  }

  // Render The form
  render() {
    const {
      dueDate,
      currency,
      discount,
      vat,
      note,
    } = this.props.currentInvoice;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Create A New Invoice</PageHeaderTitle>
          <PageHeaderActions>
            <Button danger onClick={this.clearFormData}>
              Clear
            </Button>
            <Button primary onClick={this.saveFormData}>
              Save & Preview
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Settings
            toggleFormSettings={this.toggleFormSettings}
            toggleField={this.toggleField}
            currentInvoice={this.props.currentInvoice}
          />
          <Recipient />
          <ItemsList />
          {dueDate.required &&
            <DueDate
              dueDate={dueDate}
              updateFieldData={this.updateFieldData}
            />}
          {currency.required &&
            <Currency
              currency={currency}
              updateFieldData={this.updateFieldData}
            />}
          {discount.required &&
            <Discount
              discount={discount}
              updateFieldData={this.updateFieldData}
            />}
          {vat.required &&
            <Vat vat={vat} updateFieldData={this.updateFieldData} />}
          {note.required &&
            <Note note={note} updateFieldData={this.updateFieldData} />}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Form.propTypes = {
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
    vat: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    settingsOpen: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Export
export default compose(
  connect(state => ({ currentInvoice: state.FormReducer })),
  _withFadeInAnimation
)(Form);
