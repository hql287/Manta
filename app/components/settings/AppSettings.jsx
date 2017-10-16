// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
const ipc = require('electron').ipcRenderer;
import { keys } from 'lodash';

// Custom Libs
import currencies from '../../../libs/currencies.json';
const openDialog = require('../../renderers/dialog.js');
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class AppSettings extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectExportDir = this.selectExportDir.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.appSettings);
  }

  componentDidMount() {
    ipc.on('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: 'No Access Permisison',
        message: `${message}. Please choose a different directory!`,
      });
    });

    ipc.on('confirmed-export-directory', (event, path) => {
      this.setState({exportDir: path}, () => {
        this.props.updateSettings('appSettings', this.state);
      });
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('no-access-directory');
    ipc.removeAllListeners('confirmed-export-directory');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value}, () => {
      this.props.updateSettings('appSettings', this.state);
    });
  }

  selectExportDir() {
    ipc.send('select-export-directory');
  }

  render() {
    const currenciesKeys = keys(currencies);
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
          <div className="pageItem col-md-6">
            <label className="itemLabel">Export Directory</label>
            <div className="input-group">
              <input
                className="form-control"
                name="exportDir"
                type="text"
                value={this.state.exportDir}
                disabled
              />
              <a
                href="#"
                className="input-group-customized "
                onClick={this.selectExportDir}>
                <i className="ion-folder" />
              </a>
            </div>
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Template</label>
            <select
              name="template"
              value={this.state.template}
              onChange={this.handleInputChange}>
              <option value="minimal">Minimal</option>
              <option value="business">Business</option>
              <option value="modern">Modern</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Default Language</label>
              <select
                name="language"
                value={this.state.language}
                onChange={this.handleInputChange}>
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Default Currency</label>
              <select
                name="currency"
                value={this.state.currency}
                onChange={this.handleInputChange}>
                {currenciesOptions}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Sound</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={this.handleInputChange}>
                <option value="default">Default</option>
                <option value="cs">Counter Strike</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Muted?</label>
              <label className="switch">
                <input
                  name="muted"
                  type="checkbox"
                  checked={this.state.muted}
                  onChange={this.handleInputChange}
                />
                <span className="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppSettings.propTypes = {
  appSettings: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(AppSettings);
