// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import * as Actions from './actions/ui';

// Custom Components
import AppNav from './components/layout/AppNav';
import AppMain from './components/layout/AppMain';
import AppNoti from './components/layout/AppNoti';

// Layout
import {AppWrapper} from './components/shared/Layout';

// Components
class App extends Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.removeNoti = this.removeNoti.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.UI !== nextProps.UI;
  }

  changeTab(tabName) {
    const {dispatch} = this.props;
    dispatch(Actions.changeActiveTab(tabName));
  }

  removeNoti(id) {
    const {dispatch} = this.props;
    dispatch(Actions.removeNoti(id));
  }

  render() {
    const {activeTab, notifications} = this.props.UI;
    return (
      <AppWrapper>
        <AppNav activeTab={activeTab} changeTab={this.changeTab} />
        <AppMain activeTab={activeTab} />
        {notifications.length > 0
          ? <AppNoti
              notifications={notifications}
              removeNoti={this.removeNoti}
            />
          : null}
      </AppWrapper>
    );
  }
}

App.propTypes = {
  UI: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({UI: state.UIReducer}))(App);
