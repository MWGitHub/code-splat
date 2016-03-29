import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Nav from './components/nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
      </div>
    );
  }
}

var router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>

    </Route>
  </Router>
);

$(function () {
  ReactDOM.render(router, $('#content')[0]);
});
