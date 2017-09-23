// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

// Component
function Footer({company}) {
  return (
    <div>
      <h4 className="label">{company.company}</h4>
      <p>{company.fullname}</p>
      <p>{company.address}</p>
      <p>{company.email}</p>
      <p>{company.phone}</p>
    </div>
  );
}

Footer.propTypes = {
  company: PropTypes.object.isRequired,
};

export default Footer;
