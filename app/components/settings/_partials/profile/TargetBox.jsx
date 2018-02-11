import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const style = {
  flex: '1',
  background: '#F9FAFA',
  border: '2px dashed #469FE5k',
  borderRadius: '4px',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '-20px',
};

const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor);
    }
  },
};

class TargetBox extends Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div style={style}>{isActive ? 'Release to drop' : 'Drag file here'}</div>
    );
  }
}

TargetBox.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDrop: PropTypes.func,
};

export default DropTarget(
  props => props.accepts,
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(TargetBox);
