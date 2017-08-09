// Libraries
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class AppNav extends Component {
  render() {
    return (
      <ul className="sideBar">
        <li>
          <NavLink exact to="/">
            <i id="icon-archive" className="ion-ios-box" />
            Receipts
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/form">
            <i id="icon-form" className="ion-android-list" />
            New Receipt
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/contacts">
            <i id="icon-contacts" className="ion-person" />
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/settings">
            <i id="icon-settings" className="ion-ios-gear" />
            Settings
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default AppNav;
