// Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;
const path = require('path');

// Actions
import * as Actions from '../actions/invoice.jsx';

// Style
import styled from 'styled-components';
const Wrapper = styled.div`
  height: 100%;
  padding-top: 80px;
`;

// Components
import TopBar from '../components/TopBar';
import Invoice from '../components/Invoice';

// Components
class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      template: appConfig.get('printOptions.template'),
    };
    this.printPDF       = this.printPDF.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
  }

  componentDidMount() {
    // Add Event Listener
    ipc.on('update-preview', (event, invoiceData) => {
      const {dispatch} = this.props;
      dispatch(Actions.setInvoice(invoiceData));
    });
    // Set Default CSS
    this.setNewTemplateCSS();
  }

  componentWillUnmount() {
    ipc.removeAllListeners(['update-preview']);
  }

  changeTemplate(event) {
    this.setState({ template: event.target.value }, () => {
      this.removeCurrentTemplateCSS();
      this.setNewTemplateCSS();
    });
  }

  setNewTemplateCSS() {
    let element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute(
      'href',
      path.join(
        __dirname,
        `../templates/${this.state.template}/assets/style.css`
      )
    );
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  removeCurrentTemplateCSS() {
    const allLinks = document.getElementsByTagName('link');
    const currentLink = allLinks[allLinks.length - 1];
    currentLink.parentNode.removeChild(currentLink);
  }

  printPDF() {
    const invoiceID = this.props.invoice._id;
    ipc.send('print-to-pdf', invoiceID);
  }

  render() {
    return (
      <Wrapper>
        <TopBar
          printPDF={this.printPDF}
          changeTemplate={this.changeTemplate}
        />
        <Invoice
          template={this.state.template}
          invoice={this.props.invoice}
        />
      </Wrapper>
    );
  }
}

Viewer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default connect(state => ({
  invoice: state.InvoiceReducer,
}))(Viewer);

