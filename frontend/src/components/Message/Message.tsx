import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

type props = {
  content: string;
  type: 'success' | 'error';
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
  type: PropTypes.oneOf<'success' | 'error'>(['success', 'error']).isRequired,
};

export default Message;
