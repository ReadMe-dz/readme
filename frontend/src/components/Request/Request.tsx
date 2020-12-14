import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { request as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import getIcon from '../../utils/icons';
import Loader from '../Loader';
import Button from '../Button';
import Input from '../Input';
import './style.scss';

type commentValues = {
  comment: string;
};

type request = {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    wilaya: string;
  };
  title: string;
  author: string;
  language: string;
  details: string;
  comments: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    comment: string;
    commentedAt: string;
  }[];
  createdAt: string;
};

type props = {
  request: request;
  onComment: (comment: any) => void;
  onDelete: (id: string) => void;
  setMsg: (message: any) => void;
  user: any;
};

const { REACT_APP_BASE_URL } = process.env;

const Request: React.FC<props> = ({
  request: {
    id,
    user: { id: userId, name, username, wilaya },
    title,
    author,
    language,
    details,
    createdAt,
    comments,
  },
  onComment,
  onDelete,
  setMsg,
  user,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [reqComments, setReqComments] = useState(comments);
  const [loading, setLoading] = useState(false);
  const initValue: commentValues = { comment: '' };

  const onSubmit = (
    { comment }: commentValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    setLoading(true);

    const theComment = {
      id: (Math.ceil(Math.random() * 100) + new Date().getTime()).toString(),
      requestId: id,
      comment,
      user: {
        id: user.id,
        name: user.name,
      },
    };

    Axios.post(`${REACT_APP_BASE_URL}/requests/add-comment`, theComment)
      .then(() => {
        resetForm();
        onComment({
          ...theComment,
          commentedAt: new Date().toISOString(),
        });
      })
      .catch((err) => {
        console.dir(err);
        const {
          response: {
            data: { message },
          },
        } = err;
        setMsg(message);
      })
      .finally(() => setLoading(false));
  };

  const deleteComment = (commentId: string) => {
    setReqComments([...reqComments.filter((c) => c.id !== commentId)]);

    Axios.post(`${REACT_APP_BASE_URL}/requests/delete-comment`, {
      commentId,
      requestId: id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.dir(err);
        const {
          response: {
            data: { message },
          },
        } = err;
        setMsg(message);
      });
  };

  const deleteRequest = () => {
    Axios.delete(`${REACT_APP_BASE_URL}/requests/${id}`)
      .then(() => {
        setMsg({
          type: 'success',
          content: 'The request has been deleted.',
        });

        onDelete(id);
      })
      .catch((err) => {
        console.log(err);
        const {
          response: { message },
        } = err;
        setMsg(message);
      });
  };
  return (
    <div className="request">
      <div className="head">
        <Link className="user" to={`/user/${userId}`}>
          <h2 className="name">{name}</h2>
          <b>@{username}</b>
        </Link>
        <div className="coord">
          <b className="created-at">
            Added {moment(new Date(createdAt).toISOString()).fromNow()}
          </b>
          <b className="created-from">
            , from <span>{wilaya}</span>.
          </b>
        </div>
        {user.id === userId && (
          <Button
            className="delete-button"
            onClick={deleteRequest}
            content={getIcon('trash')}
          />
        )}
      </div>
      <div className="content">
        <div className="infos">
          <p className="title">
            <b>The Title:</b>
            <span>{title}</span>
          </p>
          <p className="author">
            <b>The Author:</b>
            <span>{author}</span>
          </p>
          <p className="language">
            <b>The Language:</b>
            <span>{language}</span>
          </p>
        </div>
        {details.length > 0 && (
          <div className="details">
            <p>
              <b>More details:</b> {details}
            </p>
          </div>
        )}
      </div>
      <div className="foot">
        <Button
          onClick={() => setIsComments(!isComments)}
          content={
            <>
              <p>{isComments ? 'Close' : 'Open'} the comment section</p>
              <b>{`${reqComments.length} comments`}</b>
            </>
          }
        />
        <div className={`comments-section ${isComments ? 'open' : ''}`}>
          <div className="comments-form">
            <Formik
              initialValues={initValue}
              validationSchema={Yup.object({
                comment: validate.comment,
              })}
              onSubmit={onSubmit}
            >
              <Form>
                <Input
                  label=""
                  type="text"
                  placeholder="Your comment"
                  name="comment"
                />
                <Button
                  className="comment-button"
                  type="submit"
                  disabled={loading}
                  content={
                    loading ? (
                      <Loader dim={15} width={2} />
                    ) : (
                      <span>Comment</span>
                    )
                  }
                />
              </Form>
            </Formik>
          </div>
          <div className="comments-list">
            {reqComments.length === 0 ? (
              <p className="no-comment">No Comment</p>
            ) : (
              reqComments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="head">
                    <Link to={`/user/${comment.user.id}`}>
                      {comment.user.name}
                    </Link>
                    <b>
                      {moment(
                        new Date(comment.commentedAt).toISOString()
                      ).fromNow()}
                    </b>
                    {user.id === comment.user.id && (
                      <Button
                        className="delete-button"
                        content={getIcon('trash')}
                        onClick={() => deleteComment(comment.id)}
                      />
                    )}
                  </div>
                  <div className="content">
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Request.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      wilaya: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        commentedAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  onComment: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Request);
