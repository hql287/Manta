// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
class RecipientForm extends Component {
  render = () => {
    const {fullname, company, phone, email} = this.props.currentRecipientData;
    return (
      <div className="recipientForm">
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Full Name</label>
            <input
              name="fullname"
              type="text"
              value={fullname ? fullname : ''}
              onChange={e => this.props.handleRecipientFormInputChange(e)}
            />
          </div>
          <div className="pageItem col-md-6">
            <label className="itemLabel">Company</label>
            <input
              name="company"
              type="text"
              value={company ? company : ''}
              onChange={e => this.props.handleRecipientFormInputChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Email</label>
            <input
              name="email"
              type="text"
              value={email ? email : ''}
              onChange={e => this.props.handleRecipientFormInputChange(e)}
            />
          </div>
          <div className="pageItem col-md-6">
            <label className="itemLabel">Phone Number</label>
            <input
              name="phone"
              type="text"
              value={phone ? phone : ''}
              onChange={e => this.props.handleRecipientFormInputChange(e)}
            />
          </div>
        </div>
      </div>
    );
  };
}

// PropTypes Validation
RecipientForm.propTypes = {
  currentRecipientData: PropTypes.object,
  handleRecipientFormInputChange: PropTypes.func.isRequired,
};

RecipientForm.defaultProps = {
  currentRecipientData: {},
};

export default RecipientForm;
