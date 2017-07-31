// React Libraries
import React from 'react';

// Component
const Footer = props =>
  <div id="details" className="clearfix">
    <div id="project">
      <div className="arrow">
        <div className="inner-arrow">
          <span>PROJECT</span> Website development
        </div>
      </div>
      <div className="arrow">
        <div className="inner-arrow">
          <span>CLIENT</span> John Doe
        </div>
      </div>
      <div className="arrow">
        <div className="inner-arrow">
          <span>ADDRESS</span> 796 Silver Harbour, TX 79273, US
        </div>
      </div>
      <div className="arrow">
        <div className="inner-arrow">
          <span>EMAIL</span>{' '}
          <a href="mailto:john@example.com">john@example.com</a>
        </div>
      </div>
    </div>
    <div id="company">
      <div className="arrow back">
        <div className="inner-arrow">
          Company Name <span>COMPANY</span>
        </div>
      </div>
      <div className="arrow back">
        <div className="inner-arrow">
          455 Foggy Heights, AZ 85004, US <span>ADDRESS</span>
        </div>
      </div>
      <div className="arrow back">
        <div className="inner-arrow">
          (602) 519-0450 <span>PHONE</span>
        </div>
      </div>
      <div className="arrow back">
        <div className="inner-arrow">
          <a href="mailto:company@example.com">company@example.com</a>{' '}
          <span>EMAIL</span>
        </div>
      </div>
    </div>
  </div>;
export default Footer;
