import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import CommentForm from '../../components/CommentForm';
import Comment from '../../components/Comment';

import './style.scss';

type props = {
  bookId: string;
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

const Comments: React.FC<props> = ({ bookId }) => {
  const [comments, setComments] = useState<comment[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on('message', (cmnt: comment) => {
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
    socket.emit('message', { ...cmnt, bookId });
  };

  return (
    <div className="comments">
      <CommentForm onSend={onSend} bookId={bookId} total={comments.length} />
      <div className="comments-list">
        {comments.map((c: comment) => (
          <Comment key={c.createdAt} comment={c} />
        ))}
      </div>
    </div>
  );
};

Comments.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default Comments;
