import React from 'react';
import { Link } from 'react-router';
import UserUtil from '../util/user-util';
import SessionStore from '../stores/session';
import FormField from '../components/form-field';
import co from 'co';
import ErrorActions from '../actions/error-actions';
import Settings from '../constants/settings';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    if (SessionStore.isLoggedIn()) this.context.router.push('/');
  }

  componentDidMount() {
    this.changeToken = SessionStore.addListener(this._onChange.bind(this));
    ErrorActions.removeError('login-error');
  }

  componentWillUnmount() {
    this.changeToken.remove();
  }

  _onChange() {
    if (SessionStore.isLoggedIn()) {
      this.context.router.goBack();
    }
  }

  _handleSubmit(e) {
    e.preventDefault();

    var that = this;
    co(function* () {
      yield ErrorActions.removeError('login-error');

      yield UserUtil.login({
        username: that.state.username,
        password: that.state.password
      });

      if (e.target) e.target.reset();
    }).catch(e => {
      ErrorActions.receiveError({
        id: 'login-error',
        text: e.responseJSON.error
      });
    });
  }

  _handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  _handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

	_signInGuest(e) {
		e.preventDefault();

		UserUtil.loginAsGuest();
	}

  render() {
		let loginClass = 'auth-form';
		let closeButton = '';
		let switchLink = (
			<Link to="/register" className="form-link"
				>Sign up here.
			</Link>
		);
		if (this.props.modal) {
			loginClass = 'modal';
			closeButton = (
				<a className="close-button" href="#" onClick={this.props.onClose}>
          <i className="fa fa-times"></i>
        </a>
			);
			switchLink = (
				<a href="#" className="form-link"
					onClick={this.props.onSwitch}
          >Sign up here.
				</a>
			);
		}

    let passwordForget = '';
    if (Settings.SHOW_PASSWORD_FORGET) {
      passwordForget = (
        <a className="form-link label-sub" href="#" tabIndex="10">
          (I forgot my password)
        </a>
      );
    }

    return (
      <div className={loginClass}>
        <h1 className="form-title">SIGN IN</h1>
				{closeButton}
        <a href="/auth/facebook" className="auth-button auth-facebook">
          <i className="fa fa-facebook-official"></i>Sign in with Facebook
        </a>
        <a href="/auth/github" className="auth-button auth-github">
          <i className="fa fa-github"></i>Sign in with GitHub
        </a>
        <a href="/auth/google_oauth2" className="auth-button auth-google">
          <i className="fa fa-google-plus"></i>Sign in with Google
        </a>
				<a href="#" className="auth-button auth-email"
          onClick={this._signInGuest.bind(this)}>
          <i className="fa fa-envelope"></i>Sign in as Guest
        </a>
        <form className="form sub-form"
          onSubmit={this._handleSubmit.bind(this)}>
          <div className="form-group">
            <FormField id="username" label="Username" errorId="login-error">
              <input type="text" value={this.state.username} id="username"
                onChange={this._handleUsernameChange.bind(this)} />
            </FormField>
          </div>
          <div className="form-group">
            <FormField id="password">
              <label htmlFor="password">Password {passwordForget}</label>
              <input type="password" value={this.state.password} id="password"
                onChange={this._handlePasswordChange.bind(this)} />
            </FormField>
          </div>
          <div className="form-group">
            <input className="button-full" type="submit" value="Login" />
          </div>
        </form>
        <p className="form-description">Don't have an account? {switchLink}</p>
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;
