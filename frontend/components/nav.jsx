import React from 'react';
import { Link } from 'react-router';
import Register from './register';
import Login from './login';
import Modal from 'react-modal';
import UserStore from '../stores/user';
import CSS from '../constants/css';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shownModal: null
    };
  }

  componentDidMount() {
    this.userToken = UserStore.addListener(this._handleUserChange.bind(this));
  }

  componentWillUnmount() {
    this.userToken.remove();
  }

  _handleUserChange() {
    this.setState({
      shownModal: null
    });
  }

  _handleRegisterClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      shownModal: <Register />
    });
  }

  _handleLoginClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      shownModal: <Login />
    });
  }

  _closeModal() {
    this.setState({
      shownModal: null
    });
  }

  render() {
    var modal = "";
    if (this.state.shownModal) {
      modal = (
        <Modal
          isOpen={!!this.state.shownModal}
          onRequestClose={this._closeModal.bind(this)}
          style={CSS.modal}
          >
          {this.state.shownModal}
        </Modal>
      )
    }

    return (
      <nav className="main-nav group">
        <div className="search">
          <input type="text" placeholder="Search projects &amp; files" />
          <span className="input-icon fa fa-search"></span>
        </div>
        <div className="logo">
          <h2><Link to='/'>CodeSplat</Link></h2>
        </div>
        <div className="menu">
          <ul className="group">
            <li><a href="/register"
              onClick={this._handleRegisterClick.bind(this)}>SIGN UP</a></li>
            <li><a href="/login"
              onClick={this._handleLoginClick.bind(this)}>SIGN IN</a></li>
          </ul>
        </div>
        {modal}
      </nav>
    );
  }
}

export default Nav;
