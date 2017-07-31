// Libraries
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class AppNav extends Component {
  render() {
    return (
      <ul className="sideBar">
        <li>
          <NavLink exact to="/">
            <i id="icon-archive" className="ion-ios-box"></i>
            All
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/form">
            <i id="icon-form" className="ion-android-list"></i>
            New
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/settings">
            <i id="icon-settings" className="ion-ios-gear"></i>
            Settings
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default AppNav;
