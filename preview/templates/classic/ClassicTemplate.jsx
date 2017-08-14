// React Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

// Component
class ClassicTemplate extends Component {
  // Render
  render = () => {
    const {company, invoice} = this.props.data;
    return (
      <main>
        <Header invoice={invoice} />
        <Main invoice={invoice} />
        <Footer company={company} invoice={invoice} />
        {invoice.note &&
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              {invoice.note}
            </div>
          </div>}
      </main>
    );
  };
}

ClassicTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ClassicTemplate;
