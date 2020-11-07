import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Geust from '../pages/Geust';
import Loader from '../components/Loader';
import NavBar from '../containers/NavBar';

interface MyRouteProps extends RouteProps {
  component: any;
  authenticated: boolean;
  loading: boolean;
  rest?: any;
}
const PrivateRoute: React.FC<MyRouteProps> = ({
  component: Component,
  authenticated,
  loading,
  ...rest
}: any) => {
  const token = localStorage.getItem('token');
  if (loading || (token && !authenticated)) {
    return <Loader />;
  }
  return (
    <>
      <NavBar />
      <Route
        {...rest}
        render={(props) =>
          authenticated ? <Component {...props} /> : <Geust />
        }
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authenticated: state.user.authenticated,
    loading: state.user.loading,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
