import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import './style.scss';

const Geust: React.FC = () => {
  return (
    <div className="geust">
      <h2>Do you have books that you no longer use?</h2>
      <h2>Do you have books you want to sell?</h2>
      <p>
        Post your ad for free on <b>Read Me</b>
        <br />
        and sell them now for the benefit of you and others.
      </p>
      <div className="auth">
        <Link className="login-button" to="/login">
          <Button content="Sign In" />
        </Link>
        <Link className="subscribe-button" to="/subscribe">
          <Button content="Create A New Account" />
        </Link>
      </div>
    </div>
  );
};

export default Geust;
