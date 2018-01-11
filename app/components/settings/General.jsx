// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

import { exportDB, importDB } from '../../helpers/pouchDB.js';
const openDialog = require('../../renderers/dialog');
const ipc = require('electron').ipcRenderer;

// Component
class General extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectExportPath = this.selectExportPath.bind(this);
    this.selectImportPath = this.selectImportPath.bind(this);
    this.exportDBs = this.exportDBs.bind(this);
    this.importDBs = this.importDBs.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.general);
  }

  componentDidMount() {
    ipc.on('no-access-directory', (event, message) => {
      openDialog({
        type: 'warning',
        title: 'No Access Permission',
        message: `${message}. Please choose a different directory!`,
      });
    });

    ipc.on('confirmed-export-path', (event, path) => {
      this.setState({ exportPath: path }, () => {
        this.props.updateSettings('appSettings', this.state);
      });
    });

    ipc.on('confirmed-import-path', (event, path) => {
      this.setState({ importPath: path }, () => {
        this.props.updateSettings('appSettings', this.state);
      });
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('no-access-directory');
    ipc.removeAllListeners('confirmed-export-path');
    ipc.removeAllListeners('confirmed-import-path');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value }, () => {
      this.props.updateSettings('general', this.state);
    });
  }

  selectExportPath() {
    ipc.send('select-export-path');
  }

  selectImportPath() {
    ipc.send('select-import-path');
  }

  exportDBs() {
    this.selectExportPath();
    ipc.on('confirmed-export-path', (event, path) => {
      exportDB(path);
    });
  }

  importDBs() {
    this.selectImportPath();
    ipc.on('confirmed-import-path', (event, path) => {
      importDB(path);
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Sound</label>
              <select
                name="sound"
                value={this.state.sound}
                onChange={this.handleInputChange}
              >
                <option value="default">Default</option>
                <option value="cs">Counter Strike</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageItem">
              <label className="itemLabel">Mute Sound?</label>
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

          <div className="row">
            <div className="col-md-12">
              <div className="pageItem">
                <label className="itemLabel">Export / Import</label>
                <button onClick={this.exportDBs} className="button">
                  Export
                </button>
                <button onClick={this.importDBs} className="button">
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

General.propTypes = {
  general: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(General);
