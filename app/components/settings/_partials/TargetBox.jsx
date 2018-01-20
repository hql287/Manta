import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import * as TRANSLATION_LABELS from '../../../constants/translations';

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
      <div style={style}>{isActive ? this.props.translate(TRANSLATION_LABELS.GEN_RELEASE_DROP) : this.props.translate(TRANSLATION_LABELS.GEN_DRAG_HERE) }</div>
    );
  }
}

TargetBox.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDrop: PropTypes.func,
  translate: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string,
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
