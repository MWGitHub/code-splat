import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Nav from './components/nav';
import Register from './components/register';
import Login from './components/login';
import Modal from 'react-modal';
import UserUtil from './util/user-util';
import NotFound from './components/not-found';
import ProjectStore from './stores/project';
import WebUtil from './util/web-util';
import Home from './components/home';

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
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);

$(function () {
  window.ProjectStore = ProjectStore;
  window.WebUtil = WebUtil;
  UserUtil.checkLogin(data => {
    Modal.setAppElement(document.body);
    ReactDOM.render(router, $('#content')[0]);
  });
});
