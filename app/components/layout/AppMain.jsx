// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Form from '../../containers/Form.jsx';
import Invoices from '../../containers/Invoices.jsx';
import Contacts from '../../containers/Contacts.jsx';
import Settings from '../../containers/Settings.jsx';

// Layout
import { AppMainContent } from '../shared/Layout';


class AppMain extends Component {
  render = () => {
    const {activeTab} = this.props;
    return (
      <AppMainContent>
        {activeTab === 'form' && <Form />}
        {activeTab === 'invoices' && <Invoices />}
        {activeTab === 'contacts' && <Contacts />}
        {activeTab === 'settings' && <Settings />}
      </AppMainContent>
    );
  };
}

AppMain.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default AppMain;
