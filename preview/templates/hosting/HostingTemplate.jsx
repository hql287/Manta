// React Libraries
import React, {Component} from 'react';

// Custom Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

// Component
class HostingTemplate extends Component {
  // Render
  render = () => {
    const {company, receipt, template} = this.props.data;
    return (
      <div>
        <Header template={template} company={company}/>
        <Main receipt={receipt}/>
      </div>
    );
  };
}

export default HostingTemplate;
