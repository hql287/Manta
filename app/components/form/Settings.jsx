// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

// Animation
import { Motion, spring } from 'react-motion';

// Styles
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SettingsHeader = styled.a`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #2c323a;
  &:hover {
    text-decoration: none;
    color: #2c323a;
  }
`;

const AllSettings = styled.div`
  display: flex;
  padding: 10px 40px 25px 40px;
  background: #f2f3f4;
`;

const Setting = styled.div`
  margin-right: 20px;
  > label {
    color: #4f555c;
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #4f555c;
  margin-bottom: 0px;
`;

const Helper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  padding: 0 40px;
  background: #f2f3f4;
  color: #b4b7ba;
  p {
    font-size: 14px;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 0;
  }
  a {
    margin-top: 10px;
    font-size: 14px;
  }
`;

// Custom Components
import Switch from '../shared/Switch';

// Component

class Settings extends Component {
  constructor(props) {
    super(props);
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  // Update local state
  handleInputChange(event) {
    this.props.toggleField(event.target.name);
  }

  isSettingsSaved() {
    return isEqual(
      this.props.settings.required_fields,
      this.props.savedSettings
    );
  }

  saveAsDefault() {
    const { updateSavedSettings } = this.props;
    updateSavedSettings('required_fields', this.props.settings.required_fields);
  }

  render() {
    const { toggleFormSettings, settings } = this.props;
    const { required_fields, open } = settings;
    return (
      <Motion
        style={{
          height: spring(open ? 180 : 45),
          rotate: spring(open ? 180 : 0),
        }}
      >
        {({ height, rotate }) => (
          <Wrapper style={{ height: `${height}px` }}>
            <SettingsHeader href="#" onClick={toggleFormSettings}>
              <Label>Form Settings</Label>
              <div
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                <i className="ion-arrow-down-b" />
              </div>
            </SettingsHeader>

            <Helper>
              {this.isSettingsSaved() ? (
                <p>Toogle any field to make it required in the form.</p>
              ) : (
                <a href="#" onClick={this.saveAsDefault}>
                  <i className="ion-checkmark" /> Save as default?
                </a>
              )}
            </Helper>

            <AllSettings>
              <Setting>
                <Label>Due Date</Label>
                <Switch
                  name="dueDate"
                  checked={required_fields.dueDate}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>Currency</Label>
                <Switch
                  name="currency"
                  checked={required_fields.currency}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>Discount</Label>
                <Switch
                  name="discount"
                  checked={required_fields.discount}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>Tax</Label>
                <Switch
                  name="tax"
                  checked={required_fields.tax}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>Note</Label>
                <Switch
                  name="note"
                  checked={required_fields.note}
                  onChange={this.handleInputChange}
                />
              </Setting>
            </AllSettings>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  savedSettings: PropTypes.object.isRequired,
  toggleField: PropTypes.func.isRequired,
  toggleFormSettings: PropTypes.func.isRequired,
  updateSavedSettings: PropTypes.func.isRequired,
};

// Export
export default Settings;
