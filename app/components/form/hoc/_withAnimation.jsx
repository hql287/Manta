// Libs
import React from 'react';

// Animation
import {Motion, spring} from 'react-motion';

// HOC Component
const _withAnimation = ComposedComponent => props => {
  const {index} = props;
  return (
    <Motion
      defaultStyle={{
        opacity: 0,
        top: index*50,
      }}
      style={{
        opacity: spring(1),
        top: spring(index*50),
      }}>
      {({top, opacity}) =>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            top,
            opacity,
          }}>
          <ComposedComponent {...props} />
        </div>}
    </Motion>
  );
};

export default _withAnimation;
