import React from 'react';
import PropTypes from 'prop-types';
import monent from 'moment';
import './style.scss';

type props = {
  comment: {
    content: string;
    createdAt: string;
    userId: string;
    bookId: string;
    username: string;
  };
};

const Comment: React.FC<props> = ({
  comment: { content, createdAt, userId, username },
}) => {
  return (
    <div className="comment">
      <div className="head">
        <a className="link" href={`/user/${userId}`}>
          <h4>{username}</h4>
        </a>
        <b className="time">
          <span className="moment">{monent(createdAt).fromNow()}</span>
        </b>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    bookId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
