// Libs
import React from 'react';

// Animation
import { Motion, spring } from 'react-motion';

// HOC Component
const _withAnimation = ComposedComponent => props => {
  const { index } = props;
  return (
    <Motion
      defaultStyle={{
        top: index * 50,
      }}
      style={{
        top: spring(index * 50),
      }}
    >
      {({ top, opacity }) => (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            top,
          }}
        >
          <ComposedComponent {...props} />
        </div>
      )}
    </Motion>
  );
};

export default _withAnimation;
