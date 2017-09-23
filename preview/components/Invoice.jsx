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
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 0 0 20px rgba(0,0,0,.1);
  display: flex;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
`;

// Templates
import Copywriter from '../templates/copywriter';

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
        return <Copywriter {...props} />;
      }
    }
  }

  render() {
    return this.props.invoice._id
      ? <Page>
          { this.renderTemplate() }
        </Page>
      : <Message>
          Choose An Invoice To Preview
        </Message>;
  }
}

Invoice.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired,
};

export default Invoice;
