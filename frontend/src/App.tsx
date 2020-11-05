import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux-store';
import CheckAuthentication from './utils/CheckAuthentication';
import GuestRoute from './utils/GeustRoute';
import PrivateRoute from './utils/PrivateRouter';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import ForgetPassword from './pages/ForgetPassword';

const App: React.FC = () => {
  useEffect(() => {
    CheckAuthentication();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/subscribe" component={Subscribe} />
          <GuestRoute path="/forget-password" component={ForgetPassword} />
          <PrivateRoute exact path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
