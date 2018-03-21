// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ipc = require('electron').ipcRenderer;
import i18n from '../../i18n/i18n';

// Style
import styled from 'styled-components';
const OverflowWrapper = styled.div`
  min-width: 150px;
  width: 220px;
  max-width: 600px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: flex-start;
  background: #f9fafa;
  border-right: 1px solid #e0e1e1;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: min-content;
  padding: 20px;

  > div:last-child {
    flex: 1 0 auto;
  }
`;

// Components
import AccentColor from '../components/sidebar/AccentColor';
import Actions from '../components/sidebar/Actions';
import Alignment from '../components/sidebar/Alignment';
import DateFormat from '../components/sidebar/DateFormat';
import FontSize from '../components/sidebar/FontSize';
import LogoSize from '../components/sidebar/LogoSize';
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
    const { t, configs, invoice, UILang } = this.props;
    const {
      accentColor,
      alignItems,
      customAccentColor,
      dateFormat,
      fontSize,
      language,
      logoSize,
      showLogo,
      template,
    } = configs;
    return (
      <OverflowWrapper>
        <Wrapper>
          <Template
            t={t}
            UILang={UILang}
            template={template}
            handleInputChange={this.handleInputChange}
          />
          <Language
            t={t}
            UILang={UILang}
            language={language}
            handleInputChange={this.handleInputChange}
          />
          <DateFormat
            t={t}
            UILang={UILang}
            language={language}
            dateFormat={dateFormat}
            handleInputChange={this.handleInputChange}
          />
          <Alignment
            t={t}
            UILang={UILang}
            alignItems={alignItems}
            handleInputChange={this.handleInputChange}
          />
          <FontSize
            t={t}
            UILang={UILang}
            fontSize={fontSize}
            handleInputChange={this.handleInputChange}
          />
          { showLogo && (
            <LogoSize
              t={t}
              UILang={UILang}
              logoSize={logoSize}
              handleInputChange={this.handleInputChange}
            />
          )}
          <Toggler
            t={t}
            UILang={UILang}
            configs={configs}
            handleInputChange={this.handleInputChange}
          />
          { customAccentColor && (
            <AccentColor
              t={t}
              UILang={UILang}
              accentColor={accentColor}
              handleAccentColorChange={this.handleAccentColorChange}
            />
          )}
          <Actions
            t={t}
            UILang={UILang}
            savePDF={this.savePDF}
            saveConfigs={this.saveConfigs}
          />
        </Wrapper>
      </OverflowWrapper>
    );
  }
}

SideBar.propTypes = {
  configs: PropTypes.object.isRequired,
  updateConfigs: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
  invoice: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default SideBar;
