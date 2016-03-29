import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="search">
          <input type="text" />
        </div>
        <div className="logo">
          <h2>CodeSplat</h2>
        </div>
        <div className="menu">
          <ul>
            <li><Link to='/register'>Sign Up</Link></li>
            <li><Link to='/login'>Sign In</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
