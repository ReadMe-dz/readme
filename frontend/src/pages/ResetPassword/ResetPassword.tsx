import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { user as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork4.svg';
import './style.scss';

type forgetValues = {
  password: string;
  passwordConfirmation: string;
};

const { REACT_APP_BASE_URL } = process.env;

const ResetPassword: React.FC<any> = ({
  msg,
  setMsg,
  match: {
    params: { resetToken },
  },
}: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: forgetValues = {
    password: '',
    passwordConfirmation: '',
  };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

  const onSubmit = (
    { password, passwordConfirmation }: forgetValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    setLoading(true);
    if (password === passwordConfirmation) {
      Axios.post(`${REACT_APP_BASE_URL}/users/change`, {
        password,
        resetToken,
      })
        .then((res) => {
          setMsg(res.data.message);
        })
        .catch((err) => {
          setMsg(err.response.data.message);
        });
    } else {
      setMsg({
        type: 'error',
        content: 'Password and confirmation must match.',
      });
    }
  };

  return (
    <div className="reset-password">
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
        <div className="head">
          <p>
            Not a member?
            <Link className="subscribe-link" to="/subscribe">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="main">
          <h2>Rest Your Password</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              password: validate.password,
              passwordConfirmation: validate.passwordConfirmation,
            })}
            onSubmit={onSubmit}
          >
            <Form className="reset-password-form">
              <Input
                name="password"
                label="New Password"
                type="password"
                className="input-password"
              />

              <Input
                name="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                className="input-password"
              />

              <Button
                className="reset-password-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? (
                    <Loader dim={20} width={2} />
                  ) : (
                    <span>Reset Password</span>
                  )
                }
              />
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  msg: state.msg,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(ResetPassword);
