// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// Component
class Note extends Component {

  updateNoteState = event => {
    const {dispatch} = this.props;
    const updateNote = bindActionCreators(ActionCreators.updateNote, dispatch);
    updateNote(event.target.value);
  };

  render = () => {
    const {note} = this.props.currentReceipt;
    return (
      <div className="noteWrapper">
        <label className="itemLabel ">Note</label>
        <textarea
          className="noteContent"
          rows="4"
          value={note ? note : ''}
          cols="50"
          onChange={this.updateNoteState.bind(this)}
          placeholder="Note"
        />
      </div>
    );
  };
}

export default connect(state => ({
  currentReceipt: state.FormReducer,
}))(Note);
