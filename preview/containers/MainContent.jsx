// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  overflow: auto;
  padding-top: 30px;
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  height: 100%;
  margin: 0;
`;

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
`;

// Components
import Minimal from '../templates/minimal';
import Business from '../templates/business';

class MainContent extends Component {
  renderTemplate() {
    switch (this.props.configs.template) {
      case 'business': {
        return <Business {...this.props} />;
      }
      default: {
        return <Minimal {...this.props} />;
      }
    }
  }

  render() {
    const { t, invoice  } = this.props;
    return (
      <Wrapper>
        {invoice._id ? (
          <div className="print-area">
            <Page>
              {this.renderTemplate()}
            </Page>
          </div>
        ) : (
          <Message>{t('preview:common:chooseInvoiceToPreview')}</Message>
        )}
      </Wrapper>
    );
  }
}

MainContent.propTypes = {
  configs: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  UILang: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default MainContent;
