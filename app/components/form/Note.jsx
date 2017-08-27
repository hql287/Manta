// Libraries
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// Styles
import styled from 'styled-components';
const NoteContent = styled.textarea`
  min-height: 36px;
  border-radius: 4px;
  padding: 10px;
  display: block;
  width: 100%;
  border: 1px solid #f2f3f4;
  color: #3a3e42;
  font-size: 14px;
`;

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
      <div className="formSection">
        <label className="itemLabel">Note</label>
        <NoteContent
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
