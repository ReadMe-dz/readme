import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { user as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import ReCaptcha from '../../components/ReCaptcha';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork3.svg';
import './style.scss';

type forgetValues = {
  email: string;
};

const { REACT_APP_BASE_URL } = process.env;

const ForgetPassword: React.FC<any> = ({ msg, setMsg }: any) => {
  const [loading, setLoading] = useState(false);
  const [isHuman, setIsHuman] = useState<boolean | null>(null);

  const initialValues: forgetValues = {
    email: '',
  };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

  const onSubmit = (
    { email }: forgetValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    if (isHuman) {
      setLoading(true);

      Axios.post(`${REACT_APP_BASE_URL}/users/reset`, { email })
        .then((res) => {
          setMsg(res.data.message);
        })
        .catch((err) => {
          console.dir(err);
          setMsg(err.response.data.message);
        });
    } else {
      setMsg({
        type: 'error',
        content: 'Please make sure to validate the reCaptcha.',
      });
    }
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
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Read Me Logo" />
            </Link>
          </div>
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
              For security reasons, we do <b>NOT</b> store your password.
            </p>
            <p>
              Enter the email address assocaited to your account and we’ll send
              you the instructions to reset your password.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              email: validate.email,
            })}
            onSubmit={onSubmit}
          >
            <Form className="forget-password-form">
              <Input
                name="email"
                label="Email address"
                type="email"
                className="input-email"
              />

              <ReCaptcha setIsHuman={setIsHuman} />

              <Button
                className="forget-password-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? (
                    <Loader dim={20} width={2} />
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

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(ForgetPassword);
