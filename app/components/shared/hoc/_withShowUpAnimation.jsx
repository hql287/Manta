// Libs
import React from 'react';

// Animation
import {Motion, spring} from 'react-motion';

// HOC Component
const _withShowUpAnimation = ComposedComponent => props => {
  return (
    <Motion
      defaultStyle={{marginBottom: -20}}
      style={{marginBottom: spring(0)}}>
      {({marginBottom}) =>
        <div style={{ marginBottom: `${marginBottom}px`}}>
          <ComposedComponent {...props} />
        </div>}
    </Motion>
  );
};

export default _withShowUpAnimation;
