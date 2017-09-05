// Libraries
import React, {Component} from 'react';

// Custom Components
import Switch from '../shared/Switch';
import {Section} from '../shared/Section';

// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

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
    this.setState({content: this.props.content});
  };

  handleInputChange = event => {
    this.setState({content: event.target.value}, () => {
      this.props.updateFieldData('note', this.state);
    });
  };

  render = () => {
    const {note, toggleField} = this.props;
    return (
      <Section>
        <label className="itemLabel">Note</label>
        <NoteContent
          rows="4"
          value={this.state.content}
          cols="50"
          onChange={e => this.handleInputChange(e)}
          placeholder="Note"
        />
      </Section>
    );
  };
}

// Export
export default _withFadeInAnimation(Note);
