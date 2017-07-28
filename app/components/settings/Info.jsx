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
        email:'',
        phone: '',
        website: '',
      });
    }
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value }, () => {
      this.updateInfoState();
    });
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
              name="fullname"
              type="text"
              value={this.state.fullname}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Company</label>
            <input
              name="company"
              type="text"
              value={this.state.company}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Address</label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Email</label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="pageItem col-md-6">
            <label className="itemLabel">Phone Number</label>
            <input
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={e => this.handleInputChange(e)}
            />
          </div>

          <div className="pageItem col-md-6">
            <label className="itemLabel">Website</label>
            <input
              name="website"
              type="text"
              value={this.state.website}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default Info;
