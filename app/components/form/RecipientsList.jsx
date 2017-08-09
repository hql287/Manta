// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';

// Component
class RecipientsList extends Component {
  static propTypes = {
    recipients: PropTypes.array.isRequired,
    updateRecipient: PropTypes.func.isRequired,
    currentSelectedRecipient: PropTypes.object.isRequired,
  };

  componentWillMount = () => {
    const {recipients, currentSelectedRecipient} = this.props;
    if (currentSelectedRecipient.fullname) {
      this.setState({ recipient: currentSelectedRecipient._id });
    } else {
      this.setState({ recipient: recipients[0]._id });
    }
  };

  handleInputChange = event => {
    this.setState(
      {
        recipient: event.target.value,
      },
      () => {
        this.updateRecipient();
      },
    );
  };

  updateRecipient = () => {
    const {recipients, updateRecipient} = this.props;
    const recipientIndex = _.findIndex(recipients, {'_id': this.state.recipient})
    const recipient = recipients[recipientIndex];
    updateRecipient({
      type: 'select',
      data: recipient,
    });
  };

  render = () => {
    const {recipients} = this.props;
    const recipientOptionComponents = recipients.map((recipient, index) => {
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
          value={this.state.recipient}
          onChange={e => this.handleInputChange(e)}>
          {recipientOptionComponents}
        </select>
      </div>
    );
  };
}

export default RecipientsList;
