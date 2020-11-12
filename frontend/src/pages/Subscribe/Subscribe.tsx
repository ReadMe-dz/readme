import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import validate from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import { generateMessage, msgTypes } from '../../utils/msgs';
import getIcon from '../../utils/icons';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Checkbox from '../../components/Checkbox';
import logo from '../../assets/images/logo.png';
import artwork from '../../assets/images/artwork2.svg';
import wilayas from '../../utils/data/wilayas.json';
import './style.scss';

type subscribeValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  wilaya: string;
  terms: boolean;
};

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3300';

const Subscribe: React.FC<any> = ({ msg, setMsg }: any) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    Axios.post(`${BASE_URL}/users`, values)
      .then(({ data }) => {
        if (data && data.success) {
          setMsg({
            type: 'success',
            content: `@${values.username} has been created.`,
          });
          setLoading(false);
        } else {
          setMsg(generateMessage(msgTypes.SERVER));
        }
      })
      .catch((err) => {
        setMsg(
          err.response.data.message ||
            generateMessage(
              err.response.status === 409 ? msgTypes.CONFLICT : msgTypes.SERVER
            )
        );
      });
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
          <div className="subscribe-separator">
            <span>Or</span>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              name: validate.user.name,
              username: validate.user.username,
              email: validate.user.email,
              password: validate.user.password,
              wilaya: validate.user.wilaya,
              terms: validate.user.terms,
            })}
            onSubmit={(values, { setSubmitting }) =>
              onSubmit(values, { setSubmitting })
            }
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

              <Button
                className="subscribe-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? (
                    <Loader dim={20} width={2} color="#212121" />
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
