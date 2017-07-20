// Libraries
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class AppNav extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/form">
          New
        </NavLink>
        <NavLink exact to="/settings">
          Settings
        </NavLink>
      </div>
    );
  }
}

export default AppNav;
