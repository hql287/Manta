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

// Custom Component
import Button from '../shared/Button.jsx';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';

const LogoDropzone = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid #f2f3f4;
  border-radius: 4px;
  display: inline-flex;
  flex-direction: column;
`;

const LogoDropzoneInner = styled.div`
  display: flex;
  height: 100px;
  width: 100px;
  border: 2px dashed #b4b7ba;
  border-radius: 4px;
  margin-bottom: 20px;
  background: #f9fafa;
  padding: 20px;
  position: relative;
  &::before {
    content: "DRAG & DROP";
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
    color: #b4b7ba;
  }
`;

const LogoImgWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  &:hover a {
    opacity: 1;
    visibility: visible;
    color: #ec476e;
  }
`;

const LogoImg = styled.img`
  display: flex;
  max-width: 100px;
  align-self: center;
`;

const LogoRemoveBtn = styled.a`
  display: flex;
  position: absolute;
  font-size: 50px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f9fafa;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: .2s;
  transition: .2s;
`;

const LogoChangeBtn = styled(Button)`
  background: #469fe5;
  color: white;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
`;

// Component
class Info extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectLogo = this.selectLogo.bind(this);
    this.removeLogo = this.removeLogo.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.info);
  }

  componentDidMount() {
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
  }

  componentWillUnmount() {
    ipc.removeAllListeners('file-selected');
  };

  // Helper Functions
  resizeImage(filePath) {
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
                `../../../static/imgs/tmp/resizedlogo.${fileExtention}`
              );
              resolve(resizeImgPath);
            });
        }
      });
    });
  }

  convertResizedImageToBase64(filePath) {
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
  }

  cleanUpFiles() {
    const files = glob.sync(path.join(__dirname, '../../../static/imgs/tmp/*'));
    files.forEach(file => fs.unlinkSync(file));
  }

  // Handle Drag & Drop Upload
  handleLogoUpload(filepath) {
    this.resizeImage(filepath)
      .then(this.convertResizedImageToBase64)
      .then(imgSrcString => {
        this.setState({logo: imgSrcString}, () => {
          this.cleanUpFiles();
          this.updateInfoState();
        });
      });
  }

  // Handle Input Change
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value}, () => {
      this.props.updateSettings('info', this.state);
    });
  }

  // Update Info State
  updateInfoState() {
    this.props.updateSettings('info', this.state);
  }

  // Select Logo from File
  selectLogo() {
    ipc.send('open-file-dialog');
  }

  // Remove Current Logo
  removeLogo() {
    this.setState({logo: null}, () => {
      this.updateInfoState();
    });
  }

  render() {
    return (
      <div>
        <div className="pageItem">
          <label className="itemLabel">Logo</label>
          <LogoDropzone id="logoDropzone" >
            {this.state.logo
              ? <LogoImgWrapper>
                  <LogoImg src={this.state.logo} alt="Logo" />
                  <LogoRemoveBtn onClick={this.removeLogo}>
                    <i className="ion-android-cancel" />
                  </LogoRemoveBtn>
                </LogoImgWrapper>
              : <LogoDropzoneInner/>}
            <LogoChangeBtn primary onClick={this.selectLogo}>
              Select Photo
            </LogoChangeBtn>
          </LogoDropzone>
        </div>
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Full Name</label>
            <input
              name="fullname"
              type="text"
              value={this.state.fullname}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Company</label>
            <input
              name="company"
              type="text"
              value={this.state.company}
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Email</label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Website</label>
            <input
              name="website"
              type="text"
              value={this.state.website}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  info: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(Info);
