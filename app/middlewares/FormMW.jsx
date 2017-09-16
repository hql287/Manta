// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Actions
import * as FormActions from '../actions/form';
import * as InvoicesActions from '../actions/invoices';
import * as ContactsActions from '../actions/contacts';

// Helper
import { getInvoiceData, validateFormData } from '../helpers/form';

const FormMW = ({dispatch, getState}) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.FORM_SAVE: {
      const currentState = getState();
      const currentInvoice = currentState.FormReducer;

      // Validate Form Data
      if (!validateFormData(currentInvoice)) return;

      // Save To DB if it's a new contact
      if (currentInvoice.recipient.newRecipient) {
        const newContactData = currentInvoice.recipient.new;
        dispatch(ContactsActions.saveContact(newContactData));
      }

      // Save Invoice To DB
      const InvoiceData = getInvoiceData(currentInvoice);
      dispatch(InvoicesActions.saveInvoice(InvoiceData));

      // Clear The Form
      dispatch(FormActions.clearForm('muted'));
      break;
    }

    case ACTION_TYPES.FORM_CLEAR: {
      dispatch(FormActions.toggleFormSettings(false));
      next(action);
      break;
    }

    default: {
      next(action);
      break;
    }
  }
};

export default FormMW;
