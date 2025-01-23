// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Motion
import { TransitionMotion, spring } from 'react-motion';

// HOC Componen
class TransitionList extends Component {
  constructor(props) {
    super(props);
    this.getDefaultStyles = this.getDefaultStyles.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  getDefaultStyles() {
    const { children, componentHeight } = this.props;
    const defaultStyles = children.map(child => ({
      key: child.key,
      data: { child },
      style: {
        height: componentHeight,
        opacity: 0,
      },
    }));
    return defaultStyles;
  }

  getStyles() {
    const { children, componentHeight } = this.props;
    const styles = children.map(child => ({
      key: child.key,
      data: { child },
      style: {
        height: spring(componentHeight),
        opacity: spring(1),
      },
    }));
    return styles;
  }

  willEnter() {
    return {
      height: 0,
      opacity: 0,
    };
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    };
  }

  render() {
    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={this.getStyles()}
        defaultStyles={this.getDefaultStyles()}
      >
        {values => (
          <div>
            {values.map(({ key, style, data }) => (
              <div key={key} style={style}>
                {data.child}
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    );
  }
}

TransitionList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  componentHeight: PropTypes.number.isRequired,
};

export default TransitionList;
