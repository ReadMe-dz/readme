import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import { report as validate } from '../../validations';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import ReCaptcha from '../../components/ReCaptcha';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import reports from '../../constants/reports';

import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork5.svg';
import './style.scss';

type reportValues = {
  title: string;
  type: string;
  details: string;
};

const { REACT_APP_BASE_URL } = process.env;

const Report: React.FC = ({ setMsg }: any) => {
  const [loading, setLoading] = useState(false);
  const [isHuman, setIsHuman] = useState(false);

  const initVal: reportValues = {
    title: '',
    type: '',
    details: '',
  };

  const onSubmit = (
    values: reportValues,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(false);
    if (isHuman) {
      setLoading(true);

      Axios.post(`${REACT_APP_BASE_URL}/reports`, values)
        .then(() => {
          setMsg({
            type: 'success',
            content: 'The type was sent successfully.',
          });
        })
        .catch((err) => {
          console.dir(err);
          setMsg({
            type: 'error',
            content:
              'Sorry! an error occured while sending the report. Please check your internet connection and try again.',
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="report">
      <div className="aside aside-left">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Read Me Logo" />
          </Link>
        </div>
        <div className="intro">
          <h2>
            &ldquo; Weak passwords are a crook&apos;s best friend.&rdquo;
            <br />
            <b>Jean Chatzky</b>
          </h2>
        </div>
        <div className="artwork">
          <img src={artwork} alt="open a book, and grow your mind." />
        </div>
      </div>
      <div className="aside aside-right">
        <div className="report-form">
          <Formik
            enableReinitialize
            initialValues={initVal}
            validationSchema={Yup.object({
              title: validate.title,
              type: validate.type,
              details: validate.details,
            })}
            onSubmit={onSubmit}
          >
            <Form>
              <Input
                name="title"
                label="The Report Title"
                type="text"
                className="input-title"
                placeholder="ex: page not loading"
              />
              <Select
                label="The report type"
                name="type"
                options={reports}
                className="select-type"
              />
              <Textarea
                name="details"
                label="The Report Details"
                className="details"
                placeholder="What is the expcted behavior and what did you get."
              />

              <ReCaptcha setIsHuman={setIsHuman} />

              <Button
                className="send-button"
                type="submit"
                disabled={loading}
                content={
                  loading ? <Loader dim={20} width={2} /> : <span>Send</span>
                }
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(null, mapActionsToProps)(Report);
