import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Nav from './components/nav';
import Register from './components/register';
import Login from './components/login';
import Modal from 'react-modal';
import UserUtil from './util/user-util';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

var router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='register' component={Register} />
      <Route path='login' component={Login} />
    </Route>
  </Router>
);

$(function () {
  UserUtil.checkLogin(data => {
    Modal.setAppElement(document.body);
    ReactDOM.render(router, $('#content')[0]);
  });
});
