// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';
import { Section, Label } from '../shared';

class AccentColor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(color) {
    this.props.handleAccentColorChange(color.hex);
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
    const { t, UILang, accentColor } = this.props;
    return (
      <Section>
        <Label>{t('preview:sidebar:accentColor:name', { lng: UILang })}</Label>
        <BlockPicker
          width="100%"
          colors={defaultColors}
          color={accentColor}
          onChange={this.handleChange}
          triangle="hide"
        />
      </Section>
    );
  }
}

AccentColor.propTypes = {
  accentColor: PropTypes.string.isRequired,
  handleAccentColorChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default AccentColor;
