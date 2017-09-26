// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Styling
import styled from 'styled-components';

const Wrapper = styled.div`
`;

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  color: #4F555C;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Select = styled.select`
  width: 150px;
  height: 24px;
  margin-right: 20px;
`;

class Settings extends Component {
  render() {
    const {settings, updateSettings} = this.props;
    return (
      <Wrapper>
        <Section>
          <Label>Template</Label>
          <Select
            name="template"
            value={settings.template}
            onChange={updateSettings}>
            <option value="default">Default</option>
            <option value="hosting">Hosting</option>
            <option value="elegant">Elegant</option>
            <option value="classic">Classic</option>
          </Select>
        </Section>

        <Section>
          <Label>Margin Type</Label>
          <Select
            name="marginsType"
            value={settings.marginsType}
            onChange={updateSettings}>
            <option value="0">Default Margin</option>
            <option value="1">No Margin</option>
            <option value="2">Minimum Margin</option>
          </Select>
        </Section>

        <Section>
          <Label className="itemLabel">Page Size</Label>
          <Select
            name="pageSize"
            value={settings.pageSize}
            onChange={updateSettings}>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="Legal">Legal</option>
            <option value="Letter">Letter</option>
            <option value="Tabloid">Tabloid</option>
          </Select>
        </Section>
      </Wrapper>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default Settings;
