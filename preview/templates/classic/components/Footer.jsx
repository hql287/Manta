// React Libraries
import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {
  company: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired,
};

// Component
function Footer({company, invoice}) {
  const {recipient} = invoice;
  return (
    <div className="clearfix" id="details">
      <div id="project">
        <div className="arrow">
          <div className="inner-arrow">
            <span>CLIENT</span> {recipient.fullname}
          </div>
        </div>
        {recipient.company &&
          <div className="arrow">
            <div className="inner-arrow">
              <span>COMPANY</span> {recipient.company}
            </div>
          </div>}
        <div className="arrow">
          <div className="inner-arrow">
            <span>EMAIL</span> {recipient.email}
          </div>
        </div>
        {recipient.phone &&
          <div className="arrow">
            <div className="inner-arrow">
              <span>PHONE</span> {recipient.phone}
            </div>
          </div>}
      </div>
      <div id="company">
        <div className="arrow back">
          <div className="inner-arrow">
            {company.company} <span>COMPANY</span>
          </div>
        </div>
        <div className="arrow back">
          <div className="inner-arrow">
            {company.address} <span>ADDRESS</span>
          </div>
        </div>
        <div className="arrow back">
          <div className="inner-arrow">
            {company.phone} <span>PHONE</span>
          </div>
        </div>
        <div className="arrow back">
          <div className="inner-arrow">
            {company.email} <span>EMAIL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
