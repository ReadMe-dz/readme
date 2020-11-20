import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { book as validate } from '../../validations';
import getIcon from '../../utils/icons';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import './style.scss';
import { searchBook } from '../../redux-store/actions/book.actions';

type searchValues = {
  search: string;
};

const { REACT_APP_BASE_URL } = process.env;

const NavBar: React.FC<any> = ({ user, book, findBook, isSearch }: any) => {
  const initialValues: searchValues = { search: '' };
  const onSubmit = (
    { search }: searchValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(false);
    findBook(search);
  };

  const renderProfile = () => {
    const { id, picture } = user;
    return (
      <>
        <div className="profile">
          <div className="picture">
            <Image
              className="avatar"
              src={picture ? `${REACT_APP_BASE_URL}/${picture}` : defaultAvatar}
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
        <Link className="add-book-link" to="/add-book">
          <Button content="Add Book" />
        </Link>
      </>
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
      {isSearch && (
        <div className="nav-bar__search">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              search: validate.search,
            })}
            onSubmit={(values, { setSubmitting }) =>
              onSubmit(values, { setSubmitting })
            }
          >
            <Form className="search-form">
              <Input
                name="search"
                label=""
                type="text"
                className="search-input"
                placeholder="Find your book"
              />
              <Button
                className="search-button"
                type="submit"
                disabled={book.loading}
                content={
                  book.loading ? (
                    <Loader dim={20} width={2} color="#ea4c89" />
                  ) : (
                    <span className="icon">{getIcon('search')}</span>
                  )
                }
              />
            </Form>
          </Formik>
        </div>
      )}
      {user.authenticated ? renderProfile() : renderLinks()}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  book: state.book,
});

const mapActionsToProps = {
  findBook: searchBook,
};

export default connect(mapStateToProps, mapActionsToProps)(NavBar);
