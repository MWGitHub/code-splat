import React from 'react';
import { Link } from 'react-router';
import Register from './register';
import Login from './login';
import Modal from 'react-modal';
import SessionStore from '../stores/session';
import CSS from '../constants/css';
import UserUtil from '../util/user-util';

const LOGIN_MODAL = 'LOGIN_MODAL';
const REGISTER_MODAL = 'REGISTER_MODAL';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileMenuShown: false,
      shownModal: null
    };
  }

  componentDidMount() {
    this.userToken = SessionStore.addListener(this._handleUserChange.bind(this));
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
      shownModal: REGISTER_MODAL
    });
  }

  _handleLoginClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      shownModal: LOGIN_MODAL
    });
  }

  _closeModal(e) {
    if (e) e.preventDefault();

    this.setState({
      shownModal: null
    });
  }

  _switchModal(e) {
    e.preventDefault();

    if (this.state.shownModal === LOGIN_MODAL) {
      this.setState({
        shownModal: REGISTER_MODAL
      });
    } else if (this.state.shownModal === REGISTER_MODAL) {
      this.setState({
        shownModal: LOGIN_MODAL
      });
    }
  }

  _profileMenuClick() {
    this.setState({
      profileMenuShown: !this.state.profileMenuShown
    });
  }

  _handleLogoutClick(e) {
    e.preventDefault();

    UserUtil.logout();
  }

  render() {
    let modal = "";
    if (this.state.shownModal) {
      let shownModal = null;
      if (this.state.shownModal === LOGIN_MODAL) {
        shownModal = <Login
          onClose={this._closeModal.bind(this)}
          onSwitch={this._switchModal.bind(this)}
        />
      } else {
        shownModal = <Register
          onClose={this._closeModal.bind(this)}
          onSwitch={this._switchModal.bind(this)}
        />
      }
      modal = (
        <Modal
          isOpen={!!this.state.shownModal}
          onRequestClose={this._closeModal.bind(this)}
          style={CSS.modal}
          >
          {shownModal}
        </Modal>
      )
    }

    let profileBar = "";
    if (SessionStore.isLoggedIn()) {
      let user = SessionStore.getUser();
      let profileMenu = '';
      if (this.state.profileMenuShown) {
        profileMenu = (
          <ul className="group">
            <li><a href="/logout"
              onClick={this._handleLogoutClick.bind(this)}>Sign Out</a></li>
          </ul>
        );
      }
      profileBar = (
        <div className="menu-profile">
          <div className="menu-profile-button"
            onClick={this._profileMenuClick.bind(this)}>
            <span>{user.username} 0<i className="fa fa-caret-down"></i></span>
          </div>
          {profileMenu}
        </div>
      );
    } else {
      profileBar = (
        <ul className="group">
          <li><a href="/register"
            onClick={this._handleRegisterClick.bind(this)}>SIGN UP</a></li>
          <li><a href="/login"
            onClick={this._handleLoginClick.bind(this)}>SIGN IN</a></li>
        </ul>
      );
    }

    return (
      <div>
        <nav className="main-nav group">
          <div className="search">
            <input type="text" placeholder="Search projects &amp; files" />
            <span className="input-icon fa fa-search"></span>
          </div>
          <div className="logo">
            <h2><Link to='/'>CodeSplat</Link></h2>
          </div>
          <div className="menu">
            {profileBar}
          </div>
          {modal}
        </nav>
        <nav className="secondary-nav">
					<ul className="group">
						<li><Link to="/projects">All Projects</Link></li>
						<li><Link to="/projects/new">Add Project</Link></li>
					</ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
