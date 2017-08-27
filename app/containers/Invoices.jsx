// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/invoices.jsx';

// Custom Components
import Invoice from '../components/invoices/Invoice.jsx';
import EmptyMessage from '../components/shared/EmptyMessage.jsx';

// Styles
import styled from 'styled-components';

const InvoicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

// Component
class Invoices extends Component {
  state = { openPrevWinHint: false };

  // Will Mount
  componentWillMount = () => {
    if (!this.props.invoices.loaded) {
      const {dispatch} = this.props;
      const getInvoices = bindActionCreators(
        ActionCreators.getInvoices,
        dispatch,
      );
      getInvoices();
    }
  };

  // Once Mounted, add event listeners
  // on opening and open preview window events
  componentDidMount = () => {
    // Opening Event
    ipc.on('show-opening-preview-window-hint', event => {
      this.setState({openPrevWinHint: true});
    });
    // Opened Event
    ipc.on('hide-opening-preview-window-hint', event => {
      this.setState({openPrevWinHint: false});
    });
  };

  // Remove all IPC listeners once all reciepts are removed
  // Or the container is unmounted
  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-invoice');
    ipc.removeAllListeners('show-opening-preview-window-hint');
    ipc.removeAllListeners('hide-opening-preview-window-hint');
  }

  // Delete a invoice
  deleteInvoice = id => {
    // Dispatch Action
    const {dispatch} = this.props;
    const deleteInvoice = bindActionCreators(
      ActionCreators.deleteInvoice,
      dispatch,
    );
    deleteInvoice(id);
  };

  // Render
  render = () => {
    const {invoices} = this.props;
    const invoicesComponent = invoices.data.map((invoice, index) => {
      return (
        <Invoice
          key={invoice._id}
          deleteInvoice={this.deleteInvoice}
          index={index}
          data={invoice}
        />
      );
    });
    return (
      <div className="pageWrapper">
        <div className="pageHeader">
          <h4>All invoices</h4>
          <ReactCSSTransitionGroup
            transitionName="itemList"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.state.openPrevWinHint &&
              <span className="pageHint rotating">
                <i className="ion-ios-loop-strong" />
              </span>}
          </ReactCSSTransitionGroup>
        </div>
        {invoices.data.length === 0
          ? <EmptyMessage text="You don't have any invoice yet"/>
          : <div className="pageContent">
              <InvoicesContainer>
                {invoicesComponent}
              </InvoicesContainer>
            </div>}
      </div>
    );
  };
}

// PropTypes Validation
Invoices.propTypes = {
  invoices: PropTypes.object.isRequired,
};

export default connect(state => ({
  invoices: state.InvoicesReducer,
}))(Invoices);
