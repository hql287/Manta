// Libraries
import React, {Component} from 'react';

// Custom Components
import AppNav from './components/shared/AppNav.jsx';
import AppMain from './components/shared/AppMain.jsx';

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
      <div className="appWrapper">
        <AppNav activeTab={this.state.activeTab} changeTab={this.changeTab} />
        <AppMain activeTab={this.state.activeTab} />
      </div>
    );
  };
}

export default App;
