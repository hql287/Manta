// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Node Libs
import _ from 'lodash';

// Custom Libs
import currencies from '../../../libs/currencies.json';
const openDialog = require('../../renderers/dialog.js');

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class AppSettings extends Component {
  componentWillMount = () => {
    this.setState(this.props.appSettings);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value}, () => {
      this.updateAppSettingsState();
    });
  };

  updateAppSettingsState = () => {
    const {updateAppSettings} = this.props;
    updateAppSettings(this.state);
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

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Default Currency</label>
              <select
                name="currency"
                value={this.state.currency}
                onChange={e => this.handleInputChange(e)}>
                {currenciesOptions}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Sound</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={e => this.handleInputChange(e)}>
                <option value="default">Default</option>
                <option value="modern">Modern</option>
                <option value="cs">Counter Strike</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pageItem">
          <label className="itemLabel">Muted?</label>
          <label className="switch">
            <input
              name="muted"
              type="checkbox"
              checked={this.state.muted}
              onChange={e => this.handleInputChange(e)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  };
}

AppSettings.propTypes = {
  appSettings: PropTypes.object.isRequired,
  updateAppSettings: PropTypes.func.isRequired,
};

AppSettings =  _withFadeInAnimation(AppSettings);

export default AppSettings;
