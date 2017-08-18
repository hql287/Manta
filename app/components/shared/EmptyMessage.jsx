// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Component
const EmptyMessage = ({text}) =>
  <div className="pageContent">
    <span className="sectionHeader">
      {text}
    </span>
  </div>;

EmptyMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptyMessage;
