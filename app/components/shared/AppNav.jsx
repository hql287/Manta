// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AppNav extends Component {
  render = () => {
    const {changeTab} = this.props;
    return (
      <div className="sideBarWrapper">
        <ul className="sideBar">
          <li>
            <a href="#" onClick={() => changeTab('form')}>
              <i id="icon-form" className="ion-android-list" />
              Create
            </a>
          </li>
          <li>
            <a href="#" onClick={() => changeTab('invoices')}>
              <i id="icon-archive" className="ion-ios-box" />
              Invoices
            </a>
          </li>
          <li>
            <a href="#" onClick={() => changeTab('contacts')}>
              <i id="icon-contacts" className="ion-person" />
              Contacts
            </a>
          </li>
          <li>
            <a href="#" onClick={() => changeTab('settings')}>
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
};

export default AppNav;
