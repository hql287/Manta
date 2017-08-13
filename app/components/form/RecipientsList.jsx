// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';

// Component
class RecipientsList extends Component {
  // Set & Update Selected Recipient on Mount
  componentWillMount = () => {
    const {
      recipients,
      currentSelectedRecipient,
      handleRecipientSelectChange,
    } = this.props;
    if (!currentSelectedRecipient._id) {
      this.updateSelectedRecipient(recipients[0]._id);
    }
  };

  // Handle Selection Change
  handleInputChange = event => {
    this.updateSelectedRecipient(event.target.value);
  };

  // Update Selected Recipient State
  updateSelectedRecipient = selectedRecipientId => {
    const {recipients, handleRecipientSelectChange} = this.props;
    const recipientIndex = _.findIndex(recipients, {_id: selectedRecipientId});
    const recipient = recipients[recipientIndex];
    handleRecipientSelectChange(recipient);
  };


  // Render Component
  render = () => {
    const {recipients, currentSelectedRecipient} = this.props;
    const recipientOptions = recipients.map((recipient, index) => {
      return (
        <option value={recipient._id} key={recipient._id}>
          {recipient.fullname ? recipient.fullname : recipient.company} ({' '}
          {recipient.email} )
        </option>
      );
    });
    return (
      <div className="recipientsList">
        <select
          value={
            currentSelectedRecipient._id
              ? currentSelectedRecipient._id
              : recipients[0]._id
          }
          onChange={e => this.handleInputChange(e)}>
          {recipientOptions}
        </select>
      </div>
    );
  };
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

export default RecipientsList;
