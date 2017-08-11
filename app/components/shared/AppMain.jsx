// Libraries
import React, {Component} from 'react';

// React Router
import {Redirect, Switch, Route} from 'react-router-dom';

// Custom Components
import Form from '../../containers/Form.jsx';
import Invoices from '../../containers/Invoices.jsx';
import Settings from '../../containers/Settings.jsx';
import Contacts from '../../containers/Contacts.jsx';

class AppMain extends Component {
  render = () =>
    <div className='mainContentWrapper'>
      <Redirect to='/form'/>
      <Switch>
        <Route path='/form' component={Form} />
        <Route path='/invoices' component={Invoices} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/settings' component={Settings} />
      </Switch>
    </div>;
}

export default AppMain;
