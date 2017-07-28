// React Libraries
import React from 'react';

// Component
const Information = props =>
  <table>
    <tbody>
      <tr className="information">
        <td colSpan="2">
          <table>
            <tbody>
              <tr>
                <td>
                  { props.company.company }.<br />
                  { props.company.address }<br />
                  { props.company.phone }<br />
                  { props.company.website }
                </td>
                <td>
                  Acme Corp.<br />
                  John Doe<br />
                  john@example.com
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>;

export default Information;
