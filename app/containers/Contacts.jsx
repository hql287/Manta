// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/contacts.jsx';

// Custom Components
import Contact from '../components/contacts/Contact.jsx';
import Message from '../components/shared/Message.jsx';

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
  } from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Component
class Contacts extends Component {

  componentWillMount = () => {
    if (!this.props.contacts.loaded) {
      const {dispatch} = this.props;
      const getAllContacts = bindActionCreators(
        ActionCreators.getAllContacts,
        dispatch,
      );
      getAllContacts();
    }
  };

  deleteContact = _id => {
    // Dispatch Action
    const {dispatch} = this.props;
    const deleteContact = bindActionCreators(
      ActionCreators.deleteContact,
      dispatch,
    );
    deleteContact(_id);
  };

  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-contact');
  }

  render = () => {
    const {contacts} = this.props;
    const contactsComponent = contacts.data.map((contact, index) => {
      return (
        <Contact
          key={contact._id}
          data={contact}
          index={index}
          deleteContact={this.deleteContact}
        />
      );
    });
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>All Contacts</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {contacts.data.length === 0
            ? <Message info text="You don't have any contacts yet!" />
            : <div className="row">
                {contactsComponent}
              </div>}
        </PageContent>
      </PageWrapper>
    );
  };
}

// PropTypes
Contacts.propTypes = {
  contacts: PropTypes.object.isRequired,
};

// Map state to props & Add Faded In Animation
Contacts = connect(state => ({ contacts: state.ContactsReducer }))(Contacts);
Contacts = _withFadeInAnimation(Contacts);

// Export
export default Contacts;
