// Electron libs
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import * as Actions from '../actions/invoices';

// Layout
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
  PageFooter,
  } from '../components/shared/Layout';

// Animation
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Custom Components
import Invoice from '../components/invoices/Invoice';
import Message from '../components/shared/Message';

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
  // Once Mounted, add event listeners
  // on opening and open preview window events
  componentDidMount = () => {
    if (!this.props.invoices.loaded) {
      const {dispatch} = this.props;
      dispatch(Actions.getInvoices());
    }
  };

  // Remove all IPC listeners once all reciepts
  // are removed or the compornent is unmounted
  componentWillUnmount() {
    ipc.removeAllListeners('confirmed-delete-invoice');
  }

  // Delete a invoice
  deleteInvoice = id => {
    const {dispatch} = this.props;
    dispatch(Actions.deleteInvoice(id));
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
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>All Invoices</PageHeaderTitle>
        </PageHeader>
        <PageContent>
          {invoices.data.length === 0
            ? <Message info text="You don't have any invoice yet"/>
            : <InvoicesContainer>
                {invoicesComponent}
              </InvoicesContainer>}
        </PageContent>
      </PageWrapper>
    );
  };
}

// PropTypes Validation
Invoices.propTypes = {
  invoices: PropTypes.object.isRequired,
};

// Map state to props & Add Faded In Animation
Invoices = connect(state => ({ invoices: state.InvoicesReducer }))(Invoices);
Invoices = _withFadeInAnimation(Invoices);

// Export
export default  Invoices;
