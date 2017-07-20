// Libraries
import React, {Component} from 'react';

// Components
import ItemsList from '../components/form/ItemsList.jsx';

// Component
class Form extends Component {

  // Save Data
  saveData = () => {
    console.log('Data Saved');
  };

  render = () =>
    <div>
      <div className="formHeader">
        <h2>New Receipt</h2>
      </div>
      <ItemsList />
      <div className="bottomBarWrapper">
        <a href="#" onClick={() => this.saveData()}>
          <i className="ion-paper-airplane" />
        </a>
      </div>
    </div>;
}

export default Form;
