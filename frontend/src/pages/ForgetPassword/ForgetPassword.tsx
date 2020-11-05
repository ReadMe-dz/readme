import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../redux-store/actions/error.actions';
import validate from '../../validations';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork3.svg';
import './style.scss';

type forgetValues = {
  email: string;
};

const ForgetPassword: React.FC<any> = ({ error, clear }: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: forgetValues = {
    email: '',
  };

  useEffect(() => {
    setLoading(error.loading);
    if (error.errors) {
      setTimeout(() => {
        clear();
      }, 4000);
    }
  }, [error]);

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
      {error && error.errors && (
        <Message type="error" content={error.errors.message} />
      )}
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
            Already a member?
            <Link className="login-link" to="/login">
              Sign in
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
              email: validate.user.email,
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
                disabled={error.errors}
                content={
                  <>
                    {loading && <Loader dim={20} width={2} color="#212121" />}
                    <span>send reset instructions</span>
                  </>
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
  error: state.error,
});
const mapActionsToProps = {
  clear: clearErrors,
};
export default connect(mapStateToProps, mapActionsToProps)(ForgetPassword);
