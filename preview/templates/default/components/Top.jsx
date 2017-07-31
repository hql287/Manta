// Node Libs
const path = require('path');

// React Libraries
import React from 'react';

// 3rd Party Libs
const _ = require('lodash');
const format = require('date-fns/format');

// Component
const Top = props =>
  <table>
    <tbody>
      <tr className="top">
        <td colSpan="2">
          <table>
            <tbody>
              <tr>
                <td className="title">
                  <img src={path.join(__dirname, '../assets/logo.png')} />
                </td>
                <td>
                  Invoice #:
                  {_.truncate(props.receipt._id, {
                    length: 8,
                    omission: '',
                  })}
                  <br />
                  Created:
                  {format(props.receipt.created_at, 'DD-MM-YYYY')}
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>;
export default Top;
