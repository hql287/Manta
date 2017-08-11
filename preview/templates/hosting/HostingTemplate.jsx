// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

// Component
class HostingTemplate extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  // Render
  render = () => {
    const {company, invoice} = this.props.data;
    return (
      <div>
        <Header company={company}/>
        <Main invoice={invoice}/>
      </div>
    );
  };
}

export default HostingTemplate;
