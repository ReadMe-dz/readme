import React, { ChangeEvent, useState } from 'react';
import Axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { user as validate } from '../../validations';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import InnerWrapper from '../../components/InnerWrapper';
import Input from '../../components/Input';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import wilayas from '../../constants/wilayas';
import './style.scss';

type profileValues = {
  name: string;
  username: string;
  email: string;
  wilaya: string;
  moreInfo: string;
  birthdate: string;
  phone: string;
  facebook: string;
  twitter: string;
  password: string;
  passwordConfirmation: string;
};

const { REACT_APP_BASE_URL } = process.env;

const CompleteProfile: React.FC<any> = ({ user, msg, setMsg }: any) => {
  const { id, picture } = user;
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState<string | Blob>(picture);

  const initVal: profileValues = {
    name: user.name,
    username: user.username,
    wilaya: user.wilaya,
    email: user.email,
    moreInfo: user.moreInfo || '',
    birthdate: user.birthdate
      ? new Date(user.birthdate).toISOString().substring(0, 10)
      : '',
    phone: user.phone || '',
    facebook: user.facebook || '',
    twitter: user.twitter || '',
    password: '',
    passwordConfirmation: '',
  };

  const onSubmit = (
    values: profileValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    setLoading(true);

    const {
      name,
      username,
      email,
      wilaya,
      moreInfo,
      birthdate,
      phone,
      facebook,
      password,
      twitter,
    } = values;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('wilaya', wilaya);
    formData.append('moreInfo', moreInfo);
    formData.append('birthdate', birthdate);
    formData.append('phone', phone);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('picture', pic);
    formData.append('complete', 'true');

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    Axios.patch(`${REACT_APP_BASE_URL}/users/${id}`, formData, config)
      .then((res) => {
        setMsg(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        setMsg(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPic(e.target.files[0]);
  };

  return (
    <div className="complete-profile">
      <InnerWrapper column>
        <div className="head">
          <h1>Complete profile</h1>
        </div>
        <div className="edit-form">
          <Formik
            initialValues={initVal}
            validationSchema={Yup.object({
              name: validate.name,
              wilaya: validate.wilaya,
              phone: validate.phone,
              twitter: validate.twitter,
              facebook: validate.facebook,
              moreInfo: validate.moreInfo,
              password: validate.password,
              birthdate: validate.birthdate,
              passwordConfirmation: validate.passwordConfirmation,
            })}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="form-head">
                <div className="left">
                  <ImageUpload
                    label="Profile picture"
                    name="picture"
                    onChange={onChange}
                    file={`${REACT_APP_BASE_URL}/${picture}`}
                  />
                </div>
                <div className="right">
                  <Input
                    name="name"
                    label="Name"
                    type="text"
                    className="input-name"
                  />

                  <Select
                    label="Wilaya"
                    name="wilaya"
                    options={wilayas}
                    className="select-wilaya"
                  />

                  <Input
                    name="birthdate"
                    label="birthdate"
                    type="date"
                    className="input-birthdate"
                    placeholder="mm-dd-yyyy"
                  />
                </div>
              </div>

              <div className="passwords">
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  className="input-password"
                  placeholder="Your password"
                />

                <Input
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  className="input-password"
                  placeholder="Password Confirmation"
                />
              </div>

              <Textarea
                name="moreInfo"
                label="Bio"
                className="bio"
                placeholder="Say somthing about yourself."
              />

              <div className="links">
                <Input
                  name="phone"
                  label="phone"
                  type="tel"
                  className="input-phone"
                  placeholder="Your phone number"
                />

                <Input
                  name="facebook"
                  label="facebook"
                  type="url"
                  className="input-facebook"
                  placeholder="https://facebook.com/username"
                />

                <Input
                  name="twitter"
                  label="twitter"
                  type="url"
                  className="input-twitter"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <Button
                className="save-button"
                type="submit"
                disabled={msg.content}
                content={
                  loading ? <Loader dim={20} width={2} /> : <span>Save</span>
                }
              />
            </Form>
          </Formik>
        </div>
      </InnerWrapper>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  msg: state.msg,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(CompleteProfile);
