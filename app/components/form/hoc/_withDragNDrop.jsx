// Libs
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {compose} from 'redux';

// Drag & Drop
import {ItemTypes} from '../../../constants/ItemTypes';
import {DragSource, DropTarget} from 'react-dnd';

const rowSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
};

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

class _withDragNDrop extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.index !== nextProps.index ||
      this.props.isDragging !== nextProps.isDragging ||
      this.props.hasHandler !== nextProps.hasHandler
    );
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      hasHandler,
    } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div style={{display: 'flex', opacity: isDragging ? 0 : 1}}>
          {hasHandler &&
            connectDragSource(
              <div className="dragHandler">
                <i className="ion-grid" />
              </div>
            )}
          {this.props.children}
        </div>
      )
    );
  }
}

// PropTypes Validation
_withDragNDrop.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  hasHandler: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

// Make the Component as Drag Target & Drop Target
const _withDragNDropWrapper = compose(
  DragSource(ItemTypes.ROW, rowSource, collectSource),
  DropTarget(ItemTypes.ROW, rowTarget, collectTarget)
)(_withDragNDrop);

// Export the HOC
const _withDragNDropHOC = ComposedComponent => props =>
  <_withDragNDropWrapper {...props}>
    <ComposedComponent {...props} />
  </_withDragNDropWrapper>;

export default _withDragNDropHOC;
