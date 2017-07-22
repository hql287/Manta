// Libraries
import React, {Component} from 'react';

// Component
class Info extends Component {
  componentWillMount = () => {
    if (this.props.info !== undefined) {
      this.setState(this.props.info);
    } else {
      this.setState({
        fullname: '',
        company: '',
        address: '',
        phone: '',
        website: '',
      });
    }
  };

  updateFullname = event => {
    this.setState({fullname: event.target.value}, () => this.updateInfoState());
  };

  updateCompany = event => {
    this.setState({company: event.target.value}, () => this.updateInfoState());
  };

  updateAddress = event => {
    this.setState({address: event.target.value}, () => this.updateInfoState());
  };

  updatePhone = event => {
    this.setState({phone: event.target.value}, () => this.updateInfoState());
  };

  updateWebsite = event => {
    this.setState({website: event.target.value}, () => this.updateInfoState());
  };

  updateInfoState = () => {
    const {updateInfo} = this.props;
    updateInfo(this.state);
  };

  render = () => {
    return (
      <div>
        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Full Name</label>
            <input
              type="text"
              value={this.state.fullname}
              onChange={this.updateFullname.bind(this)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Company</label>
            <input
              type="text"
              value={this.state.company}
              onChange={this.updateCompany.bind(this)}
            />
          </div>
        </div>

        <div className="pageItem">
          <label className="itemLabel">Address</label>
          <input
            type="text"
            value={this.state.address}
            onChange={this.updateAddress.bind(this)}
          />
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Phone Number</label>
            <input
              type="text"
              value={this.state.phone}
              onChange={this.updatePhone.bind(this)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Website</label>
            <input
              type="text"
              value={this.state.website}
              onChange={this.updateWebsite.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Info;
