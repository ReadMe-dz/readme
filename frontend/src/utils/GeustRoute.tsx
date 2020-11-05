import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

interface MyRouteProps extends RouteProps {
  component: any;
  authenticated: boolean;
  rest?: any;
}

const GuestRoute: React.FC<MyRouteProps> = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

GuestRoute.propTypes = {
  component: PropTypes.any.isRequired,
  authenticated: PropTypes.any.isRequired,
};

const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(GuestRoute);
