import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearMsg } from './redux-store/actions/msg.actions';
import { selectBook } from './redux-store/actions/book.actions';
import CheckAuthentication from './utils/CheckAuthentication';
import GuestRoute from './utils/GeustRoute';
import PrivateRoute from './utils/PrivateRouter';
import Message from './components/Message';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Subscribe from './pages/Subscribe';
import BookDetails from './containers/BookDetails';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/resetPassword';

const App: React.FC<any> = ({ msg, clear, book, selectedBook }: any) => {
  useEffect(() => {
    CheckAuthentication();
  }, []);

  useEffect(() => {
    if (msg.content) {
      setTimeout(() => {
        clear();
      }, 6000);
    }
  }, [msg]);

  return (
    <div className="app">
      {msg.content && <Message type={msg.type} content={msg.content} />}
      <Router>
        {book.id && (
          <BookDetails id={book.id} closeDetails={() => selectedBook(null)} />
        )}
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/user/:id" component={Profile} />
          <PrivateRoute path="/edit" component={EditProfile} />
          <PrivateRoute path="/add-book" component={AddBook} />
          <PrivateRoute path="/book/:id" component={EditBook} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/subscribe" component={Subscribe} />
          <GuestRoute path="/forget-password" component={ForgetPassword} />
          <GuestRoute path="/reset/:resetToken" component={ResetPassword} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  msg: state.msg,
  book: state.book,
});

const mapActionsToProps = {
  clear: clearMsg,
  selectedBook: selectBook,
};
export default connect(mapStateToProps, mapActionsToProps)(App);
