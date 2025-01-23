// Libraries
import React, { FC, ChangeEvent } from 'react';
import { isEqual } from 'lodash';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Custom Components
import Switch from '@uiSharedComponents/Switch';

// Styled Components
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

// Types
interface SettingsProps {
  settings: {
    required_fields: Record<string, boolean>;
    open: boolean;
  };
  savedSettings: Record<string, boolean>;
  toggleField: (field: string) => void;
  toggleFormSettings: () => void;
  updateSavedSettings: (key: string, value: any) => void;
}

const Settings: FC<SettingsProps> = ({
  settings,
  savedSettings,
  toggleField,
  toggleFormSettings,
  updateSavedSettings,
}) => {
  const isSettingsSaved = () => {
    return isEqual(settings.required_fields, savedSettings);
  };

  const saveAsDefault = () => {
    updateSavedSettings('required_fields', settings.required_fields);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    toggleField(event.target.name);
  };

  const { required_fields, open } = settings;

  return (
    <motion.div
      animate={{ height: open ? 'auto' : '45px' }}
      initial={{ height: '45px' }}
      transition={{ duration: 0.3 }}
    >
      <Wrapper>
        <SettingsHeader href="#" onClick={toggleFormSettings}>
          <Label>Form Settings</Label>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            initial={{ rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <i className="ion-arrow-down-b" />
          </motion.div>
        </SettingsHeader>

        <Helper>
          {isSettingsSaved() ? (
            <p>Your settings are saved as default.</p>
          ) : (
            <a href="#" onClick={saveAsDefault}>
              <i className="ion-checkmark" /> Save as Default
            </a>
          )}
        </Helper>

        <AllSettings>
          <Setting>
            <Label>Invoice ID</Label>
            <Switch
              name="invoiceID"
              checked={required_fields.invoiceID}
              onChange={handleInputChange}
            />
          </Setting>

          <Setting>
            <Label>Due Date</Label>
            <Switch
              name="dueDate"
              checked={required_fields.dueDate}
              onChange={handleInputChange}
            />
          </Setting>

          <Setting>
            <Label>Currency</Label>
            <Switch
              name="currency"
              checked={required_fields.currency}
              onChange={handleInputChange}
            />
          </Setting>

          <Setting>
            <Label>Discount</Label>
            <Switch
              name="discount"
              checked={required_fields.discount}
              onChange={handleInputChange}
            />
          </Setting>

          <Setting>
            <Label>Tax</Label>
            <Switch
              name="tax"
              checked={required_fields.tax}
              onChange={handleInputChange}
            />
          </Setting>

          <Setting>
            <Label>Note</Label>
            <Switch
              name="note"
              checked={required_fields.note}
              onChange={handleInputChange}
            />
          </Setting>
        </AllSettings>
      </Wrapper>
    </motion.div>
  );
};

export default Settings;
