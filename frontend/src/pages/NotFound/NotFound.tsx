import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  message: string;
};

const NotFound: React.FC<props> = ({ message }) => {
  return (
    <div className="not-found">
      <div className="wrapper">
        <h1>Whoops,{message}</h1>
        <b>404</b>
        <div className="links">
          <Link to="/report">Report Problem</Link>
          <Link to="/">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotFound;
