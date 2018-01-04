// Libs
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const _withDraggable = ComposedComponent => props => (
  <Draggable draggableId={props.item.id}>
    {(provided, snapshot) => {
      // Patched onMouseDown, make inputs selectable
      const onMouseDown = event => {
        if (event.target.nodeName === 'INPUT') {
          return;
        }
        provided.dragHandleProps.onMouseDown(event);
      };
      // Patched onKeyDown handler, make typing in inputs
      // work as expected. For example, spacebar can be used
      // as normal characters instead of a shortcut.
      const onKeyDown = event => {
        if (event.target.nodeName === 'INPUT') {
          return;
        }
        provided.dragHandleProps.onKeyDown(event);
      };
      // patching drag handle props
      const patched = {
        ...provided.dragHandleProps,
        onMouseDown,
        onKeyDown,
      };
      // Draggable Style
      const draggableStyle = {
        ...provided.draggableStyle,
        margin: '0 0 14px 0',
      };
      return (
        <div>
          <div
            ref={provided.innerRef}
            style={draggableStyle}
            {...provided.dragHandleProps}
            {...patched}
          >
            <ComposedComponent {...props} />
          </div>
          {provided.placeholder}
        </div>
      );
    }}
  </Draggable>
);

export default _withDraggable;
