// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { getCurrentInvoice } from '../reducers/FormReducer';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import * as TRANSLATION_LABELS from '../constants/translations';

// Actions
import * as FormActions from '../actions/form';
import * as SettingsActions from '../actions/settings';
import { bindActionCreators } from 'redux';

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
    if (this.props.currentInvoice !== nextProps.currentInvoice) return true;
    return false;
  }

  render() {
    // Form & Settings Actions
    const { updateSettings } = this.props.boundSettingsActionCreators;
    const {
      clearForm,
      toggleField,
      saveFormData,
      updateFieldData,
      toggleFormSettings,
      updateSavedFormSettings,
    } = this.props.boundFormActionCreators;
    // Form Value
    const {
      dueDate,
      currency,
      discount,
      tax,
      note,
      settings,
      savedSettings,
    } = this.props.currentInvoice;
    const { required_fields, open, editMode } = settings;
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{ this.props.translate(TRANSLATION_LABELS.FRM_INVOICE_HEADING) }</PageHeaderTitle>
          <PageHeaderActions>
            <Button danger onClick={clearForm}>
              Clear
            </Button>
            <Button
              primary={editMode.active}
              success={editMode.active === false}
              onClick={saveFormData}
            >
              {editMode.active ? this.props.translate(TRANSLATION_LABELS.FRM_INVOICE_EDITMODE_UPDATE) : this.props.translate(TRANSLATION_LABELS.FRM_INVOICE_EDITMODE_SAVEPREVIEW)}
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <Settings
            toggleField={toggleField}
            toggleFormSettings={toggleFormSettings}
            settings={settings}
            savedSettings={savedSettings.required_fields}
            updateSavedSettings={updateSavedFormSettings}
            translate={this.props.translate}
          />
          <Recipient translate={this.props.translate} />
          <ItemsList translate={this.props.translate} />
          {required_fields.dueDate && (
            <DueDate dueDate={dueDate} updateFieldData={updateFieldData} translate={this.props.translate} />
          )}
          {required_fields.currency && (
            <Currency
              currency={currency}
              updateFieldData={updateFieldData}
              savedSettings={savedSettings.currency}
              updateSavedSettings={updateSavedFormSettings}
              translate={this.props.translate}
            />
          )}
          {required_fields.discount && (
            <Discount discount={discount} updateFieldData={updateFieldData} translate={this.props.translate} />
          )}
          {required_fields.tax && (
            <Tax
              tax={tax}
              updateFieldData={updateFieldData}
              savedSettings={savedSettings.tax}
              updateSavedSettings={updateSavedFormSettings}
              translate={this.props.translate}
            />
          )}
          {required_fields.note && (
            <Note note={note} updateFieldData={updateFieldData} translate={this.props.translate} />
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
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
};

// Map state & dispatch to props
const mapStateToProps = state => ({
  currentInvoice: getCurrentInvoice(state),
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code,
});

const mapDispatchToProps = dispatch => ({
  boundFormActionCreators: bindActionCreators(FormActions, dispatch),
  boundSettingsActionCreators: bindActionCreators(SettingsActions, dispatch),
});

// Export
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  _withFadeInAnimation
)(Form);
