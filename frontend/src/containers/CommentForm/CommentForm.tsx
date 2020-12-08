import React, { useState } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import { comment as validate } from '../../validations';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import './style.scss';

type commentValues = {
  content: string;
};

const { REACT_APP_BASE_URL } = process.env;

const CommentForm: React.FC<any> = ({
  msg,
  setMsg,
  bookId,
  user,
  onSend,
  total,
}: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: commentValues = { content: '' };

  const onSubmit = (
    { content }: commentValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    setLoading(true);
    Axios.post(`${REACT_APP_BASE_URL}/comments`, {
      content,
      bookId,
      userId: user.id,
      username: user.name,
    })
      .then(() => {
        resetForm();
        onSend({
          content,
          bookId,
          userId: user.id,
          username: user.name,
          createdAt: new Date().toISOString(),
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

  return (
    <div className="comments-form">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          content: validate.content,
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <Textarea
            name="content"
            label={user.name}
            className="content"
            placeholder="write your comment"
          />

          <div className="foot">
            <Button
              className="comment-button"
              type="submit"
              disabled={msg.content}
              content={
                loading ? <Loader dim={15} width={2} /> : <span>Comment</span>
              }
            />
            <b>{total} comments</b>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  msg: state.msg,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(CommentForm);
