// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import { Section } from '../shared/Section';

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
export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.note.content };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note.content === undefined) {
      this.setState({ content: '' }, () => {
        this.props.updateFieldData('note', this.state);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) return true;
    if (this.props.note.content !== nextProps.note.content) return true;
    return false;
  }

  handleInputChange = (event) => {
    this.setState({ content: event.target.value }, () => {
      this.props.updateFieldData('note', this.state);
    });
  }

  render() {
    return (
      <Section>
        <label className="itemLabel">Note</label>
        <NoteContent
          cols="50"
          rows="4"
          onChange={this.handleInputChange}
          placeholder="Note"
          value={this.state.content}
        />
      </Section>
    );
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Export
export default _withFadeInAnimation(Note);
