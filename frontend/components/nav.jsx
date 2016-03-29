import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <nav className="main-nav group">
        <div className="search">
          <input type="text" placeholder="Search projects &amp; files" />
        </div>
        <div className="logo">
          <h2><Link to='/'>CodeSplat</Link></h2>
        </div>
        <div className="menu">
          <ul className="group">
            <li><Link to='/register'>SIGN UP</Link></li>
            <li><Link to='/login'>SIGN IN</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
