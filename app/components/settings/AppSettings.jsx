// Electron libs
const ipc = require('electron').ipcRenderer;

// Libraries
import React, {Component} from 'react';

// Node Libs
import _ from 'lodash';

// Custom Libs
import currencies from '../../../libs/currencies.json';
const openDialog = require('../../renderers/dialog.js');

// Component
class AppSettings extends Component {
  componentWillMount = () => {
    if (this.props.appSettings !== undefined) {
      this.setState(this.props.appSettings);
    } else {
      this.setState({
        currency: 'USD',
        sound: 'default',
        muted: false,
        exportDir: '',
      });
    }
  };

  componentDidMount = () => {
    ipc.on('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: 'No Access Permisison',
        message: `${message}. Please choose a different directory!`,
      });
    });

    ipc.on('confirmed-export-directory', (event, path) => {
      this.setState({exportDir: path}, () => {
        this.updateAppSettingsState();
      });
    });
  };

  componentWillUnmount = () => {
    ipc.removeAllListeners('no-access-directory');
    ipc.removeAllListeners('confirmed-export-directory');
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value}, () => {
      this.updateAppSettingsState();
    });
  };

  selectExportDir = () => {
    ipc.send('select-export-directory');
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
        <div className="pageItem">
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
              onClick={() => this.selectExportDir()}>
              <i className="ion-folder" />
            </a>
          </div>
        </div>

        <div className="pageItem row">
          <div className="col-md-6">
            <label className="itemLabel">Default Currency</label>
            <select
              name="currency"
              value={this.state.currency}
              onChange={e => this.handleInputChange(e)}>
              {currenciesOptions}
            </select>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8">
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
              <div className="col-md-4">
                <label className="itemLabel">Muted?</label>
                <input
                  name="muted"
                  type="checkbox"
                  checked={this.state.muted}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AppSettings;
