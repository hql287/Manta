// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ipc = require('electron').ipcRenderer;
import i18n from '../../i18n/i18n';

// Style
import styled from 'styled-components';
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f9fafa;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  width: 180px;
  min-width: 180px;
  max-width: 180px;
  padding: 20px;
  justify-content: flex-start;
  > div:last-child {
    flex: 1;
  }
`;

// Components
import AccentColor from '../components/sidebar/AccentColor';
import Actions from '../components/sidebar/Actions';
import Alignment from '../components/sidebar/Alignment';
import DateFormat from '../components/sidebar/DateFormat';
import FontSize from '../components/sidebar/FontSize';
import Language from '../components/sidebar/Language';
import Template from '../components/sidebar/Template';
import Toggler from '../components/sidebar/Toggler';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.savePDF = this.savePDF.bind(this);
    this.saveConfigs = this.saveConfigs.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAccentColorChange = this.handleAccentColorChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.updateConfigs({ name, value });
  }

  handleAccentColorChange(color) {
    this.props.updateConfigs({ name: 'accentColor', value: color });
  }

  savePDF() {
    const invoiceID = this.props.invoice._id;
    ipc.send('save-pdf', invoiceID);
    // Always save template configs to invocie when export to PDF
    this.saveConfigs();
  }

  saveConfigs() {
    const { configs, invoice } = this.props;
    const { _id: invoiceID } = invoice;
    ipc.send('save-configs-to-invoice', invoiceID, configs);
  }

  render() {
    const { t, configs } = this.props;
    const {
      dateFormat,
      template,
      language,
      alignItems,
      fontSize,
      accentColor
    } = configs;
    return (
      <Wrapper>
        <Language
          t={t}
          language={language}
          handleInputChange={this.handleInputChange}
        />
        <Template
          t={t}
          template={template}
          handleInputChange={this.handleInputChange}
        />
        <DateFormat
          t={t}
          language={language}
          dateFormat={dateFormat}
          handleInputChange={this.handleInputChange}
        />
        <Alignment
          t={t}
          alignItems={alignItems}
          handleInputChange={this.handleInputChange}
        />
        <FontSize
          t={t}
          fontSize={fontSize}
          handleInputChange={this.handleInputChange}
        />
        <Toggler
          t={t}
          configs={configs}
          handleInputChange={this.handleInputChange}
        />
        <AccentColor
          t={t}
          accentColor={accentColor}
          handleAccentColorChange={this.handleAccentColorChange}
        />
        <Actions
          t={t}
          savePDF={this.savePDF}
          saveConfigs={this.saveConfigs}
        />
      </Wrapper>
    );
  }
}

SideBar.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default SideBar;
