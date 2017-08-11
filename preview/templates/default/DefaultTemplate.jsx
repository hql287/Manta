// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Top from './components/Top.jsx';
import Information from './components/Information.jsx';
import MainContent from './components/MainContent.jsx';

// Component
class DefaultTemplate extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render = () => {
    const {company, invoice} = this.props.data;
    return (
      <div className="invoice-box">
        <Top company={company} invoice={invoice}/>
        <Information recipient={invoice.recipient} company={company} />
        <MainContent invoice={invoice} />
      </div>
    );
  };
}

export default DefaultTemplate;
