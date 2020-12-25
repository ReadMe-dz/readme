import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  children: React.ReactNode | React.ReactNode[];
  column?: boolean;
};

const InnerWrapper: React.FC<props> = ({ column, children }) => {
  return <div className={`wrapper ${column ? 'column' : ''}`}>{children}</div>;
};

InnerWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.elementType),
  ]).isRequired,
  column: PropTypes.bool,
};

InnerWrapper.defaultProps = {
  column: false,
};

export default InnerWrapper;
