import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InnerWrapper from '../../components/InnerWrapper';
import Image from '../../components/Image';
import Button from '../../components/Button';
import SearchBar from '../SearchBar';
import logo from '../../assets/images/logo.png';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import './style.scss';

const { REACT_APP_BASE_URL } = process.env;

const NavBar: React.FC<any> = ({ user, isSearch }: any) => {
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
              <Link to="/add-book">Add A Book</Link>
              <Link to="/requests">Request A Book</Link>
              <Link to="/messages">Messages</Link>
              <span className="separator" />
              <Link to="/settings">Account Settings</Link>
              <span className="separator" />
              <Link to="/logout">Sign Out</Link>
            </div>
          </div>
        </div>
        <Link className="add-book-link" to="/add-book">
          <Button content="Add A Book" />
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
      <InnerWrapper>
        <Link className="logo" to="/">
          <img src={logo} alt="read me" />
          <h1>Read Me</h1>
        </Link>
        {isSearch && (
          <SearchBar placeholder="Search by book's title or author's name" />
        )}
        {user.authenticated ? renderProfile() : renderLinks()}
      </InnerWrapper>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBar);
