// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Custom Libs
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';

// Component
class General extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.setState(this.props.general);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value}, () => {
      this.props.updateSettings('general', this.state);
    });
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='pageItem'>
              <label className='itemLabel'>Sound</label>
              <select
                name='sound'
                value={this.state.sound}
                onChange={this.handleInputChange}>
                <option value='default'>Default</option>
                <option value='cs'>Counter Strike</option>
              </select>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='pageItem'>
              <label className='itemLabel'>Mute Sound?</label>
              <label className='switch'>
                <input
                  name='muted'
                  type='checkbox'
                  checked={this.state.muted}
                  onChange={this.handleInputChange}
                />
                <span className='slider round' />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

General.propTypes = {
  general: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default _withFadeInAnimation(General);
