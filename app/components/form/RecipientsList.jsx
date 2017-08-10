// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
import _ from 'lodash';

// Component
class RecipientsList extends Component {
  componentWillMount = () => {
    const {recipients, currentSelectedRecipient} = this.props;
    if (currentSelectedRecipient.fullname) {
      this.setState({recipient: currentSelectedRecipient._id});
    } else {
      this.setState({recipient: recipients[0]._id}, () => {
        this.updateSelectedRecipient();
      });
    }
  };

  handleInputChange = event => {
    this.setState({recipient: event.target.value}, () => {
      this.updateSelectedRecipient();
    });
  };

  updateSelectedRecipient = () => {
    const {recipients, updateRecipientState} = this.props;
    const recipientIndex = _.findIndex(recipients, {_id: this.state.recipient});
    const recipient = recipients[recipientIndex];
    updateRecipientState({
      type: 'select',
      select: recipient,
    });
  };

  render = () => {
    const {recipients} = this.props;
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
          value={this.state.recipient}
          onChange={e => this.handleInputChange(e)}>
          {recipientOptions}
        </select>
      </div>
    );
  };
}

RecipientsList.propTypes = {
  recipients: PropTypes.array,
  updateRecipient: PropTypes.func,
  currentSelectedRecipient: PropTypes.object,
};

RecipientsList.defaultProps = {
  currentSelectedRecipient: {},
};

export default RecipientsList;
