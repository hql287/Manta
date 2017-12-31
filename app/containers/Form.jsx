// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {getCurrentInvoice} from '../reducers/FormReducer';

// Actions
import * as FormActions from '../actions/form';
import * as SettingsActions from '../actions/settings';
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
  shouldComponentUpdate(nextProps) {
    return this.props.currentInvoice !== nextProps.currentInvoice;
  }

  render() {
    // Form & Settings Actions
    const {updateSettings} = this.props.boundSettingsActionCreators;
    const {
      clearForm,
      toggleField,
      saveFormData,
      updateFieldData,
      toggleFormSettings,
      saveFormSettings,
    } = this.props.boundFormActionCreators;
    // Form Value
    const {
      dueDate,
      currency,
      discount,
      tax,
      note,
      settings,
    } = this.props.currentInvoice;
    const {required_fields, open} = settings;
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
            settings={settings}
            saveFormSettings={saveFormSettings}
          />
          <Recipient />
          <ItemsList />
          {required_fields.dueDate && (
            <DueDate
              dueDate={dueDate}
              updateFieldData={updateFieldData} />
          )}
          {required_fields.currency && (
            <Currency
              currency={currency}
              savedSetting={settings.currency}
              updateFieldData={updateFieldData}
              saveFormSettings={saveFormSettings}
            />
          )}
          {required_fields.discount && (
            <Discount
              discount={discount}
              updateFieldData={updateFieldData} />
          )}
          {required_fields.tax && (
            <Tax
              tax={tax}
              savedSetting={settings.tax}
              updateFieldData={updateFieldData}
              saveFormSettings={saveFormSettings}
            />
          )}
          {required_fields.note && (
            <Note
              note={note}
              updateFieldData={updateFieldData} />
          )}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Form.propTypes = {
  boundFormActionCreators: PropTypes.shape({
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
    settings: PropTypes.object.isRequired,
  }).isRequired,
};

// Map state & dispatch to props
const mapStateToProps = state => ({
  currentInvoice: getCurrentInvoice(state),
});

const mapDispatchToProps = dispatch => ({
  boundFormActionCreators: bindActionCreators(FormActions, dispatch),
  boundSettingsActionCreators: bindActionCreators(SettingsActions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  _withFadeInAnimation,
)(Form);
