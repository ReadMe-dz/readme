import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../../redux-store/actions/user.actions';
import { clearErrors } from '../../redux-store/actions/error.actions';
import validate from '../../validations';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork.svg';
import './style.scss';

type loginValues = {
  email: string;
  password: string;
};

const Login: React.FC<any> = ({ history, login, error, clear }: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: loginValues = { email: '', password: '' };

  useEffect(() => {
    setLoading(error.loading);
    if (error.errors) {
      setTimeout(() => {
        clear();
      }, 4000);
    }
  }, [error]);

  const onSubmit = (
    values: loginValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    setLoading(true);
    login(values, history);
  };

  return (
    <div className="login">
      {error.errors && <Message type="error" content={error.errors.message} />}
      <div className="aside aside-left">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Read Me Logo" />
          </Link>
        </div>
        <div className="intro">
          <h2>
            Welcome to the biggest web platfrom for books exchanging in all of
            Algeria.
          </h2>
        </div>
        <div className="artwork">
          <img src={artwork} alt="open a book, grow your mind." />
        </div>
      </div>
      <div className="aside aside-right">
        <div className="head">
          <p>
            Not a member?
            <Link className="login-link" to="/subscribe">
              Sign up now
            </Link>
          </p>
        </div>
        <div className="main">
          <h2>Sign in to Read Me</h2>
          <div className="login-with">
            <Button
              className="facebook-button"
              onClick={() => console.log('to be handeled later.')}
              type="button"
              content={
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    className="icon"
                  >
                    <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                  </svg>
                  <span>with Facebook</span>
                </>
              }
            />
            <Button
              className="google-button"
              onClick={() => console.log('to be handeled later.')}
              type="button"
              content={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  className="icon"
                >
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
              }
            />
            <Button
              className="twitter-button"
              onClick={() => console.log('to be handeled later.')}
              type="button"
              content={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  className="icon"
                >
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              }
            />
          </div>
          <div className="login-separator">
            <span>Or</span>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              email: validate.user.email,
              password: validate.user.password,
            })}
            onSubmit={(values, { setSubmitting }) =>
              onSubmit(values, { setSubmitting })
            }
          >
            <Form className="login-form">
              <Input
                name="email"
                label="Email address"
                type="email"
                className="input-email"
              />
              <Input
                name="password"
                label="Password"
                type="password"
                className="input-password"
              />
              <Link className="login-link" to="/forget-password">
                Forgot password ?
              </Link>

              <Button
                className="login-button"
                type="submit"
                disabled={error.errors}
                content={
                  <>
                    {loading && <Loader dim={20} width={2} color="#212121" />}
                    <span>Login</span>
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
  user: state.user,
  error: state.error,
});
const mapActionsToProps = {
  login: loginUser,
  clear: clearErrors,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
