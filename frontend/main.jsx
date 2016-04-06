import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import UserUtil from './util/user-util';

import Nav from './components/nav';
import Register from './components/register';
import Login from './components/login';
import Modal from 'react-modal';
import NotFound from './components/not-found';
import ProjectStore from './stores/project';
import Home from './components/home';
import ProjectDetail from './components/project-detail';
import { NewProjectForm, EditProjectForm } from './components/project-form';
import SessionStore from './stores/session';
import FileDetail from './components/file-detail';
import { NewFileForm, EditFileForm } from './components/file-form';
import ProjectIndex from './components/project-index';
import Search from './components/search';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="container group">
          {this.props.children}
        </div>
      </div>
    );
  }
}

var router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='register' component={Register} />
      <Route path='login' component={Login} />
			
			<Route path='projects' component={ProjectIndex} />
      <Route path='projects/new'
        component={NewProjectForm} onEnter={checkLoggedIn} />
      <Route path='projects/:slug/edit'
        component={EditProjectForm} onEnter={checkLoggedIn} />
      <Route path='projects/:slug' component={ProjectDetail} />
      <Route path='projects/:slug/files/new' component={NewFileForm} />
      <Route path='projects/:slug/files/:fileSlug/edit' component={EditFileForm} />
      <Route path='projects/:slug/files/:fileSlug' component={FileDetail} />

			<Route path='search' component={Search} />

      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);

function checkLoggedIn(nextState, replace, callback) {
  if (SessionStore.isLoggedIn()) {
    callback();
    return;
  }
  UserUtil.checkLogin(data => {
    if (data.username) {
      replace(nextState.location.pathname);
    } else {
      replace('/login');
    }
    callback();
  });
}

$(function () {
  UserUtil.checkLogin(data => {
    Modal.setAppElement(document.body);
    ReactDOM.render(router, $('#content')[0]);
  });
});
