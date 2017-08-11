// Libraries
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class AppNav extends Component {
  render = () =>
    <div className='sideBarWrapper'>
      <ul className='sideBar'>
        <li>
          <NavLink to='/form'>
            <i id='icon-form' className='ion-android-list' />
            Create
          </NavLink>
        </li>
        <li>
          <NavLink to='/invoices'>
            <i id='icon-archive' className='ion-ios-box' />
            Invoices
          </NavLink>
        </li>
        <li>
          <NavLink to='/contacts'>
            <i id='icon-contacts' className='ion-person' />
            Contacts
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings'>
            <i id='icon-settings' className='ion-ios-gear' />
            Settings
          </NavLink>
        </li>
      </ul>
    </div>;
}

export default AppNav;
