import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearMsg } from './redux-store/actions/msg.actions';
import CheckAuthentication from './utils/CheckAuthentication';
import GuestRoute from './utils/GeustRoute';
import PrivateRoute from './utils/PrivateRouter';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import ForgetPassword from './pages/ForgetPassword';
import Message from './components/Message';
import Profile from './pages/Profile';

const App: React.FC<any> = ({ msg, clear }: any) => {
  useEffect(() => {
    CheckAuthentication();
  }, []);

  useEffect(() => {
    if (msg.content) {
      setTimeout(() => {
        clear();
      }, 4000);
    }
  }, [msg]);

  return (
    <div className="app">
      {msg.content && <Message type={msg.type} content={msg.content} />}
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute
            path="/profile/:id"
            render={(routeProps) => <Profile {...routeProps} />}
          />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/subscribe" component={Subscribe} />
          <GuestRoute path="/forget-password" component={ForgetPassword} />
          <PrivateRoute exact path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  msg: state.msg,
});

const mapActionsToProps = {
  clear: clearMsg,
};
export default connect(mapStateToProps, mapActionsToProps)(App);
