// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import * as Actions from '../actions/contacts';

// Custom Components
import Contact from '../components/contacts/Contact';
import Message from '../components/shared/Message';

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

  componentDidMount = () => {
    if (!this.props.contacts.loaded) {
      const {dispatch} = this.props;
      dispatch(Actions.getAllContacts());
    }
  };

  deleteContact = _id => {
    const {dispatch} = this.props;
    dispatch(Actions.deleteContact(_id));
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
