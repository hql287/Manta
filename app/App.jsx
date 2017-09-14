// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const ipc = require('electron').ipcRenderer;

// Actions
import * as UIActions from './actions/ui';
import * as SettingsActions from './actions/settings';
import * as InvoicesActions from './actions/invoices';
import * as ContactsActions from './actions/contacts';

// Components
import AppNav from './components/layout/AppNav';
import AppMain from './components/layout/AppMain';
import AppNoti from './components/layout/AppNoti';
import {AppWrapper} from './components/shared/Layout';

// Components
class App extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.removeNoti = this.removeNoti.bind(this);
  }

  componentDidMount() {
    // Get All Data
    const {dispatch} = this.props;
    dispatch(SettingsActions.getInitalSettings());
    dispatch(ContactsActions.getAllContacts());
    dispatch(InvoicesActions.getInvoices());
    // Add Event Listener
    ipc.on('menu-change-tab', (event, tabName) => this.changeTab(tabName));
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.UI.activeTab !== nextProps.UI.activeTab ||
      this.props.UI.notifications !== nextProps.UI.notifications
    );
  }

  componentWillUnmount() {
    ipc.removeAllListeners(['menu-change-tab']);
  }

  changeTab(tabName) {
    const {dispatch} = this.props;
    dispatch(UIActions.changeActiveTab(tabName));
  }

  removeNoti(id) {
    const {dispatch} = this.props;
    dispatch(UIActions.removeNoti(id));
  }

  render() {
    const {activeTab, notifications} = this.props.UI;
    return (
      <AppWrapper>
        <AppNav activeTab={activeTab} changeTab={this.changeTab} />
        <AppMain activeTab={activeTab} />
        <AppNoti notifications={notifications} removeNoti={this.removeNoti} />
      </AppWrapper>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(state => ({
  UI: state.UIReducer,
}))(App);
