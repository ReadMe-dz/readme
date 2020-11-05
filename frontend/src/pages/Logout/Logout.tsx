import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux-store/actions/user.actions';

const Logout: React.FC = ({ logout }: any) => {
  logout();
  return <Redirect to="/" />;
};

const mapActionsToProps = { logout: logoutUser };
export default connect(null, mapActionsToProps)(Logout);
