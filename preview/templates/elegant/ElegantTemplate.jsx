// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

// Component
class ElegantTemplate extends Component {
  // Render
  render = () => {
    const {company, invoice } = this.props.data;
    return (
      <div>
        <Header invoice={invoice} company={company}/>
        <Main invoice={invoice}/>
      </div>
    );
  };
}

ElegantTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ElegantTemplate;

