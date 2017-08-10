// Libraries
import React, {Component} from 'react';

// Custom Components
import AppNav from './components/shared/AppNav.jsx';
import AppMain from './components/shared/AppMain.jsx';

// Components
class App extends Component {
  render = () =>
    <div className="appWrapper">
      <AppNav />
      <AppMain/>
    </div>;
}

export default App;
