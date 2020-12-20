import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { request as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import languages from '../../constants/languages';
import './style.scss';

type requestValue = {
  author: string;
  title: string;
  language: string;
  details: string;
};

type props = {
  setMsg: (message: any) => void;
};

const { REACT_APP_BASE_URL } = process.env;

const RequestsForm: React.FC<props> = ({ setMsg }) => {
  const [loading, setLoading] = useState(false);

  const initValue: requestValue = {
    author: '',
    title: '',
    language: '',
    details: '',
  };

  const onSubmit = (
    { author, title, language, details }: requestValue,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    setLoading(true);
    Axios.post(`${REACT_APP_BASE_URL}/requests`, {
      author,
      title,
      language,
      details,
    })
      .then(() => {
        resetForm();
        setMsg({
          type: 'success',
          content:
            'Your request have been added successfully, please refresh the page to load it.',
        });
      })
      .catch((err) => {
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
    <div className="requests-form">
      <Formik
        initialValues={initValue}
        validationSchema={Yup.object({
          author: validate.author,
          title: validate.title,
          language: validate.language,
          details: validate.details,
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="head">
            <Input
              name="title"
              label="Title"
              className="title"
              type="text"
              placeholder="The book's title"
            />
            <Input
              name="author"
              label="Author"
              className="author"
              type="text"
              placeholder="The book's author"
            />
            <Select
              label="Language"
              name="language"
              options={languages}
              className="select-language"
            />
          </div>

          <Textarea
            name="details"
            label="More Details"
            className="details"
            placeholder="Add some details about the book, and be more specific about the price, the edition, the publisher..."
          />

          <div className="foot">
            <Button
              className="comment-button"
              type="submit"
              disabled={loading}
              content={
                loading ? (
                  <Loader dim={15} width={2} />
                ) : (
                  <span>Request a book</span>
                )
              }
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

RequestsForm.propTypes = {
  setMsg: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(null, mapActionsToProps)(RequestsForm);
