// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const ipc = require('electron').ipcRenderer;

// Actions
import * as ActionsCreator from '../actions';

// Selector
import { getConfigs, getInvoice } from '../reducers';

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
import Template from '../components/sidebar/Template';
import Alignment from '../components/sidebar/Alignment';
import FontSize from '../components/sidebar/FontSize';
import Toggler from '../components/sidebar/Toggler';
import AccentColor from '../components/sidebar/AccentColor';
import Actions from '../components/sidebar/Actions';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.savePDF = this.savePDF.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAccentColorChange = this.handleAccentColorChange.bind(this);
    this.updateConfigs = this.updateConfigs.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.updateConfigs({ name, value });
  }

  handleAccentColorChange(color) {
    this.updateConfigs({ name: 'accentColor', value: color });
  }

  updateConfigs(config) {
    const { dispatch } = this.props;
    dispatch(
      ActionsCreator.updateConfigs({ name: config.name, value: config.value })
    );
  }

  savePDF() {
    const invoiceID = this.props.invoice._id;
    ipc.send('save-pdf', invoiceID);
  }

  render() {
    const { configs } = this.props;
    const { template, alignItems, fontSize, accentColor } = configs;
    return (
      <Wrapper>
        <Template
          template={template}
          handleInputChange={this.handleInputChange}
        />
        <Alignment
          alignItems={alignItems}
          handleInputChange={this.handleInputChange}
        />
        <FontSize
          fontSize={fontSize}
          handleInputChange={this.handleInputChange}
        />
        <Toggler configs={configs} handleInputChange={this.handleInputChange} />
        <AccentColor
          accentColor={accentColor}
          handleAccentColorChange={this.handleAccentColorChange}
        />
        <Actions savePDF={this.savePDF} />
      </Wrapper>
    );
  }
}

SideBar.propTypes = {
  configs: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  invoice: getInvoice(state),
  configs: getConfigs(state),
});

export default connect(mapStateToProps)(SideBar);
