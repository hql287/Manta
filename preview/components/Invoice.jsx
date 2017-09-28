// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');

// Style
import styled from 'styled-components';

const Page = styled.div`
  position: relative;
  width: 21cm;
  height: 29.7cm;
  min-height: 29.7cm;
  min-width: 21cm;
  margin-left: auto;
  margin-right: auto;
  background: #FFFFFF;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  display: flex;
  border-radius: 4px;
}
`;

// Templates
import Minimal from '../templates/minimal';

// Component
class Invoice extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  renderTemplate() {
    const {invoice, template, configs} = this.props;
    const props = {
      company: appConfig.get('info'),
      invoice,
      configs,
    };
    switch (template) {
      default: {
        return <Minimal {...props} />;
      }
    }
  }

  render() {
    return (
      <Page>
        { this.renderTemplate() }
      </Page>
    );
  }
}

Invoice.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired,
};

export default Invoice;
