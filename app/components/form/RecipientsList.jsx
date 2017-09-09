// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';

// Animation
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';
const List = styled.div`margin-bottom: 20px;`;

// Component
class RecipientsList extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // Set & Update Selected Recipient on Mount
  componentWillMount() {
    const {recipients, currentSelectedRecipient} = this.props;
    if (!currentSelectedRecipient._id) {
      this.updateSelectedRecipient(recipients[0]._id);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.currentSelectedRecipient !== nextProps.currentSelectedRecipient;
  }

  // Handle Selection Change
  handleInputChange(event) {
    this.updateSelectedRecipient(event.target.value);
  }

  // Update Selected Recipient State
  updateSelectedRecipient(selectedRecipientId) {
    const {recipients, handleRecipientSelectChange} = this.props;
    const recipientIndex = _.findIndex(recipients, {_id: selectedRecipientId});
    const recipient = recipients[recipientIndex];
    handleRecipientSelectChange(recipient);
  }

  // Render Component
  render() {
    console.log('Render Recipient List');
    const {recipients, currentSelectedRecipient} = this.props;
    const recipientOptions = recipients.map(recipient => {
      return (
        <option value={recipient._id} key={recipient._id}>
          {recipient.fullname ? recipient.fullname : recipient.company} ({' '}
          {recipient.email} )
        </option>
      );
    });
    return (
      <List>
        <select
          onChange={this.handleInputChange}
          value={
            currentSelectedRecipient._id
              ? currentSelectedRecipient._id
              : recipients[0]._id
          }>
          {recipientOptions}
        </select>
      </List>
    );
  }
}

// PropTypes Validation
RecipientsList.propTypes = {
  recipients: PropTypes.array.isRequired,
  currentSelectedRecipient: PropTypes.object,
  handleRecipientSelectChange: PropTypes.func.isRequired,
};

RecipientsList.defaultProps = {
  currentSelectedRecipient: {},
};

export default _withFadeInAnimation(RecipientsList);
