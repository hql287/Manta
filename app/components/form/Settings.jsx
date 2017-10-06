// Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Animation
import {Motion, spring} from 'react-motion';

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
  padding: 25px 40px;
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

// Custom Components
import Switch from '../shared/Switch';

// Component
function Settings(props) {
  const {toggleField, toggleFormSettings, currentInvoice} = props;
  const {settingsOpen, dueDate, currency, discount, vat, note} = currentInvoice;

  return (
    <Motion
      style={{
        height: spring(settingsOpen ? 155 : 45),
        rotate: spring(settingsOpen ? 180 : 0),
      }}>
      {({height, rotate}) => (
        <Wrapper style={{height: `${height}px`}}>
          <SettingsHeader href="#" onClick={toggleFormSettings}>
            <Label>Form Settings</Label>
            <div
              style={{
                transform: `rotate(${rotate}deg)`,
              }}>
              <i className="ion-arrow-down-b" />
            </div>
          </SettingsHeader>

          <AllSettings>
            <Setting>
              <Label>Due Date</Label>
              <Switch
                checked={dueDate.required}
                onChange={() => toggleField('dueDate')}
              />
            </Setting>

            <Setting>
              <Label>Currency</Label>
              <Switch
                checked={currency.required}
                onChange={() => toggleField('currency')}
              />
            </Setting>

            <Setting>
              <Label>Discount</Label>
              <Switch
                checked={discount.required}
                onChange={() => toggleField('discount')}
              />
            </Setting>

            <Setting>
              <Label>Vat</Label>
              <Switch
                checked={vat.required}
                onChange={() => toggleField('vat')}
              />
            </Setting>

            <Setting>
              <Label>Note</Label>
              <Switch
                checked={note.required}
                onChange={() => toggleField('note')}
              />
            </Setting>
          </AllSettings>
        </Wrapper>
      )}
    </Motion>
  );
}

Settings.propTypes = {
  currentInvoice: PropTypes.shape({
    recipient: PropTypes.shape({
      newRecipient: PropTypes.bool.isRequired,
      select: PropTypes.object.isRequired,
      new: PropTypes.object.isRequired,
    }),
    rows: PropTypes.array.isRequired,
    dueDate: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired,
    discount: PropTypes.object.isRequired,
    vat: PropTypes.object.isRequired,
    note: PropTypes.object.isRequired,
    settingsOpen: PropTypes.bool.isRequired,
  }).isRequired,
  toggleField: PropTypes.func.isRequired,
  toggleFormSettings: PropTypes.func.isRequired,
};

// Export
export default Settings;
