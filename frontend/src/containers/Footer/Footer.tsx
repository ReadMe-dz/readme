import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InnerWrapper from '../../components/InnerWrapper';
import Image from '../../components/Image';
import getIcon from '../../utils/icons';
import logo from '../../assets/images/logo.png';
import './style.scss';

type props = {
  count?: number;
};

const Footer: React.FC<props> = ({ count }) => {
  return (
    <div className="footer">
      <InnerWrapper column>
        <div className="row links">
          <div className="column">
            <div className="logo">
              <Image src={logo} alt="logo" />
            </div>

            <p>
              <b>ReadMe</b> is the biggest web platfrom for books exchanging in
              all of Algeria.
            </p>

            <ul className="media">
              <li className="facebook">
                <a href="https://facebook.com">{getIcon('facebook')}</a>
              </li>
              <li className="twitter">
                <a href="https://twitter.com">{getIcon('twitter')}</a>
              </li>
            </ul>
          </div>

          <div className="column">
            <h4>Application</h4>
            <Link to="/terms">Terms of service</Link>
            <Link to="/standards">Community Standards</Link>
            <Link to="/policy">Privacy policy</Link>
          </div>

          <div className="column">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/location">Location</Link>
          </div>

          <div className="column">
            <h4>Services</h4>
            <Link to="/report">Report A Problem</Link>
            <Link to="/ama">AMA</Link>
            <Link to="/faq">FAQs</Link>
          </div>
        </div>
        <div className="row rights">
          <p>
            © {new Date().getFullYear()} <b>Read Me</b> . All rights reserved.
          </p>
          <p>Made with ♥ in Algeria</p>
          {count !== -1 && <p>{count} books have been shared</p>}
        </div>
      </InnerWrapper>
    </div>
  );
};

Footer.propTypes = {
  count: PropTypes.number,
};

Footer.defaultProps = {
  count: -1,
};

export default Footer;
