// Libraries
import React, {Component} from 'react';

// React Router
import {browserHistory} from 'history';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Custom Components
import AppNav from './components/shared/AppNav.jsx';
import Form from './containers/Form.jsx';
import Receipts from './containers/Receipts.jsx';
import Settings from './containers/Settings.jsx';
import Contacts from './containers/Contacts.jsx';

// Components
class App extends Component {
  render = () =>
    <Router history={browserHistory}>
      <div className="appWrapper">
        <div className="sideBarWrapper">
          <AppNav />
        </div>
        <div className="mainContentWrapper">
          <Route exact path="/" component={Receipts} />
          <Route path="/form" component={Form} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/settings" component={Settings} />
        </div>
      </div>
    </Router>;
}

export default App;
