// Node Libs
const path = require('path');

// Electron Libs
const BrowserWindow = require('electron').remote.BrowserWindow;
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions/receipt.jsx';

// 3rd Party Libs
const appConfig = require('electron').remote.require('electron-settings');

// Templates
import DefaultTemplate from '../templates/default/DefaultTemplate.jsx';
import HostingTemplate from '../templates/hosting/HostingTemplate.jsx';
import ElegantTemplate from '../templates/elegant/ElegantTemplate.jsx';
import ClassicTemplate from '../templates/classic/ClassicTemplate.jsx';

// Component
class Receipt extends Component {
  // Before Mount
  componentWillMount = () => {
    this.setState(
      {
        template: appConfig.get('printOptions.template'),
        company: appConfig.get('info'),
        waiting: true,
      },
      () => {
        // Populate CSS
        this.populateCSS();
        // Make Theme Switcher Work
        this.updateThemeSwitcher();
        // Add Print Function
        this.addPrintFn();
      },
    );
  };

  // Once mounted
  componentDidMount = () => {
    // Add Event Listener
    ipc.on('update-preview', (event, receiptData) => {
      const {dispatch} = this.props;
      const setReceipt = bindActionCreators(
        ActionCreators.setReceipt,
        dispatch,
      );
      // Dispatch Action
      setReceipt(receiptData);
      // Update State
      this.setState({waiting: false});
    });
  };

  populateCSS = () => {
    let element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute(
      'href',
      path.join(
        __dirname,
        `../templates/${this.state.template}/assets/style.css`,
      ),
    );
    document.getElementsByTagName('head')[0].appendChild(element);
  };

  cleanCSS = () => {
    const currentCSSFiles = document.styleSheets;
    let linkNode = document.getElementsByTagName('link')[
      currentCSSFiles.length - 1
    ];
    linkNode.parentNode.removeChild(linkNode);
  };

  addPrintFn = () => {
    const {receipt} = this.props;
    const printPDFBtn = document.getElementById('printToPDF');
    printPDFBtn.addEventListener('click', event => {
      ipc.send('print-to-pdf', receipt._id);
    });
  };

  updateThemeSwitcher = () => {
    // Set value for the theme switcher via state
    const themeSwitcher = document.getElementById('themeSwitcher');
    themeSwitcher.value = this.state.template;
    // Also, add an event listener on change.
    // If a theme is changed, clean the old CSS and rerender the content
    themeSwitcher.addEventListener('change', event => {
      this.setState({template: event.target.value}, () => {
        this.cleanCSS();
        this.populateCSS();
      });
    });
  };

  // Render
  render = () => {
    const {receipt} = this.props;
    const data = {
      company: this.state.company,
      template: this.state.template,
      receipt,
    };
    if (this.state.waiting) {
      return <div>Waiting For Data...</div>;
    } else {
      switch (this.state.template) {
        case 'elegant': {
          return <ElegantTemplate data={data} />;
        }
        case 'hosting': {
          return <HostingTemplate data={data} />;
        }
        case 'classic': {
          return <ClassicTemplate data={data} />;
        }
        default: {
          return <DefaultTemplate data={data} />;
        }
      }
    }
  };
}

export default connect(state => ({
  receipt: state.ReceiptReducer,
}))(Receipt);
