// Node Libs
const path = require('path');

// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format');
const moment = require('moment');

Top.propTypes = {
  company: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

// Component
function Top({company, invoice}) {
  return (
    <table>
      <tbody>
        <tr className="top">
          <td colSpan="2">
            <table>
              <tbody>
                <tr>
                  <td className="title">
                    <img src={company.logo} />
                  </td>
                  <td>
                    <span>
                      Invoice: #
                      {_.truncate(invoice._id, {
                        length: 8,
                        omission: '',
                      })}
                      <br />
                    </span>
                    <span>
                      Created: {format(invoice.created_at, 'DD/MM/YYYY')}
                      <br />
                    </span>
                    {invoice.dueDate &&
                      <span>
                        Due Date: {moment(invoice.dueDate).format('DD/MM/YYYY')}
                        <br />
                      </span>}
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
