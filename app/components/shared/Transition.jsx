// Libs
import React, {Component} from 'react';
import {TransitionMotion, spring} from 'react-motion';

// HOC Componen
class Transition extends Component {
  constructor(props) {
    super(props);
    this.getDefaultStyles = this.getDefaultStyles.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.willEnter = this.willEnter.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  getDefaultStyles() {
    const {children} = this.props;
    const defaultStyles = children.map(child => {
      return {
        key: child.key,
        data: {child},
        style: {
          height: 0,
          opacity: 1,
        },
      };
    });
    return defaultStyles;
  }

  getStyles() {
    const {children} = this.props;
    const styles = children.map(child => {
      return {
        key: child.key,
        data: {child},
        style: {
          height: spring(60),
          opacity: spring(1),
        },
      };
    });
    return styles;
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
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
        defaultStyles={this.getDefaultStyles()}>
        {values =>
          <div>
            {values.map(({key, style, data}) =>
              <div key={key} style={style}>
                {data.child}
              </div>
            )}
          </div>}
      </TransitionMotion>
    );
  }
}

export default Transition;
