import React from 'react';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import ChatMessage from '../../components/ChatMessage';
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
  createdAt: string;
  id: string;
};

type props = {
  messages: message[];
  myId: string;
};

const ChatMessages: React.FC<props> = ({ messages, myId }) => {
  return (
    <ScrollToBottom>
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isMe={myId === msg.from.id}
            />
          ))
        ) : (
          <p>You do not have any messages yet</p>
        )}
      </div>
    </ScrollToBottom>
  );
};

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
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
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  myId: PropTypes.string.isRequired,
};

export default ChatMessages;
