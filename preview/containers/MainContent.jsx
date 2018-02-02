// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { translate } from 'react-i18next';
const ipc = require('electron').ipcRenderer;
import { Notify } from '../helper/notify';

// Actions
import * as ActionsCreator from '../actions';

// Selectors
import { getConfigs, getInvoice, getProfile } from '../reducers';

// Styles
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
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

// Components
import Invoice from '../components/main/Invoice';

class MainContent extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    ipc.on('update-preview', (event, invoiceData) => {
      dispatch(ActionsCreator.updateInvoice(invoiceData));
    });
    ipc.on('update-preview-window', (event, newConfigs) => {
      dispatch(ActionsCreator.reloadConfigs(newConfigs));
    });
    ipc.on('pfd-exported', (event, options) => {
      const noti = Notify(options);
      // Handle click on notification
      noti.onclick = () => {
        ipc.send('reveal-file', options.location);
      };
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners([
      'pfd-exported',
      'update-preview',
      'update-preview-window',
    ]);
  }

  render() {
    const { t, invoice, configs, profile } = this.props;
    return (
      <Wrapper>
        {invoice._id ? (
          <div className="print-area">
            <Invoice
              t={t}
              configs={configs}
              invoice={invoice}
              profile={profile}
            />
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
  dispatch: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  configs: getConfigs(state),
  invoice: getInvoice(state),
  profile: getProfile(state),
});

export default compose(
  connect(mapStateToProps),
  translate(['common', 'preview'])
)(MainContent);
