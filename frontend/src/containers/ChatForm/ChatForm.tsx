import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { message as validate } from '../../validations';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import getIcon from '../../utils/icons';

import './style.scss';

type messageValues = {
  content: string;
};

type props = {
  onSend: (msg: string) => void;
  setMsg: (message: any) => void;
  disabled: boolean;
};

const CommentForm: React.FC<props> = ({ onSend, setMsg, disabled }) => {
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

  const onImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const {
        target: { files },
      } = e;

      const file = files[0];
      if (file) {
        if (file.size < 1500000) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function () {
            if (reader.result) {
              onSend(reader.result.toString());
            } else {
              setMsg({
                type: 'error',
                content: 'We could not upload the image, please try again.',
              });
            }
          };
        } else {
          setMsg({
            type: 'error',
            content:
              "The image's size is too large. please selcet images with a size less then 1.5 MB",
          });
        }
      } else {
        setMsg({
          type: 'error',
          content: 'We could not upload the image, please try again.',
        });
      }
    } else {
      setMsg({
        type: 'error',
        content: 'Unvalid image file.',
      });
    }
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
            placeholder="Write your message"
          />

          <div className="upload-image">
            <input
              disabled={disabled}
              type="file"
              onChange={onImageSend}
              title="select an image"
              accept="image/*"
            />
            <Button
              disabled={disabled}
              className="send-image"
              type="button"
              content={getIcon('upload')}
            />
          </div>

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
  setMsg: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CommentForm;
