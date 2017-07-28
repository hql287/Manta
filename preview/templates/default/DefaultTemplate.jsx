// React Libraries
import React, {Component} from 'react';

import Top from './components/Top.jsx';
import Information from './components/Information.jsx';
import MainContent from './components/MainContent.jsx';

// Component
class DefaultTemplate extends Component {
  // Render
  render = () => {
    const {company, receipt, template} = this.props.data;
    return (
      <div className="invoice-box">
        <Top receipt={receipt} template={template}/>
        <Information company={company} />
        <MainContent receipt={receipt} />
      </div>
    );
  };
}

export default DefaultTemplate;
