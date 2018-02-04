// Libraries
import React, { PureComponent } from 'react';
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

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    const { t, toggleFormSettings, settings } = this.props;
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
              <Label>{t('form:settings:name')}</Label>
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
                <p>{t('form:settings:hint')}</p>
              ) : (
                <a href="#" onClick={this.saveAsDefault}>
                  <i className="ion-checkmark" /> {t('common:saveAsDefault')}
                </a>
              )}
            </Helper>

            <AllSettings>
              <Setting>
                <Label>Invoice ID</Label>
                <Switch
                  name="invoiceID"
                  checked={required_fields.invoiceID}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>{t('form:fields:dueDate:name')}</Label>
                <Switch
                  name="dueDate"
                  checked={required_fields.dueDate}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>{t('form:fields:currency')}</Label>
                <Switch
                  name="currency"
                  checked={required_fields.currency}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>{t('form:fields:discount:name')}</Label>
                <Switch
                  name="discount"
                  checked={required_fields.discount}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>{t('form:fields:tax:name')}</Label>
                <Switch
                  name="tax"
                  checked={required_fields.tax}
                  onChange={this.handleInputChange}
                />
              </Setting>

              <Setting>
                <Label>{t('form:fields:note')}</Label>
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
  t: PropTypes.func.isRequired,
  toggleField: PropTypes.func.isRequired,
  toggleFormSettings: PropTypes.func.isRequired,
  updateSavedSettings: PropTypes.func.isRequired,
};

// Export
export default Settings;
