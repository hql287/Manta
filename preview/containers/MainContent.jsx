// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const ipc = require('electron').ipcRenderer;

// Actions
import * as InvoiceActions from '../actions/invoice';

// Selectors
import {getInvoice} from '../reducers/InvoiceReducer';
import {getTemplate, getConfigs} from '../reducers/SettingsReducer';

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
import Invoice from '../components/Invoice';

class MainContent extends Component {
  componentDidMount() {
    ipc.on('update-preview', (event, invoiceData) => {
      const {dispatch} = this.props;
      dispatch(InvoiceActions.updateInvoice(invoiceData));
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillUnmount() {
    ipc.removeAllListeners(['update-preview']);
  }

  render() {
    const {invoice, template, configs} = this.props;
    return (
      <Wrapper>
        {invoice._id
          ? <div className="print-area">
              <Invoice
                configs={configs}
                invoice={invoice}
                template={template}
              />
            </div>
          : <Message>Choose An Invoice To Preview</Message>}
      </Wrapper>
    );
  }
}

MainContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired,
  configs: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  invoice: getInvoice(state),
  template: getTemplate(state),
  configs: getConfigs(state),
});

export default connect(mapStateToProps)(MainContent);
