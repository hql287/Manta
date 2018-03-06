import React, { Component } from 'react';
import PropTypes from 'prop-types';
const moment = require('moment');

import { Row, Field, Header, Part } from '../../../shared/Part';
import styled from 'styled-components';

const ExportDir = styled.div`
  display: flex;
`;

function Other({
  dateFormat,
  exportDir,
  template,
  selectExportDir,
  handleInputChange,
  t
}) {
  return [
    <label key="label" className="itemLabel">
      {t('settings:fields:other')}
    </label>,
    <Part key="part">
      <Row>
        <Field>
          <label className="itemLabel">{t('settings:fields:pdfExportDir')}</label>
          <ExportDir>
            <input
              name="exportDir"
              type="text"
              value={exportDir}
              disabled
            />
            <a
              href="#"
              className="input-group-customized "
              onClick={selectExportDir}
            >
              <i className="ion-folder" />
            </a>
          </ExportDir>
        </Field>
      </Row>
      <Row>
        <Field>
          <label className="itemLabel">{t('settings:fields:template')}</label>
          <select name="template" value={template} onChange={handleInputChange}>
            <option value="minimal">Minimal</option>
            <option value="business">Business</option>
          </select>
        </Field>
        <Field>
          <label className="itemLabel">{t('settings:fields:dateFormat')}</label>
          <select
            name="dateFormat"
            value={dateFormat}
            onChange={handleInputChange}
          >
            <option value="dddd, MMMM Do, YYYY">
              {moment(Date.now()).format('dddd, MMMM Do, YYYY')} (dddd, MMMM Do,
              YYYY)
            </option>
            <option value="MMMM Do, YYYY">
              {moment(Date.now()).format('MMMM Do, YYYY')} (MMMM Do, YYYY)
            </option>
            <option value="MM/DD/YYYY">
              {moment(Date.now()).format('MM/DD/YYYY')} (MM/DD/YYYY)
            </option>
            <option value="MM/DD/YY">
              {moment(Date.now()).format('MM/DD/YY')} (MM/DD/YY)
            </option>
            <option value="dddd, DD MMMM YYYY">
              {moment(Date.now()).format('dddd, DD MMMM YYYY')} (dddd, DD MMMM
              YYYY)
            </option>
            <option value="DD/MMMM/YYYY">
              {moment(Date.now()).format('DD/MMMM/YYYY')} (DD/MMMM/YYYY)
            </option>
            <option value="DD/MM/YYYY">
              {moment(Date.now()).format('DD/MM/YYYY')} (DD/MM/YYYY)
            </option>
            <option value="DD/MM/YY">
              {moment(Date.now()).format('DD/MM/YY')} (DD/MM/YY)
            </option>
            <option value="dddd, Do MMMM YYYY">
              {moment(Date.now()).format('dddd, Do MMMM YYYY')} (dddd, Do MMMM YYYY)
            </option>
            <option value="Do MMMM YYYY">
              {moment(Date.now()).format('Do MMMM YYYY')} (Do MMMM YYYY)
            </option>
            <option value="DD.MM.YYYY">
              {moment(Date.now()).format('DD.MM.YYYY')} (DD.MM.YYYY)
            </option>
            <option value="DD.MM.YY">
              {moment(Date.now()).format('DD.MM.YY')} (DD.MM.YY)
            </option>
          </select>
        </Field>
      </Row>
    </Part>,
  ];
}

Other.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  exportDir: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  selectExportDir: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Other;
