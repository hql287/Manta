// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const ButtonsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > a {
    flex: 1;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    // align-items: center;
    padding: 4px 0;
    font-size: 12px;
    text-decoration: none;
    background: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #000;
    &:first-child {
      border-radius: 4px 0 0 4px;
      padding: 4px 12px;
      text-align: left;
      justify-content: flext-start;
      // align-items: flext-start;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
      border-left: none;
      max-width: 24px;
    }
  }
`;

const Addon = styled.div`
  &:before {
    content: ' ';
    height: 10px;
    width: 10px;
    position: absolute;
    top: -6px;
    right: 10px;
    transform: rotate(45deg);
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 42px;
  width: 100%;
  background: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: +999;
  a {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 6px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: black;
    width: 100%;
    text-align: left;
    z-index: 10;
    &:hover {
      text-decoration: none;
      background: #f9fafa;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

class SplitButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showOptions: false };
    this.handleMainAction = this.handleMainAction.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.renderListItems = this.renderListItems.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showOptions !== nextState.showOptions) {
      return true;
    }
    return false;
  }

  handleClick() {
    if (!this.state.showOptions) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState({ showOptions: !this.state.showOptions });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  handleMainAction(e) {
    this.setState({ showOptions: false }, () => {
      this.props.mainButton.action();
    });
  }

  renderListItems() {
    const { options } = this.props;
    return options.map(option => (
      <a
        key={option.label.toString()}
        href="#"
        onClick={() => {
          option.action();
          this.handleClick();
        }}
      >
        {option.label}
      </a>
    ));
  }

  render() {
    return (
      <div ref={node => (this.node = node)}>
        <Wrapper>
          <ButtonsGroup>
            <a href="#" onClick={this.handleMainAction}>
              {this.props.mainButton.label}
            </a>
            <a href="#" onClick={this.handleClick}>
              <i className="ion-arrow-down-b" />
            </a>
          </ButtonsGroup>
          {this.state.showOptions && <Addon>{this.renderListItems()}</Addon>}
        </Wrapper>
      </div>
    );
  }
}

SplitButton.propTypes = {
  mainButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default SplitButton;
