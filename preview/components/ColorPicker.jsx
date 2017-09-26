import React from 'react';
import PropTypes from 'prop-types';
import {BlockPicker} from 'react-color';

// Styles
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Swatch = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  padding: 4px;
  border-radius: 4px;
  border: solid 1px rgba(0,0,0,.1);
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
    background: rgba(
      ${props.color.r},
      ${props.color.g},
      ${props.color.b},
      ${props.color.a}
    );
  `};
`;

const Picker = styled.div`
  margin-top: 20px;
  position: absolute;
  zIndex: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

// Component
class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      color: {
        r: 241,
        g: 112,
        b: 19,
        a: 1,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Toggle Picker
  handleClick() {
    this.setState({showPicker: !this.state.showPicker});
  }

  // Close Picker
  handleClose() {
    this.setState({showPicker: false});
  }

  // Change Color
  handleChange(color) {
    const {updateAccentColor} = this.props;
    this.setState({color: color.rgb}, () => {
      updateAccentColor(this.state.color);
    });
  }

  render() {
    return (
      <Wrapper>
        <Swatch  onClick={this.handleClick}>
          <Color color={this.state.color} />
        </Swatch>
        {this.state.showPicker
          ? <Picker>
              <Cover onClick={this.handleClose} />
              <BlockPicker
                width="140"
                colors={[
                  '#D9E3F0',
                  '#F47373',
                  '#697689',
                  '#37D67A',
                  '#2CCCE4',
                  '#555555',
                  '#dce775',
                  '#ff8a65',
                ]}
                color={this.state.color}
                onChange={this.handleChange}
              />
            </Picker>
          : null}
      </Wrapper>
    );
  }
}

ColorPicker.propTypes = {
  updateAccentColor: PropTypes.func.isRequired,
};

export default ColorPicker;
