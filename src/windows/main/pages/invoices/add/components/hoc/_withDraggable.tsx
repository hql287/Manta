// Libs
import React from 'react'
import { useDrag } from 'react-dnd'

const _withDraggable =
  (ComposedComponent: React.ComponentType<any>) => (props: any) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: 'ITEM',
      item: { id: props.item.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    // Draggable Style
    const draggableStyle = {
      margin: '0 0 14px 0',
      opacity: isDragging ? 0.8 : 1,
      transition: 'opacity 0.2s',
    }

    return (
      <div ref={dragRef} style={draggableStyle}>
        <ComposedComponent {...props} />
      </div>
    )
  }

export default _withDraggable
