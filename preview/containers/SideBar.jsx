// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
const ipc = require('electron').ipcRenderer;

// Actions
import * as SettingsActions from '../actions/settings';

// Selector
import { getInvoice } from '../reducers/InvoiceReducer';
import { getTemplate, getConfigs } from '../reducers/SettingsReducer';

import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #F9FAFA;
  border-right: 1px solid rgba(0,0,0,.1);
  min-width: 180px;
  width: 180px;
  max-width: 180px;
  padding: 60px 20px 20px 20px;
  justify-content: space-between;
`;

// Components
import TemplateSwitcher from '../components/TemplateSwitcher';
import TemplateConfigs from '../components/TemplateConfigs';
import Actions from '../components/Actions';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.savePDF = this.savePDF.bind(this);
    this.changeTemplate = this.changeTemplate.bind(this);
    this.updateConfigs = this.updateConfigs.bind(this);
    this.updateAccentColor = this.updateAccentColor.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  changeTemplate(event) {
    const { dispatch } = this.props;
    dispatch(SettingsActions.changeTemplate(event.target.value));
  }

  updateConfigs(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { dispatch } = this.props;
    dispatch(SettingsActions.updateConfigs({ name, value }));
  }

  updateAccentColor(color) {
    const { dispatch } = this.props;
    dispatch(SettingsActions.updateConfigs({ name: 'accentColor', value: color }));
  }

  savePDF() {
    const invoiceID = this.props.invoice._id;
    ipc.send('save-pdf', invoiceID);
  }

  render() {
    const { template, configs } = this.props;
    return (
      <Wrapper>
        <TemplateSwitcher
          template={template}
          changeTemplate={this.changeTemplate}/>
        <TemplateConfigs
          configs={configs}
          updateConfigs={this.updateConfigs}
          updateAccentColor={this.updateAccentColor}
          />
        <Actions savePDF={this.savePDF}/>
      </Wrapper>
    );
  }
}

SideBar.propTypes = {
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

export default connect(mapStateToProps)(SideBar);
