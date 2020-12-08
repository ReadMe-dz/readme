import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { message as validate } from '../../validations';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';

import './style.scss';

type messageValues = {
  content: string;
};

type props = {
  onSend: (msg: string) => void;
  disabled: boolean;
};

const CommentForm: React.FC<props> = ({ onSend, disabled }) => {
  const initialValues: messageValues = { content: '' };

  const onSubmit = (
    { content }: messageValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    resetForm();
    onSend(content);
  };

  return (
    <div className="chat-form">
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
            label=""
            className="content"
            placeholder="write your message"
          />
          <Button
            disabled={disabled}
            className="send-button"
            type="submit"
            content="send"
          />
        </Form>
      </Formik>
    </div>
  );
};

CommentForm.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CommentForm;
