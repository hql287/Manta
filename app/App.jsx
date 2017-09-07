// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import * as Actions from './actions/ui';

// Custom Components
import AppNav from './components/layout/AppNav';
import AppMain from './components/layout/AppMain';

// Layout
import { AppWrapper } from './components/shared/Layout';

// Components
class App extends Component {
  changeTab = tabName => {
    this.props.dispatch(Actions.changeActiveTab(tabName));
  };
  render = () => {
    const { activeTab } = this.props.UI;
    return (
      <AppWrapper>
        <AppNav activeTab={activeTab} changeTab={this.changeTab} />
        <AppMain activeTab={activeTab} />
      </AppWrapper>
    );
  };
}

export default connect(state => ({ UI: state.UIReducer }))(App);
