// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {
  company: PropTypes.object.isRequired,
};

// Component
function Header ({company}) {
  return (
    <header className="clearfix">
      <div id="logo">
        <img
          src={company.logo}
        />
      </div>
      <div id="company">
        <h2 className="name">
          {company.company}
        </h2>
        <div>
          {company.address}
        </div>
        <div>
          {company.phone}
        </div>
        <div>
          {company.website}
        </div>
      </div>
    </header>
  );
}

export default Header;
