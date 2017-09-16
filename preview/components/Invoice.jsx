// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const appConfig = require('electron').remote.require('electron-settings');

// Style
import styled from 'styled-components';
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
import DefaultTemplate from '../templates/default/DefaultTemplate.jsx';
import HostingTemplate from '../templates/hosting/HostingTemplate.jsx';
import ElegantTemplate from '../templates/elegant/ElegantTemplate.jsx';
import ClassicTemplate from '../templates/classic/ClassicTemplate.jsx';

// Component
class Invoice extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  renderTemplate() {
    const {invoice, template} = this.props;
    const data = {
      company: appConfig.get('info'),
      invoice,
    };
    switch (template) {
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

  render() {
    return this.props.invoice._id
      ? this.renderTemplate()
      : <Message>
          Choose An Invoice To Preview
        </Message>;
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired,
};

export default Invoice;
