import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  dim?: number;
  width?: number;
  color?: string;
};

const Loader: React.FC<props> = ({ dim, width, color }) => {
  return (
    <div
      className="loader"
      style={{
        width: dim,
        height: dim,
      }}
    >
      <span
        style={{
          width: dim,
          height: dim,
          borderTopColor: color,
          borderWidth: width,
        }}
      />
    </div>
  );
};

Loader.propTypes = {
  dim: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.string,
};

Loader.defaultProps = {
  dim: 50,
  width: 2,
  color: '#ea4c89',
};

export default Loader;
