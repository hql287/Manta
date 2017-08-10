// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Component
class RecipientForm extends Component {

  componentWillMount = () => {
    this.setState(this.props.currentRecipientData);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.clearState) {
      this.setState({
        fullname: '',
        company: '',
        phone: '',
        email: '',
      });
    }
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.updateRecipientFormData();
    });
  };

  updateRecipientFormData = () => {
    const {updateRecipientState} = this.props;
    updateRecipientState({
      type: 'new',
      new: this.state,
    });
  };

  render = () => {
    const {fullname, company, phone, email} = this.state;
    return (
      <div className="recipientForm">
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Full Name</label>
            <input
              name="fullname"
              type="text"
              value={fullname ? fullname : ''}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="pageItem col-md-6">
            <label className="itemLabel">Company</label>
            <input
              name="company"
              type="text"
              value={company ? company : ''}
              onChange={e => this.handleInputChange(e)}
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
              onChange={e => this.handleInputChange(e)}
            />
          </div>
          <div className="pageItem col-md-6">
            <label className="itemLabel">Phone Number</label>
            <input
              name="phone"
              type="text"
              value={phone ? phone : ''}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
      </div>
    );
  };
}

RecipientForm.propTypes = {
  currentRecipientData: PropTypes.object,
  updateRecipientState: PropTypes.func.isRequired,
};

RecipientForm.defaultProps = {
  currentRecipientData: {},
};

export default RecipientForm;
