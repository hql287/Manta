// Electron libs
const ipc  = require('electron').ipcRenderer;
const fs   = require('fs');
const path = require('path');
const glob = require('glob');
const Jimp = require('jimp');

// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Libs
const openDialog = require('../../renderers/dialog.js');
const dragNDrop = require('../../renderers/dragNdrop.js');

// Component
class Info extends Component {

    // Life Cycle Events
  componentWillMount = () => {
    this.setState(this.props.info);
  };

  componentDidMount = () => {
    // Handle Selected File
    ipc.on('file-selected', (event, filePath) => {
      this.handleLogoUpload(filePath);
    });
    // Handle Drag and Drop
    const logoDropzone = document.getElementById('logoDropzone');
    logoDropzone.addEventListener('dragenter', e => {
      e.preventDefault();
    });
    logoDropzone.addEventListener('dragleave', e => {
      e.preventDefault();
    });
    logoDropzone.addEventListener('dragover', e => {
      e.preventDefault();
    });
    logoDropzone.addEventListener('drop', e => {
      e.preventDefault();
      logoDropzone.classList.remove('dragover');
      const imageUrl = e.dataTransfer.files[0].path;
      this.handleLogoUpload(imageUrl);
    });
  };

  componentWillUnmount = () => {
    ipc.removeAllListeners('file-selected');
  };

    // Helper Functions
  resizeImage = filePath => {
    return new Promise((resolve, reject) => {
      Jimp.read(filePath, (err, file) => {
        if (err) {
          reject(err);
        } else {
          const fileExtention = file.getExtension();
          file
            .resize(100, Jimp.AUTO)
            .quality(100)
            .write(`./static/imgs/tmp/resizedlogo.${fileExtention}`, () => {
              const resizeImgPath = path.join(
                __dirname,
                `../../../static/imgs/tmp/resizedlogo.${fileExtention}`,
              );
              resolve(resizeImgPath);
            });
        }
      });
    });
  };

  convertResizedImageToBase64 = filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        // Error handler
        if (err) {
          reject(err);
        }
        // Get file extension
        let extensionName = path.extname(filePath);
        // Convert to base64-encoded string
        let base64Image = new Buffer(data, 'binary').toString('base64');
        // Combine all strings
        let imgSrcString = `data:image/${extensionName
          .split('.')
          .pop()};base64,${base64Image}`;
        resolve(imgSrcString);
      });
    });
  };

  cleanUpFiles = () => {
    const files = glob.sync(path.join(__dirname, '../../../static/imgs/tmp/*'));
    files.forEach(file => fs.unlinkSync(file));
  }

    // Handle Drag & Drop Upload
  handleLogoUpload = filepath => {
    this.resizeImage(filepath)
      .then(this.convertResizedImageToBase64)
      .then(imgSrcString => {
        this.setState({logo: imgSrcString}, () => {
          this.cleanUpFiles();
          this.updateInfoState();
        });
      });
  };

    // Handle Input Change
  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, () => {
      this.updateInfoState();
    });
  };

    // Select Logo from File
  selectLogo = () => {
    ipc.send('open-file-dialog');
  };

    // Remove Current Logo
  removeLogo = () => {
    this.setState({logo: null}, () => {
      this.updateInfoState();
    });
  };

    // Save Info Data
  updateInfoState = () => {
    const {updateInfo} = this.props;
    updateInfo(this.state);
  };

  render = () => {
    return (
      <div>
        <div className="pageItem">
          <label className="itemLabel">Logo</label>
          <div id="logoDropzone" className="logoDropzone">
            {this.state.logo
              ? <div className="logoImgWrapper">
                  <img className="logoImg" src={this.state.logo} alt="Logo" />
                  <a
                    href="#"
                    className="logoRemoveBtn"
                    onClick={() => this.removeLogo()}>
                    <i className="ion-android-cancel" />
                  </a>
                </div>
              : <div className="logoDropzoneInner" />}
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => this.selectLogo()}>
              Select Photo
            </a>
          </div>
        </div>
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Full Name</label>
            <input
              name="fullname"
              type="text"
              value={this.state.fullname}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Company</label>
            <input
              name="company"
              type="text"
              value={this.state.company}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Address</label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Email</label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Phone Number</label>
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Website</label>
            <input
              name="website"
              type="text"
              value={this.state.website}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
      </div>
    );
  };
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  updateInfo: PropTypes.func.isRequired,
};

export default Info;
