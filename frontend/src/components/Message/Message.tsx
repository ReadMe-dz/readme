import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  content: string;
  type: 'sucess' | 'error';
};

const Message: React.FC<props> = ({ content, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{content}</p>
    </div>
  );
};

Message.propTypes = {
  content: PropTypes.string.isRequired,
  type: PropTypes.oneOf<'sucess' | 'error'>(['sucess', 'error']).isRequired,
};

export default Message;
