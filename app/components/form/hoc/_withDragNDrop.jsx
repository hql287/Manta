// Libs
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

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

class _withDragNDropHOC extends Component {
  render = () => {
    const {
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      isDragging,
      hasHandler,
    } = this.props;
    return connectDropTarget(
      connectDragSource(
        <div style={{ display: 'flex', opacity: isDragging ? 0 : 1 }}>
          {hasHandler && connectDragSource(
            <div className="dragHandler">
              <i className="ion-grid" />
            </div>
          )}
          { this.props.children }
        </div>
    ));
  }
};

_withDragNDropHOC = DragSource(ItemTypes.ROW, rowSource, collectSource)(_withDragNDropHOC);
_withDragNDropHOC = DropTarget(ItemTypes.ROW, rowTarget, collectTarget)(_withDragNDropHOC);

const _withDragNDrop = ComposedComponent => props =>
  <_withDragNDropHOC {...props}>
    <ComposedComponent { ...props }/>
  </_withDragNDropHOC>

export default _withDragNDrop;
