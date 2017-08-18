// Libs
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';

// Drag & Drop
import {ItemTypes} from '../../constants/ItemTypes';
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

// Component
class ItemsRow extends Component {
  componentWillMount = () => {
    const {id, description, quantity, price, subtotal} = this.props.item;
    this.setState({
      id,
      description: description ? description : '',
      quantity: quantity ? quantity : 0,
      price: price ? price : 0,
      subtotal: subtotal ? subtotal : 0,
    });
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value}, () => {
      this.updateSubtotal();
    });
  };

  updateSubtotal = () => {
    let currentPrice = this.state.price;
    let currentQuantity = this.state.quantity;
    let currentSubtotal = currentPrice * currentQuantity;
    this.setState({subtotal: currentSubtotal}, () => {
      this.uploadRowState();
    });
  };

  uploadRowState = () => {
    const {updateRow} = this.props;
    updateRow(this.state);
  };

  render = () => {
    const {
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      isDragging,
      activeHandler,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragPreview(
      connectDropTarget(
        <div className="itemDiv" style={{opacity}}>
          <div className="itemDescription">
            <input
              name="description"
              type="text"
              value={this.state.description}
              onChange={e => this.handleInputChange(e)}
              placeholder="Description"
            />
          </div>
          <div className="itemPrice">
            <input
              name="price"
              type="number"
              value={this.state.price}
              onChange={e => this.handleInputChange(e)}
              placeholder="Price"
            />
          </div>
          <div className="itemQuantity">
            <input
              name="quantity"
              type="number"
              value={this.state.quantity}
              onChange={e => this.handleInputChange(e)}
              placeholder="Quantity"
            />
          </div>
          <div className="itemActions">
            {connectDragSource(
              <div className={activeHandler ? 'dragHandler active' : 'dragHandler'}>
                <i className="ion-grid" />
              </div>
            )}
            {this.props.actions &&
              <a
                href="#"
                className="itemRemoveBtn"
                onClick={() => this.props.removeRow(this.state.id)}>
                <i className="ion-close-circled" />
              </a>}
          </div>
        </div>,
      ),
    );
  };
}

ItemsRow.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.bool.isRequired,
  updateRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
};

export default DragSource(ItemTypes.ROW, rowSource, collectSource)(
  DropTarget(ItemTypes.ROW, rowTarget, collectTarget)(ItemsRow),
);
