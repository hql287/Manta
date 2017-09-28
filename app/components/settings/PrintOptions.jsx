// Electron libs
const ipc = require('electron').ipcRenderer;

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Libs
const openDialog = require('../../renderers/dialog.js');

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class PrintOptions extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectExportDir = this.selectExportDir.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.printOptions);
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
        this.props.updateSettings('printOptions', this.state);
      });
    });
  }

  componentWillUnmount() {
    ipc.removeAllListeners('no-access-directory');
    ipc.removeAllListeners('confirmed-export-directory');
  }

  selectExportDir() {
    ipc.send('select-export-directory');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value}, () => {
      this.props.updateSettings('printOptions', this.state);
    });
  }

  render() {
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
          <div className="pageItem col-md-6">
            <label className="itemLabel">Margin Type</label>
            <select
              name="marginsType"
              value={this.state.marginsType}
              onChange={this.handleInputChange}>
              <option value="0">Default Margin</option>
              <option value="1">No Margin</option>
              <option value="2">Minimum Margin</option>
            </select>
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Page Size</label>
            <select
              name="pageSize"
              value={this.state.pageSize}
              onChange={this.handleInputChange}>
              <option value="A3">A3</option>
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="Legal">Legal</option>
              <option value="Letter">Letter</option>
              <option value="Tabloid">Tabloid</option>
            </select>
          </div>
        </div>

        <div className="pageItem">
          <label className="itemLabel">Print Background</label>
          <label className="switch">
            <input
              name="printBackground"
              type="checkbox"
              checked={this.state.printBackground}
              onChange={this.handleInputChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="pageItem">
          <label className="itemLabel">Print Selection Only</label>
          <label className="switch">
            <input
              name="printSelectionOnly"
              type="checkbox"
              checked={this.state.printSelectionOnly}
              onChange={this.handleInputChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="pageItem">
          <label className="itemLabel">Landscape</label>
          <label className="switch">
            <input
              name="landscape"
              type="checkbox"
              checked={this.state.landscape}
              onChange={this.handleInputChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  }
}

PrintOptions.propTypes = {
  printOptions: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(PrintOptions);
