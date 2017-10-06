// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Actions
import * as FormActions from '../actions/form';
import * as InvoicesActions from '../actions/invoices';
import * as ContactsActions from '../actions/contacts';

// Helper
import {getInvoiceData, validateFormData} from '../helpers/form';
import uuidv4 from 'uuid/v4';

const FormMW = ({dispatch, getState}) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.FORM_SAVE: {
      const currentFormData = getState().form;
      // Validate Form Data
      if (!validateFormData(currentFormData)) return;
      // Save Invoice To DB
      const currentInvoiceData = getInvoiceData(currentFormData);
      dispatch(InvoicesActions.saveInvoice(currentInvoiceData));
      // Save Contact to DB if it's a new one
      if (currentFormData.recipient.newRecipient) {
        const newContactData = currentFormData.recipient.new;
        dispatch(ContactsActions.saveContact(newContactData));
      }
      // Clear The Form
      dispatch(FormActions.clearForm(true));
      break;
    }

    case ACTION_TYPES.FORM_ITEM_ADD: {
      return next(Object.assign({}, action, {
        payload: {id: uuidv4()}
      }));
    }

    case ACTION_TYPES.FORM_CLEAR: {
      // Close Setting Panel
      dispatch(FormActions.closeFormSettings());
      // Clear The Form
      next(action);
      // Create An item
      dispatch(FormActions.addItem());
      break;
    }

    default: {
      return next(action);
    }
  }
};

export default FormMW;
