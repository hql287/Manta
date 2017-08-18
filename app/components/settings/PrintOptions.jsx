// Electron libs
const ipc = require('electron').ipcRenderer;

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import currencies from '../../../libs/currencies.json';
const openDialog = require('../../renderers/dialog.js');

// Component
class PrintOptions extends Component {
  componentWillMount = () => {
    this.setState(this.props.printOptions);
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
      console.log(path);
      this.setState({exportDir: path}, () => {
        this.updatePrintOptionsState();
      });
    });
  };

  componentWillUnmount = () => {
    ipc.removeAllListeners('no-access-directory');
    ipc.removeAllListeners('confirmed-export-directory');
  };

  selectExportDir = () => {
    ipc.send('select-export-directory');
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value}, () => {
      this.updatePrintOptionsState();
    });
  };

  updatePrintOptionsState = () => {
    const {updatePrintOptions} = this.props;
    updatePrintOptions(this.state);
  };

  render = () => {
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
                onClick={() => this.selectExportDir()}>
                <i className="ion-folder" />
              </a>
            </div>
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Template</label>
            <select
              name="template"
              value={this.state.template}
              onChange={e => this.handleInputChange(e)}>
              <option value="default">Default</option>
              <option value="hosting">Hosting</option>
              <option value="elegant">Elegant</option>
              <option value="classic">Classic</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Margin Type</label>
            <select
              name="marginsType"
              value={this.state.marginsType}
              onChange={e => this.handleInputChange(e)}>
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
              onChange={e => this.handleInputChange(e)}>
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
              onChange={e => this.handleInputChange(e)}
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
              onChange={e => this.handleInputChange(e)}
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
              onChange={e => this.handleInputChange(e)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  };
}

PrintOptions.propTypes = {
  printOptions: PropTypes.object.isRequired,
  updatePrintOptions: PropTypes.func.isRequired,
};

export default PrintOptions;
