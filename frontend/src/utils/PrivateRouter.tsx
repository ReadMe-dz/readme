import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import Loader from '../components/Loader';
import NavBar from '../containers/NavBar';

interface MyRouteProps extends RouteProps {
  component: any;
  authenticated: boolean;
  loading: boolean;
  complete: boolean;
  rest?: any;
}
const PrivateRoute: React.FC<MyRouteProps> = ({
  component: Component,
  authenticated,
  loading,
  complete,
  ...rest
}: any) => {
  const token = localStorage.getItem('token');

  const renderGeustPage = () => {
    return <Home geust />;
  };

  const renderPrivateRoutes = () => {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  if (loading || (token && !authenticated)) {
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );
  }

  if (!complete && rest.path !== '/logout' && rest.path !== '/complete') {
    return <Redirect to="/complete" />;
  }

  if (complete && rest.path === '/complete') {
    return <Redirect to="/" />;
  }

  return (
    <>
      <NavBar isSearch={rest.exact && rest.path === '/' && !authenticated} />
      {rest.exact && rest.path === '/' && !authenticated
        ? renderGeustPage()
        : renderPrivateRoutes()}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authenticated: state.user.authenticated,
    loading: state.user.loading,
    complete: state.user.complete,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
