import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  content: React.ReactNode | object;
  display: boolean;
};

const Tooltip: React.FC<props> = ({ display, content }) => {
  return (
    <div className="tooltip">
      {display && <div className="content">{content}</div>}
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
    .isRequired,
  display: PropTypes.bool.isRequired,
};

export default Tooltip;
