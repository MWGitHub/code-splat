import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Register from './register';
import Login from './login';
import Modal from 'react-modal';
import SessionStore from '../stores/session';
import CSS from '../constants/css';
import UserUtil from '../util/user-util';
import DOMUtil from '../util/dom-util';
import { SearchBar } from './search';

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
		this._profileMenuListener = e => {
			if (!this.state.profileMenuShown) return;

			let menuButton = ReactDOM.findDOMNode(this.refs.menuProfile);
			let dropDown = ReactDOM.findDOMNode(this.refs.menuDropdown);
			if (DOMUtil.hasAncestor(e.target, menuButton)) return;
			if (DOMUtil.hasAncestor(e.target, dropDown)) return;

			this.setState({ profileMenuShown: false });
		};
		document.addEventListener("mousedown", this._profileMenuListener);
  }

  componentWillUnmount() {
    this.userToken.remove();
		document.removeEventListener("mousedown", this._profileMenuListener);
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
					modal={true}
        />
      } else {
        shownModal = <Register
          onClose={this._closeModal.bind(this)}
          onSwitch={this._switchModal.bind(this)}
					modal={true}
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
          <ul ref="menuDropdown" className="group">
            <li><a href="/logout"
              onClick={this._handleLogoutClick.bind(this)}>Sign Out</a></li>
          </ul>
        );
      }
      profileBar = (
        <div ref="menuProfile" className="menu-profile">
          <div className="menu-profile-button"
            onClick={this._profileMenuClick.bind(this)}>
            <span>{user.username} {user.score}<i className="fa fa-caret-down"></i></span>
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
            onClick={this._handleLoginClick.bind(this)}>SIGN IN / GUEST</a></li>
        </ul>
      );
    }

    return (
      <div>
        <nav className="main-nav group">
          <SearchBar />
          <div className="logo">
            <h2><Link to='/'>&nbsp;</Link></h2>
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
