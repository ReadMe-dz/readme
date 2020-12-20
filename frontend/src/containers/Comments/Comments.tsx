import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import CommentForm from '../CommentForm';
import Comment from '../../components/Comment';

import './style.scss';

type props = {
  bookId: string;
  isLogged: boolean;
};

type comment = {
  content: string;
  createdAt: string;
  userId: string;
  bookId: string;
  username: string;
};

const { REACT_APP_BASE_URL } = process.env;
const socket = io(REACT_APP_BASE_URL || '', {
  transports: ['websocket'],
  jsonp: false,
});

const Comments: React.FC<props> = ({ bookId, isLogged }) => {
  const [comments, setComments] = useState<comment[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on('comment', (cmnt: comment) => {
      setComments((prevComments) => [cmnt, ...prevComments]);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${REACT_APP_BASE_URL}/comments/${bookId}`)
      .then((res) => {
        console.log(res);
        setComments(res.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  const onSend = (cmnt: comment) => {
    setComments((prevComments) => [{ ...cmnt, bookId }, ...prevComments]);
    socket.emit('comment', { ...cmnt, bookId });
  };

  return (
    <div className="comments">
      <h3 className="title">Comments: </h3>

      {isLogged && (
        <CommentForm onSend={onSend} bookId={bookId} total={comments.length} />
      )}
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((c: comment) => (
            <Comment key={c.createdAt} comment={c} />
          ))
        ) : (
          <p className="no-comment">No comment yet.</p>
        )}
      </div>
    </div>
  );
};

Comments.propTypes = {
  bookId: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default Comments;
