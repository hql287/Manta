// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class DragNDrop extends PureComponent {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { moveRow } = this.props.boundActionCreators;
    moveRow(result.source.index, result.destination.index);
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppableList">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {this.props.children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// PropTypes Validation
DragNDrop.propTypes = {
  boundActionCreators: PropTypes.object.isRequired,
};

// Real HOC
const _withDragNDrop = ComposedComponent => props => (
  <DragNDrop {...props}>
    <ComposedComponent {...props} />
  </DragNDrop>
);

// Export the HOC
export default _withDragNDrop;
