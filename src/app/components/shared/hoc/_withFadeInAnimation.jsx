// Libs
import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';

function getDefaultStyles() {
  return [
    {
      key: 'randomString',
      style: {
        opacity: 0,
      },
    },
  ];
}

function getStyles() {
  return [
    {
      key: 'randomString',
      style: {
        opacity: spring(1, presets.gentle),
      },
    },
  ];
}

function willEnter() {
  return {
    opacity: 0,
  };
}

function willLeave() {
  return {
    opacity: spring(0, presets.gentle),
  };
}

// HOC Component
const _withFadeInTransition = ComposedComponent => props => {
  const wrapperStyle = { height: '100%' };
  return (
    <TransitionMotion
      willEnter={() => willEnter()}
      willLeave={() => willLeave()}
      defaultStyles={getDefaultStyles()}
      styles={getStyles()}
    >
      {values => (
        <div style={wrapperStyle}>
          {values.map(({ key, style }) => (
            <div key={key} style={{ ...style, ...wrapperStyle }}>
              <ComposedComponent {...props} />
            </div>
          ))}
        </div>
      )}
    </TransitionMotion>
  );
};

export default _withFadeInTransition;
