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
  componentWillMount = () => {
    const {note} = this.props.currentInvoice;
    this.setState({
      content: note.content ? note.content : '',
    });
  };

  handleInputChange = event => {
    this.setState({content: event.target.value}, () => {
      this.updateNoteState();
    });
  };

  updateNoteState = event => {
    const {dispatch} = this.props;
    const updateNote = bindActionCreators(ActionCreators.updateNote, dispatch);
    updateNote(this.state.content);
  };

  render = () => {
    const {note} = this.props.currentInvoice;
    return (
      <div className="formSection">
        <label className="itemLabel">Note</label>
        <label className="switch">
          <input
            name="required"
            type="checkbox"
            checked={note.required}
            onChange={() => this.props.toggleField('note')}
          />
          <span className="slider round" />
        </label>
        {note.required &&
          <NoteContent
            rows="4"
            value={this.state.content}
            cols="50"
            onChange={e => this.handleInputChange(e)}
            placeholder="Note"
          />}
      </div>
    );
  };
}

export default connect(state => ({
  currentInvoice: state.FormReducer,
}))(Note);
