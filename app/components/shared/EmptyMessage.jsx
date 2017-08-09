// React Libraries
import React from 'react';

// Component
const EmptyMessage = props =>
  <div className="pageContent">
    <span className="sectionHeader">
      {props.text}
    </span>
  </div>;

export default EmptyMessage;
