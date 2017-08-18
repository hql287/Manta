// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AppNav extends Component {
  render = () => {
    const {activeTab, changeTab} = this.props;
    return (
      <div className="sideBarWrapper">
        <ul className="sideBar">
          <li>
            <a href="#"
              className={ activeTab === 'form' ? 'active' : '' }
              onClick={() => changeTab('form')}>
              <i id="icon-form" className="ion-android-list" />
              Create
            </a>
          </li>
          <li>
            <a href="#"
              className={ activeTab === 'invoices' ? 'active' : '' }
              onClick={() => changeTab('invoices')}>
              <i id="icon-archive" className="ion-ios-box" />
              Invoices
            </a>
          </li>
          <li>
            <a href="#"
              className={ activeTab === 'contacts' ? 'active' : '' }
              onClick={() => changeTab('contacts')}>
              <i id="icon-contacts" className="ion-person" />
              Contacts
            </a>
          </li>
          <li>
            <a href="#"
              className={ activeTab === 'settings' ? 'active' : '' }
              onClick={() => changeTab('settings')}>
              <i id="icon-settings" className="ion-ios-gear" />
              Settings
            </a>
          </li>
        </ul>
      </div>
    );
  };
}

AppNav.propTypes = {
  changeTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default AppNav;
