// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const ipc = require('electron').ipcRenderer;

// Actions
import * as ActionsCreator from '../actions';

// Selectors
import { getConfigs, getInvoice, getProfile } from '../reducers';

// Styles
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
  padding-top: 30px;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  height: 100%;
  margin: 0;
`;

// Components
import Invoice from '../components/main/Invoice';

class MainContent extends PureComponent {
  componentDidMount() {
    ipc.on('update-preview', (event, invoiceData) => {
      const { dispatch } = this.props;
      dispatch(ActionsCreator.updateInvoice(invoiceData));
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners(['update-preview']);
  }

  render() {
    const { invoice, configs, profile } = this.props;
    return (
      <Wrapper>
        {invoice._id ? (
          <div className="print-area">
            <Invoice configs={configs} invoice={invoice} profile={profile} />
          </div>
        ) : (
          <Message>Choose An Invoice To Preview</Message>
        )}
      </Wrapper>
    );
  }
}

MainContent.propTypes = {
  configs: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  configs: getConfigs(state),
  invoice: getInvoice(state),
  profile: getProfile(state),
});

export default connect(mapStateToProps)(MainContent);
