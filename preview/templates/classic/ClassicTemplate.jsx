// React Libraries
import React, {Component} from 'react';

import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

// Component
class ClassicTemplate extends Component {
  // Render
  render = () => {
    const {company, receipt, template} = this.props.data;
    return (
      <main>
        <Header receipt={receipt}/>
        <Main receipt={receipt} />
        <Footer />
        {receipt.note &&
          <div id="notices">
            <div>NOTICE:</div>
            <div className="notice">
              {receipt.note}
            </div>
          </div>}
      </main>
    );
  };
}

export default ClassicTemplate;
