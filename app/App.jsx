// Libraries
import React, {Component} from 'react';

// Custom Components
import AppNav from './components/layout/AppNav.jsx';
import AppMain from './components/layout/AppMain.jsx';

// Layout
import { AppWrapper } from './components/shared/Layout';

// Components
class App extends Component {
  componentWillMount = () => {
    this.setState({
      activeTab: 'form',
    });
  };

  changeTab = tabName => {
    this.setState({
      activeTab: tabName,
    });
  };

  render = () => {
    return (
      <AppWrapper>
        <AppNav activeTab={this.state.activeTab} changeTab={this.changeTab} />
        <AppMain activeTab={this.state.activeTab} />
      </AppWrapper>
    );
  };
}

export default App;
