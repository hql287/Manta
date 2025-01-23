// Libs
import React from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DragNDrop = ({ children, onDragEnd }) => {
  const [, dropRef] = useDrop({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const sourceIndex = item.index
      const destinationIndex = monitor.getDropResult()?.index
      if (destinationIndex !== undefined && onDragEnd) {
        onDragEnd(sourceIndex, destinationIndex)
      }
    },
  })

  return (
    <div ref={dropRef} style={{ padding: '10px', backgroundColor: '#f4f4f4' }}>
      {React.Children.map(children, (child, index) => {
        return (
          <DraggableItem index={index} onDragEnd={onDragEnd}>
            {child}
          </DraggableItem>
        )
      })}
    </div>
  )
}

const DraggableItem = ({ children, index, onDragEnd }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult && onDragEnd) {
        onDragEnd(item.index, dropResult.index)
      }
    },
  })

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px 0',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      {children}
    </div>
  )
}

// Real HOC
const _withDragNDrop = (ComposedComponent) => (props) => (
  <DndProvider backend={HTML5Backend}>
    <DragNDrop onDragEnd={props.boundActionCreators.moveRow}>
      <ComposedComponent {...props} />
    </DragNDrop>
  </DndProvider>
)

// Export the HOC
export default _withDragNDrop
