import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import getIcon from '../../utils/icons';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import './style.scss';

type searchValues = {
  search: string;
};

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3300';

const NavBar: React.FC<any> = ({ user, msg }: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues: searchValues = { search: '' };

  useEffect(() => {
    setLoading(msg.loading);
  }, [msg]);

  const onSubmit = (
    values: searchValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    setLoading(true);

    console.log(values);
  };

  const renderProfile = () => {
    const { id, picture } = user;
    return (
      <div className="profile">
        <div className="picture">
          <Image
            className="avatar"
            src={`${BASE_URL}${picture}`}
            alt="profile"
          />
        </div>
        <div className="manu-list">
          <span className="caret" />
          <div className="menu-wrapper">
            <Link to={`/user/${id}`}>Profile</Link>
            <Link to="/edit">Edit Profile</Link>
            <Link to={`/settings/${id}`}>Account Settings</Link>
            <span className="separator" />
            <Link to="/logout">Sign Out</Link>
          </div>
        </div>
      </div>
    );
  };

  const renderLinks = () => {
    return (
      <div className="links">
        <Link to="/login">
          <Button content="Sign In" className="singin" />
        </Link>
        <Link to="/subscribe">
          <Button content="Sign Up" />
        </Link>
      </div>
    );
  };

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img src={logo} alt="read me" />
        <h1>Read Me</h1>
      </Link>
      <div className="search">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) =>
            onSubmit(values, { setSubmitting })
          }
        >
          <Form className="saerch-form">
            <Input
              name="search"
              label=""
              type="text"
              className="search"
              placeholder="Find your book"
            />
            <Button
              className="saerch-button"
              type="submit"
              disabled={msg.content}
              content={
                loading ? (
                  <Loader dim={20} width={2} color="#ea4c89" />
                ) : (
                  <span className="icon">{getIcon('search')}</span>
                )
              }
            />
          </Form>
        </Formik>
      </div>
      {user.authenticated ? renderProfile() : renderLinks()}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  msg: state.msg,
});

export default connect(mapStateToProps)(NavBar);
