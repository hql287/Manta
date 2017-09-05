// Libs
import React from 'react';

// Animation
import {Motion, spring} from 'react-motion';

// HOC Component
const _withFadeInAnimation = ComposedComponent => props => {
  return (
    <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1)}}>
      {({opacity}) =>
        <div style={{ opacity}}>
          <ComposedComponent {...props} />
        </div>}
    </Motion>
  );
};

export default _withFadeInAnimation;
