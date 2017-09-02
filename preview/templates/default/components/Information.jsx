// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

Information.propTypes = {
  recipient: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

// Component
function Information({company, recipient}) {
  return (
    <table>
      <tbody>
        <tr className="information">
          <td colSpan="2">
            <table>
              <tbody>
                <tr>
                  <td>
                    {company.company}.<br />
                    {company.address} <br />
                    {company.phone} <br />
                    {company.website}
                  </td>
                  <td>
                    {recipient.company} <br />
                    {recipient.fullname} <br />
                    {recipient.email} <br />
                    {recipient.phone}
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

export default Information;
