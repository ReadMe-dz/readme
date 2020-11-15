import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../../redux-store/actions/user.actions';
import { user as validate } from '../../validations';
import getIcon from '../../utils/icons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork.svg';
import './style.scss';

type loginValues = {
  email: string;
  password: string;
};

const Login: React.FC<any> = ({ history, login, msg }: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: loginValues = { email: '', password: '' };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

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
              Sign Up Now
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
                  <span className="icon">{getIcon('facebook')}</span>
                  <span>with Facebook</span>
                </>
              }
            />
            <Button
              className="google-button"
              onClick={() => console.log('to be handeled later.')}
              type="button"
              content={<span className="icon">{getIcon('google')}</span>}
            />
            <Button
              className="twitter-button"
              onClick={() => console.log('to be handeled later.')}
              type="button"
              content={<span className="icon">{getIcon('twitter')}</span>}
            />
          </div>
          <div className="login-separator">
            <span>Or</span>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              email: validate.email,
              password: validate.password,
            })}
            onSubmit={onSubmit}
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
                <b>Forgot your password?</b>
              </Link>

              <Button
                className="login-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? (
                    <Loader dim={20} width={2} color="#212121" />
                  ) : (
                    <span>Login</span>
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
  user: state.user,
  msg: state.msg,
});

const mapActionsToProps = {
  login: loginUser,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
