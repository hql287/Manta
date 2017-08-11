// Node Libs
const path = require('path');

// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format');

Top.propTypes = {
  company: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

// Component
function Top (props) {
  return (
    <table>
      <tbody>
        <tr className="top">
          <td colSpan="2">
            <table>
              <tbody>
                <tr>
                  <td className="title">
                    <img src={props.company.logo} />
                  </td>
                  <td>
                    Invoice #:
                    {_.truncate(props.invoice._id, {
                      length: 8,
                      omission: '',
                    })}
                    <br />
                    Created:
                    {format(props.invoice.created_at, 'DD-MM-YYYY')}
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default Top;
