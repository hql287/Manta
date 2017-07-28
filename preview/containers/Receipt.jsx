// Node Libs
const path = require('path');

// Electron Libs
const BrowserWindow = require('electron').remote.BrowserWindow;
const ipc = require('electron').ipcRenderer;

// React Libraries
import React, {Component} from 'react';

// 3rd Party Libs
const appConfig = require('electron').remote.require('electron-settings');
const format    = require('date-fns/format');
const pug       = require('pug');
const _         = require('lodash');

// Templates
import DefaultTemplate from '../templates/default/DefaultTemplate.jsx';
import HostingTemplate from '../templates/hosting/HostingTemplate.jsx';
import ElegantTemplate from '../templates/elegant/ElegantTemplate.jsx';
import ClassicTemplate from '../templates/classic/ClassicTemplate.jsx';

// Component
class Receipt extends Component {
  // Before Mount
  componentWillMount = () => {
    // Set the template value
    const template = appConfig.get('settings.printOptions.template');
    const companyInfo = appConfig.get('settings.info');
    this.setState({
      company: companyInfo,
      template: template,
      receipt: this.props.receiptData,
    }, () => this.populateCSS());
  }

  // Once mounted
  componentDidMount = () => {
    // Make Theme Switcher Work
    this.updateThemeSwitcher();
    // Add Print Function
    this.addPrintFn();
  }

  populateCSS = () => {
    let element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('type', 'text/css');
    element.setAttribute('href', path.join(__dirname, `../templates/${this.state.template}/assets/style.css`));
    document.getElementsByTagName('head')[0].appendChild(element);
  }

  cleanCSS = () => {
    const currentCSSFiles = document.styleSheets;
    let linkNode = document.getElementsByTagName('link')[currentCSSFiles.length - 1];
    linkNode.parentNode.removeChild(linkNode);
  }

  addPrintFn = () => {
    const printPDFBtn = document.getElementById('printToPDF');
    printPDFBtn.addEventListener('click', event => {
      ipc.send('print-to-pdf', this.state.receipt._id);
    });
  }

  updateThemeSwitcher = () => {
    // Set value for the theme switcher via state
    const themeSwitcher = document.getElementById('themeSwitcher');
    themeSwitcher.value = this.state.template;
    // Also, add an event listener on change.
    // If a theme is changed,
    // Clean the old CSS and rerender the content
    themeSwitcher.addEventListener('change', event => {
      this.setState({template: event.target.value}, () => {
        this.cleanCSS();
        this.populateCSS();
      });
    });
  }

  // Render
  render = () => {
    switch (this.state.template) {
      case 'elegant': {
        return <ElegantTemplate data={this.state}/>
      }
      case 'hosting': {
        return <HostingTemplate data={this.state}/>;
      }
      case 'classic': {
        return <ClassicTemplate data={this.state}/>;
      }
      default: {
        return <DefaultTemplate data={this.state}/>;
      }
    }
  };
}

export default Receipt;
