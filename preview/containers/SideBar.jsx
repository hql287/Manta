// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
  background: #F9FAFA;
  border-right: 1px solid rgba(0,0,0,.1);
  width: 180px;
  min-width: 180px;
  max-width: 180px;
  padding: 20px;
  justify-content: flex-start;
  > div:last-child {
    flex: 1
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
    this.updateConfigs = this.updateConfigs.bind(this);
    this.updateAccentColor = this.updateAccentColor.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  updateConfigs(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const { dispatch } = this.props;
    dispatch(ActionsCreator.updateConfigs({ name, value }));
  }

  updateAccentColor(color) {
    const { dispatch } = this.props;
    dispatch(ActionsCreator.updateConfigs({ name: 'accentColor', value: color }));
  }

  savePDF() {
    const invoiceID = this.props.invoice._id;
    ipc.send('save-pdf', invoiceID);
  }

  render() {
    const { template, configs } = this.props;
    return (
      <Wrapper>
        <Template
          configs={configs}
          updateConfigs={this.updateConfigs}/>
        <Alignment
          configs={configs}
          updateConfigs={this.updateConfigs}/>
        <FontSize
          configs={configs}
          updateConfigs={this.updateConfigs}/>
        <Toggler
          configs={configs}
          updateConfigs={this.updateConfigs}/>
        <AccentColor
          configs={configs}
          updateAccentColor={this.updateAccentColor}/>
        <Actions savePDF={this.savePDF}/>
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
