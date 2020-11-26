import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import ReCAPTCHA from 'react-google-recaptcha';
import { loginUser } from '../../redux-store/actions/user.actions';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
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

const {
  REACT_APP_FACEBOOK_APP_ID,
  REACT_APP_BASE_URL,
  REACT_APP_GOOGLE_APP_ID,
  REACT_APP_RECAPTCHA_SITE_KEY,
} = process.env;

const Login: React.FC<any> = ({ history, login, msg, setMsg }: any) => {
  const [loading, setLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isHuman, setIsHuman] = useState<boolean | null>(null);
  const initialValues: loginValues = { email: '', password: '' };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

  const onSubmit = (
    userData: loginValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    if (isHuman) {
      setLoading(true);
      Axios.post(`${REACT_APP_BASE_URL}/users/login`, userData)
        .then((res) => {
          const { user, token } = res.data;
          localStorage.setItem('token', `Bearer ${token}`);
          Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          setLoading(false);
          login(user);
          history.push('/');
        })
        .catch((err) => {
          const {
            response: {
              data: { message },
            },
          } = err;
          setLoading(false);
          setMsg(message);
        });
    }
  };

  const loginWithFacebook = (data: any) => {
    setFbLoading(true);
    Axios.post(`${REACT_APP_BASE_URL}/users/login/facebook`, data)
      .then((res) => {
        const { user, token } = res.data;
        localStorage.setItem('token', `Bearer ${token}`);
        Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        setFbLoading(false);
        login(user);
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        setFbLoading(false);
        setMsg(message);
      });
  };

  const loginWithGoogle = (response: any) => {
    const { tokenId } = response;
    if (tokenId) {
      Axios.post(`${REACT_APP_BASE_URL}/users/login/google`, { tokenId })
        .then((res) => {
          const { user, token } = res.data;
          localStorage.setItem('token', `Bearer ${token}`);
          Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          setGoogleLoading(false);
          login(user);
        })
        .catch((err) => {
          const {
            response: {
              data: { message },
            },
          } = err;
          setGoogleLoading(false);
          setMsg(message);
        });
    } else {
      setGoogleLoading(false);
    }
  };

  const onGoogleLoginFail = ({ error }: any) => {
    setGoogleLoading(false);
    if (error && error !== 'popup_closed_by_user') {
      setMsg({
        type: 'error',
        content:
          'Apologies. We could not sing in with google, Please refresh and try again.',
      });
    }
  };

  const onReCaptcha = (data: any) => {
    if (data) {
      setIsHuman(true);
    } else {
      setIsHuman(false);
    }
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
            <FacebookLogin
              appId={REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email"
              callback={loginWithFacebook}
              render={(renderProps: any) => (
                <Button
                  className="facebook-button"
                  onClick={renderProps.onClick}
                  type="button"
                  disabled={fbLoading}
                  content={
                    fbLoading ? (
                      <Loader dim={20} width={2} color="#2a75f3" />
                    ) : (
                      <>
                        <span className="icon">{getIcon('facebook')}</span>
                        <span>With Facebook</span>
                      </>
                    )
                  }
                />
              )}
            />
            <GoogleLogin
              clientId={REACT_APP_GOOGLE_APP_ID || ''}
              render={(renderProps) => (
                <Button
                  className="google-button"
                  onClick={() => {
                    renderProps.onClick();
                    setGoogleLoading(true);
                  }}
                  type="button"
                  disabled={renderProps.disabled}
                  content={
                    googleLoading ? (
                      <Loader dim={20} width={2} color="#333333" />
                    ) : (
                      <span className="icon">{getIcon('google')}</span>
                    )
                  }
                />
              )}
              disabled={googleLoading}
              onSuccess={loginWithGoogle}
              onFailure={onGoogleLoginFail}
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

              <ReCAPTCHA
                sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
                onChange={onReCaptcha}
              />
              {isHuman !== null && !isHuman && (
                <p className="error-message">You are not a human.</p>
              )}

              <Button
                className="login-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? <Loader dim={20} width={2} /> : <span>Login</span>
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
  setMsg: setMessage,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
