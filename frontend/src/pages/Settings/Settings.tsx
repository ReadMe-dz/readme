import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import { user as validate } from '../../validations';
import Modal from '../../components/Modal';
import ReCaptcha from '../../components/ReCaptcha';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import './style.scss';

const { REACT_APP_BASE_URL } = process.env;

type changePasswordValues = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const Settings: React.FC = ({ setMsg, user }: any) => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isHuman, setIsHuman] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initChangePasswordValues: changePasswordValues = {
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const deleteAccount = () => {
    setLoadingDelete(true);
    const { id } = user;
    Axios.delete(`${REACT_APP_BASE_URL}/users/${id}`)
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        setMsg(message);
      });
  };

  useEffect(() => {
    if (confirmed) {
      deleteAccount();
    }
  }, [confirmed]);

  const onConfirm = () => {
    setConfirmed(true);
    setOpenModal(false);
  };

  const onClose = () => {
    setConfirmed(false);
    setOpenModal(false);
  };

  const onSubmitChangePassword = (
    values: changePasswordValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const { confirmPassword, currentPassword, password } = values;
    setSubmitting(false);
    if (isHuman) {
      if (password === confirmPassword) {
        setLoading(true);
        Axios.post(`${REACT_APP_BASE_URL}/users/change-password`, {
          currentPassword,
          password,
        })
          .then((res) => {
            const {
              data: { message },
            } = res;
            setMsg(message);
            setLoading(false);
          })
          .catch((err) => {
            const {
              response: {
                data: { message },
              },
            } = err;
            setMsg(message);
            setLoading(false);
          });
      } else {
        setMsg({
          type: 'error',
          content: "The new password and it's confirmation must be the same.",
        });
      }
    } else {
      setMsg({
        type: 'error',
        content: 'Please make sure to validate the reCaptcha.',
      });
    }
  };

  if (deleted) return <Redirect to="/logout" />;

  return (
    <div className="settings">
      <h1>Account Settings</h1>
      {openModal && (
        <Modal
          title="delete account"
          content={
            <>
              <p>Do you really want to delete your account ?</p>
              <p>
                <b>Note: </b>
                <span>
                  by confirming, we will{' '}
                  <span className="danger">
                    delete your account permanently
                  </span>
                  , and there will be no way to restore you data.
                </span>
              </p>
            </>
          }
          onConfirm={onConfirm}
          onClose={onClose}
        />
      )}
      <div className="change-password">
        <h2>Change password:</h2>
        <p className="content">
          In order to protect your <b>Read Me</b> account, make sure your
          password:
        </p>
        <ul className="tips">
          <li>Is 8 characters or longer.</li>
          <li>Does not match or contain your username or name.</li>
          <li>Does containt at least one capital letter.</li>
          <li>Does containt at least one digit.</li>
          <li>Does containt at least one special character.</li>
        </ul>
        <Formik
          initialValues={initChangePasswordValues}
          validationSchema={Yup.object({
            currentPassword: validate.password,
            password: validate.password,
            confirmPassword: validate.passwordConfirmation,
          })}
          onSubmit={onSubmitChangePassword}
        >
          <Form className="change-password-form">
            <div className="row">
              <Input
                name="currentPassword"
                label="Current Password"
                type="password"
                className="input-password"
              />

              <Input
                name="password"
                label="New Password"
                type="password"
                className="input-password"
              />

              <Input
                name="confirmPassword"
                label="Password Confirmation"
                type="password"
                className="input-password"
              />
            </div>

            <ReCaptcha setIsHuman={setIsHuman} />

            <Button
              className="change-password-button"
              type="submit"
              disabled={loading}
              content={
                loading ? (
                  <Loader dim={20} width={2} />
                ) : (
                  <span>Change Password</span>
                )
              }
            />
          </Form>
        </Formik>
      </div>
      <div className="remove-account">
        <h2>Delete account</h2>
        <p className="content">
          If you delete your <b>Read Me</b> account then your profile, photos,
          books and everything else you&apos;ve added will be ereased, and you
          won&apos;t be able to retrieve anything you&apos;ve added.
        </p>

        <Button
          className="delete-button"
          type="button"
          disabled={loadingDelete}
          content={
            loadingDelete ? (
              <Loader dim={20} width={2} color="#f14141" />
            ) : (
              <span>Delete Account</span>
            )
          }
          onClick={() => setOpenModal(true)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapActionsToProps = {
  setMsg: setMessage,
};
export default connect(mapStateToProps, mapActionsToProps)(Settings);
