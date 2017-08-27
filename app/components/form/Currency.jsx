// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// 3rd Party Libs
import _ from 'lodash';
import currencies from '../../../libs/currencies.json';

// Component
class Currency extends Component {
  // Update Discount Amount
  updateCurrency = event => {
    const {dispatch} = this.props;
    const updateCurrency = bindActionCreators(
      ActionCreators.updateCurrency,
      dispatch,
    );
    updateCurrency(event.target.value);
  };

  render = () => {
    const currenciesKeys = _.keys(currencies);
    const currenciesOptions = currenciesKeys.map(key => {
      let optionKey = currencies[key]['code'];
      let optionValue = currencies[key]['code'];
      let optionLabel = currencies[key]['name'];
      return (
        <option value={optionValue} key={optionKey}>
          {optionLabel}
        </option>
      );
    });

    const {currency} = this.props.currentInvoice;

    return (
      <div className="formSection">
        <label className="itemLabel">Currency</label>
        <label className="switch">
          <input
            name="required"
            type="checkbox"
            checked={currency.required}
            onChange={() => this.props.toggleField('currency')}
          />
          <span className="slider round"></span>
        </label>
        { currency.required &&
          <select
            value={currency.selectedCurrency}
            onChange={e => this.updateCurrency(e)}>
            <option value={null}>Select A Currency</option>
            {currenciesOptions}
          </select>}
      </div>
    );
  };
}

export default connect(state => ({
  currentInvoice: state.FormReducer,
}))(Currency);
