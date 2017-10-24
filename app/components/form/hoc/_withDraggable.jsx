// Libs
import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const _withDraggable = ComposedComponent => props => (
  <Draggable draggableId={props.item.id}>
    {(provided, snapshot) => {
      const draggableStyle = {
        ...provided.draggableStyle,
        margin: '0 0 14px 0',
      };
      return (
        <div>
          <div
            ref={provided.innerRef}
            style={draggableStyle}
            {...provided.dragHandleProps}>
            <ComposedComponent {...props} />
          </div>
          {provided.placeholder}
        </div>
      );
    }}
  </Draggable>
);

export default _withDraggable;
