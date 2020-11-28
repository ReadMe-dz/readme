import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import ReCAPTCHA from 'react-google-recaptcha';
import { user as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import getIcon from '../../utils/icons';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Checkbox from '../../components/Checkbox';
import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork2.svg';
import wilayas from '../../constants/wilayas';
import './style.scss';

type subscribeValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  wilaya: string;
  terms: boolean;
};

const {
  REACT_APP_BASE_URL,
  REACT_APP_FACEBOOK_APP_ID,
  REACT_APP_GOOGLE_APP_ID,
  REACT_APP_RECAPTCHA_SITE_KEY,
} = process.env;

const Subscribe: React.FC<any> = ({ msg, setMsg }: any) => {
  const [loading, setLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isHuman, setIsHuman] = useState<boolean | null>(null);
  const initialValues: subscribeValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    wilaya: '',
    terms: false,
  };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

  const onSubmit = (
    values: subscribeValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    if (isHuman) {
      setLoading(true);
      Axios.post(`${REACT_APP_BASE_URL}/users`, values)
        .then(({ data }) => {
          const { message } = data;

          setLoading(false);
          setMsg(message);
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
    } else {
      setMsg({
        type: 'error',
        content: 'Please make sure to validate the reCaptcha.',
      });
    }
  };

  const registerWithFacebook = (data: any) => {
    setFbLoading(true);
    Axios.post(`${REACT_APP_BASE_URL}/users/register/facebook`, data)
      .then((res: any) => {
        const {
          data: { message },
        } = res;

        setFbLoading(false);
        setMsg(message);
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

  const registerWithGoogle = (response: any) => {
    const { tokenId } = response;
    if (tokenId) {
      Axios.post(`${REACT_APP_BASE_URL}/users/register/google`, { tokenId })
        .then((res) => {
          const {
            data: { message },
          } = res;

          setGoogleLoading(false);
          setMsg(message);
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
    if (error !== 'popup_closed_by_user') {
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
    <div className="subscribe">
      <div className="aside aside-left">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Read Me Logo" />
          </Link>
        </div>
        <div className="intro">
          <h2>
            Open a book, <br />
            and grow your mind.
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
              Sign In
            </Link>
          </p>
        </div>
        <div className="main">
          <h2>Sign up to Read Me</h2>

          <div className="subscribe-with">
            <FacebookLogin
              appId={REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email"
              callback={registerWithFacebook}
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
              onSuccess={registerWithGoogle}
              onFailure={onGoogleLoginFail}
            />
          </div>
          <div className="subscribe-separator">
            <span>Or</span>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: validate.name,
              username: validate.username,
              email: validate.email,
              password: validate.password,
              wilaya: validate.wilaya,
              terms: validate.terms,
            })}
            onSubmit={onSubmit}
          >
            <Form className="subscribe-form">
              <div className="name-fields">
                <Input
                  name="name"
                  label="Full name"
                  type="name"
                  className="input-name"
                />

                <Input
                  name="username"
                  label="Username"
                  type="username"
                  className="input-username"
                />
              </div>

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

              <Select
                name="wilaya"
                label="wilaya"
                className="select-wilaya"
                options={wilayas}
              />

              <Checkbox
                name="terms"
                label="Accept our Terms of Service and Privacy Policy."
                className="checkbox-terms"
              />

              <ReCAPTCHA
                sitekey={REACT_APP_RECAPTCHA_SITE_KEY || ''}
                onChange={onReCaptcha}
              />
              {isHuman !== null && !isHuman && (
                <p className="error-message">You are not a human.</p>
              )}

              <Button
                className="subscribe-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? (
                    <Loader dim={20} width={2} />
                  ) : (
                    <span>Subscribe</span>
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

export default connect(mapStateToProps, mapActionsToProps)(Subscribe);
