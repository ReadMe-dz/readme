import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.scss';

type message = {
  content: string;
  from: {
    id: string;
    name: string;
    username: string;
    picture: string;
    wilaya: string;
  };
  to: {
    id: string;
    name: string;
    username: string;
    picture: string;
    wilaya: string;
  };
  id: string;
  createdAt: string;
};

type props = {
  message: message;
  isMe: boolean;
};

const ChatMessage: React.FC<props> = ({
  message: { content, createdAt },
  isMe,
}) => {
  return (
    <div className={`chat-message ${isMe ? 'me' : 'not-me'}`}>
      <div className="content">
        <b className="sent-at">sent {moment(createdAt).fromNow()}</b>
        <p>{content}</p>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    from: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      wilaya: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    to: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      wilaya: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isMe: PropTypes.bool.isRequired,
};

export default ChatMessage;
