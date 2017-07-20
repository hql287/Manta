// Libraries
import React, {Component} from 'react';

// React Router
import {browserHistory} from 'history';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Custom Components
import AppNav from './components/shared/AppNav.jsx';
import Home from './containers/Home.jsx';
import Form from './containers/Form.jsx';
import Settings from './containers/Settings.jsx';

// Components
class App extends Component {
  render = () =>
    <Router history={browserHistory}>
      <div className="container">
        <AppNav />
        <Route exact path="/" component={Home} />
        <Route path="/form" component={Form} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>;
}

export default App;
