import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { user as validate } from '../../validations';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork3.svg';
import './style.scss';

type forgetValues = {
  email: string;
};

const ForgetPassword: React.FC<any> = ({ msg }: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: forgetValues = {
    email: '',
  };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

  const onSubmit = (
    values: forgetValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    setLoading(true);
    console.log(values);
    // use axios.
  };

  return (
    <div className="forget-password">
      <div className="aside aside-left">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Read Me Logo" />
          </Link>
        </div>
        <div className="intro">
          <h2>
            &ldquo; Treat your password like your toothbrush. Don&apos;t let
            anybody else use it, and get a new one every six months. &rdquo;
            <br />
            <b>Clifford Stoll</b>
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
          <h2>Forgot Password?</h2>
          <div className="instructions">
            <p>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <p>
              For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              email: validate.email,
            })}
            onSubmit={(values, { setSubmitting }) =>
              onSubmit(values, { setSubmitting })
            }
          >
            <Form className="forget-password-form">
              <Input
                name="email"
                label="Email address"
                type="email"
                className="input-email"
              />

              <Button
                className="forget-password-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? (
                    <Loader dim={20} width={2} color="#212121" />
                  ) : (
                    <span>Send Reset Instructions</span>
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
export default connect(mapStateToProps)(ForgetPassword);
