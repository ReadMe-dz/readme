import React, { useState } from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Tooltip';
import Image from '../../components/Image';
import getIcon from '../../utils/icons';
import './style.scss';

type props = {
  list: {
    name: string;
    id: string;
    username: string;
    wilaya: string;
    picture: string;
  }[];
  setChatWith: (id: string) => void;
};

const { REACT_APP_BASE_URL } = process.env;

const ChatList: React.FC<props> = ({ list, setChatWith }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string>();

  const onSelectChat = (id: string) => {
    setSelectedChat(id);
    setChatWith(id);
  };

  return (
    <div className="chat-list">
      <h2 className="title">Chat List</h2>
      <div className="list">
        {list.length > 0 ? (
          list.map(({ name, id, picture, username, wilaya }) => (
            <div
              key={id}
              className={`item ${selectedChat === id ? 'active' : ''}`}
              onMouseEnter={() => setUserId(id)}
              onMouseLeave={() => setUserId(null)}
            >
              <button
                className="item-button"
                type="button"
                onClick={() => onSelectChat(id)}
              >
                <div className="avatar-button">
                  <Image
                    src={`${REACT_APP_BASE_URL}/${picture}`}
                    alt={`${username} picture`}
                  />
                </div>
                <b>{name}</b>
              </button>
              <Tooltip
                display={userId === id}
                content={
                  <div className="user">
                    <div className="avatar">
                      <Image
                        src={`${REACT_APP_BASE_URL}/${picture}`}
                        alt={`${username} picture`}
                      />
                    </div>
                    <Link className="link" to={`/user/${id}`}>
                      <div className="name">
                        <h4>{name}</h4>
                        <b>@{username}</b>
                      </div>
                      <div className="wilaya">
                        <>{getIcon('pin')}</>
                        <b>{wilaya}</b>
                      </div>
                    </Link>
                  </div>
                }
              />
            </div>
          ))
        ) : (
          <div className="no-item">
            <p className="alone">
              You do not have anyone in your chat list yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ChatList.propTypes = {
  list: PropsTypes.arrayOf(
    PropsTypes.shape({
      id: PropsTypes.string.isRequired,
      name: PropsTypes.string.isRequired,
      username: PropsTypes.string.isRequired,
      wilaya: PropsTypes.string.isRequired,
      picture: PropsTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  setChatWith: PropsTypes.func.isRequired,
};

export default ChatList;
