// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import { Section, Label } from '../shared';

// Styles
import styled from 'styled-components';

const ColorPicker = styled.div`
  position: relative;
  width: 100%;
`;

const Swatch = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  padding: 4px;
  border-radius: 4px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: white;
`;

const Color = styled.div`
  flex: 1;
  border-radius: 2px;
  background: rgba(241, 112, 19, 1);
  ${props =>
    props.color &&
    `
    background: ${props.color};
  `};
`;

const Picker = styled.div`
  margin-top: 20px;
  position: absolute;
  zindex: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

class AccentColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      useCustom: props.accentColor.useCustom,
      color: props.accentColor.color,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props !== nextProps;
  }

  handleClick = () => {
    this.setState({ showPicker: !this.state.showPicker });
  }

  handleClose = () => {
    this.setState({ showPicker: false });
  }

  handleChange = (color) => {
    this.setState({ color: color.hex }, this.dispatchChange);
  }

  handleInputChange = (event) => {
    this.setState({ useCustom: event.target.checked }, this.dispatchChange);
  }

  dispatchChange = () => {
    this.props.handleAccentColorChange({
      color: this.state.color,
      useCustom: this.state.useCustom,
    });
  }

  render() {
    const defaultColors = [
      '#D9E3F0',
      '#F47373',
      '#697689',
      '#37D67A',
      '#2CCCE4',
      '#555555',
      '#dce775',
      '#ff8a65',
    ];
    return (
      <Section>
        <Label>Accent Color</Label>
        <label>
          <input
            type="checkbox"
            checked={this.state.useCustom}
            onChange={this.handleInputChange}
          />
          {'\u00A0'}
          Use Custom
        </label>
        <ColorPicker>
          <Swatch onClick={this.handleClick}>
            <Color color={this.state.color} />
          </Swatch>
          {this.state.showPicker ? (
            <Picker>
              <Cover onClick={this.handleClose} />
              <BlockPicker
                width={140}
                colors={defaultColors}
                color={this.state.color}
                onChange={this.handleChange}
              />
            </Picker>
          ) : null}
        </ColorPicker>
      </Section>
    );
  }
}

AccentColor.propTypes = {
  accentColor: PropTypes.object.isRequired,
  handleAccentColorChange: PropTypes.func.isRequired,
};

export default AccentColor;
