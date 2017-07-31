// React Libraries
import React, {Component} from 'react';

// Custom Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

// Component
class ElegantTemplate extends Component {
  // Render
  render = () => {
    const {company, receipt } = this.props.data;
    return (
      <div>
        <Header receipt={receipt} company={company}/>
        <Main receipt={receipt}/>
      </div>
    );
  };
}

export default ElegantTemplate;

