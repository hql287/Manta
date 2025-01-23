// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// DragNDrop
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// Helpers
import { processImg } from '../../../../helpers/image';

// Node Libs
import { ipcRenderer as ipc } from 'electron';

// Component
import TargetBox from './TargetBox';

// Styles
import styled from 'styled-components';

const LogoContainer = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoDisplayzone = styled.div`
  max-width: 160px;
  max-height: 160px;
  display: flex;
  img {
    max-width: 180px;
    width: 100%;
    height: auto;
  }
`;

const RemoveLogoBtn = styled.a`
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 32px;
  color: red;
  line-height: 32px;
  i {
    color: #ec476e;
  }
  &:hover {
    cursor: pointer;
  }
`;

const LogoDropzone = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const SelectLogoBtn = styled.a`
  position: absolute;
  bottom: 20px;
  width: 80%;
  background: #469fe5;
  border-radius: 4px;
  padding: 4px 8px;
  text-align: center;
  color: white !important;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  &:hover {
    cursor: pointer;
  }
`;

class Logo extends Component {
  constructor(props) {
    super(props);
    this.selectLogo = this.selectLogo.bind(this);
    this.removeLogo = this.removeLogo.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
  }

  componentDidMount() {
    ipc.on('file-selected', (event, filePath) => {
      this.handleFileUpload(filePath);
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.logo !== nextProps.logo;
  }

  componentWillUnmount() {
    ipc.removeAllListeners('file-selected');
  }

  handleFileUpload(filePath) {
    processImg(filePath, imgSrcString => {
      this.props.handleLogoChange(imgSrcString);
    });
  }

  handleFileDrop(item, monitor) {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      const filePath = droppedFiles[0].path;
      this.handleFileUpload(filePath);
    }
  }

  selectLogo() {
    ipc.send('open-file-dialog');
  }

  removeLogo() {
    this.props.handleLogoChange(null);
  }

  render() {
    const { FILE } = NativeTypes;
    return (
      <LogoContainer>
        {this.props.logo ? (
          <LogoDisplayzone>
            <img src={this.props.logo} alt="Logo" />
            <RemoveLogoBtn onClick={this.removeLogo}>
              <i className="ion-android-cancel" />
            </RemoveLogoBtn>
          </LogoDisplayzone>
        ) : (
          <LogoDropzone>
            <TargetBox
              accepts={[FILE]}
              selectLogo={this.selectLogo}
              onDrop={this.handleFileDrop}
            />
            <SelectLogoBtn onClick={this.selectLogo}>
              Or Select Photo
            </SelectLogoBtn>
          </LogoDropzone>
        )}
      </LogoContainer>
    );
  }
}

Logo.propTypes = {
  handleLogoChange: PropTypes.func.isRequired,
  logo: PropTypes.string,
};

Logo.defaultProps = {
  logo: null,
};

export default DragDropContext(HTML5Backend)(Logo);
